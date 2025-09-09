const srcList = []

document.querySelectorAll('.animated-banner>.layer').forEach(elem => {
    const label = elem.querySelector('img,video')
    srcList.push({ src: label.src, type: label.tagName, base64: '' })
})

// console.log(srcList)

convertMediaToBase64(srcList).then(result => {
    console.log(result)
}).catch(error => {
    console.error('转换失败:', error)
})

/**
 * 将媒体资源数组转换为Base64编码
 * @param {Array} mediaArray 包含src、type和base64字段的对象数组
 * @returns {Promise<Array>} 返回填充了base64字段的数组
 */
async function convertMediaToBase64(mediaArray) {
    const results = [];

    for (const item of mediaArray) {
        try {
            if (item.type === 'IMG') {
                // 处理图片URL
                const base64 = 'data:image/webp;base64,' + await urlToBase64(item.src);
                results.push({ ...item, base64 });
            } else if (item.type === 'VIDEO' && item.src.startsWith('blob:')) {
                // 处理Blob视频（WEBM格式）
                const base64 = 'data:video/webm;base64,' + await blobVideoToBase64(item.src);
                results.push({ ...item, base64 });
            } else {
                // 无法处理的类型，原样返回
                results.push(item);
            }
        } catch (error) {
            console.error(`处理资源失败: ${item.src}`, error);
            // 即使失败也保留原数据
            results.push(item);
        }
    }

    return results;
}

/**
 * 将图片URL转换为Base64编码
 * @param {string} url 图片URL
 * @returns {Promise<string>} Base64编码字符串
 */
function urlToBase64(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            try {
                // 转换为WebP格式的Base64
                const dataURL = canvas.toDataURL('image/webp');
                resolve(dataURL.split(',')[1]); // 去除DataURL前缀
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = function () {
            reject(new Error('图片加载失败'));
        };

        img.src = url;
    });
}

/**
 * 将Blob视频转换为Base64编码
 * @param {string} blobUrl Blob URL
 * @returns {Promise<string>} Base64编码字符串
 */
function blobVideoToBase64(blobUrl) {
    return fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // 移除DataURL前缀（data:video/webm;base64,）
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        });
}