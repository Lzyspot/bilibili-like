(() => {
    const srcList = []

    // 针对图片动画
    // let timeout = 0, interval = 100;
    // let timer = setInterval(() => {
    //     getMediaSrcList()


    //     timeout += interval
    //     if (timeout > 10000) {
    //         clearInterval(timer)

    //         getMediaBase64()
    //     }
    // }, interval)
    const mediaPackage = {
        content: [],
        id: 'banner_' + Date.now(),
        config: {
            style: {
                bannerHeight: document.querySelector(".bili-header__banner").getBoundingClientRect().height
            }
        },
        version: '1.1'
    }

    function getMediaSrcList() {
        let banner_old = document.querySelector('.banner-img source')?.srcset
        let banner_older = getBackgroundImageUrl(document.querySelector('.bili-banner')?.style?.backgroundImage)

        let banner_sp = getBackgroundImageUrl(document.querySelector('.bili-header__banner')?.style?.backgroundImage)
        let logo_old = document.querySelector('.inner-logo img')?.src

        let link = document.querySelector('.banner-link').href

        let banner_legacy = getBackgroundImageUrl(document.querySelector('#banner_link')?.style?.backgroundImage)
        let logo_legacy = getBackgroundImageUrl(document.querySelector('.head-logo')?.style?.backgroundImage)

        let banner_sp2 = getBackgroundImageUrl(document.querySelector('.header')?.style?.backgroundImage)

        let logo_2016 = getBackgroundImageUrl(document.querySelector('.logo')?.style?.backgroundImage)

        let banner_2014 = getBackgroundImageUrl(document.querySelector('.header')?.style?.backgroundImage)

        if (banner_old) {
            srcList.push({ src: banner_old, type: 'IMG', base64: '' })
        } else if (banner_older) {
            srcList.push({ src: banner_older, type: 'IMG', base64: '' })
        } else if (banner_sp) {
            srcList.push({ src: banner_sp, type: 'IMG', base64: '' })
        } else if (banner_legacy) {
            srcList.push({ src: banner_legacy, type: 'IMG', base64: '' })
            srcList.push({ src: logo_legacy, type: 'LOGO', base64: '' })
        } else if (banner_sp2) {
            srcList.push({ src: banner_sp2, type: 'IMG', base64: '' })
        }

        if (logo_old) {
            srcList.push({ src: logo_old, type: 'LOGO', base64: '' })
        } else if (logo_2016) {
            srcList.push({ src: logo_2016, type: 'LOGO', base64: '' })
        }

        const _logo = document.querySelector('.logo img')?.src
        if (_logo) srcList.push({ src: _logo, type: 'LOGO', base64: '' })

        document.querySelectorAll('.layer').forEach(elem => {
            const label = elem.querySelector('img,video')

            let fileExist = false
            srcList.forEach(e => {
                if (e.src === label?.src) {
                    fileExist = true
                }
            })

            if (!fileExist) {
                if (!label) {
                    console.warn('未找到图片或视频标签:', elem)
                } else {
                    srcList.push({ src: label.src, type: label.tagName, base64: '' })
                }

                console.log(srcList);
            }
        })
    }

    function getMediaBase64() {
        // 单独获取logo
        try {
            const logo = document.querySelector('.head-logo img')?.src
            if (logo) srcList.push({ src: logo, type: 'LOGO', base64: '' })

            const title = document.querySelector('.head-title')?.innerText
            if (title) srcList.push({ title, type: 'TITLE' })
        } catch (error) {
            console.error(error)
        }

        // 转换媒体资源
        console.log('开始转换媒体资源...')
        convertMediaToBase64(srcList).then(result => {
            mediaPackage.content = mediaPackage.content.concat(result)
            console.log(mediaPackage)

        }).catch(error => {
            console.error('转换失败:', error)
        })
    }


    /**
     * 将媒体资源数组转换为Base64编码
     * @param {Array} mediaArray 包含src、type和base64字段的对象数组
     * @returns {Promise<Array>} 返回填充了base64字段的数组
     */
    async function convertMediaToBase64(mediaArray) {
        const results = [];

        for (const item of mediaArray) {
            try {
                if (item.type === 'VIDEO' || item.src.startsWith('blob:')) {
                    // 处理Blob视频（根据文件扩展名确定格式）
                    const mimeType = getMimeTypeFromUrl(item.src, 'video/webm');
                    const base64 = `data:${mimeType};base64,` + await blobVideoToBase64(item.src);
                    results.push({ ...item, base64 });
                } else {
                    // 处理图片或普通视频URL
                    const mimeType = getMimeTypeFromUrl(item.src, 'image/webp');
                    const base64 = `data:${mimeType};base64,` + await urlToBase64(item.src);
                    results.push({ ...item, base64 });
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
     * 根据URL获取MIME类型
     * @param {string} url 资源URL
     * @param {string} defaultType 默认MIME类型
     * @returns {string} MIME类型
     */
    function getMimeTypeFromUrl(url, defaultType) {
        // 移除查询参数和锚点
        const cleanUrl = url.split('?')[0].split('#')[0];
        const ext = cleanUrl.split('.').pop()?.toLowerCase();

        const mimeTypes = {
            // 图片类型
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp',
            'avif': 'image/avif',
            'svg': 'image/svg+xml',

            // 视频类型
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'ogg': 'video/ogg',
            'avi': 'video/x-msvideo',
            'mov': 'video/quicktime'
        };

        return mimeTypes[ext] || defaultType;
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

    function getBackgroundImageUrl(bgImage) {
        if (!bgImage || bgImage === 'none') {
            return null;
        }

        // 匹配 url("...") 或 url('...') 或 url(...)
        const match = bgImage.match(/url\(\s*['"]?(.*?)['"]?\s*\)/i);
        return match ? match[1] : null;
    }

    // 手动获取背景图片和logo的url
    const url = {
        banner: '',
        logo: ''
    }
    if (url.banner.length) srcList.push({ src: url.banner, type: 'IMG', base64: '' })
    if (url.logo.length) srcList.push({ src: url.logo, type: 'LOGO', base64: '' })

    getMediaSrcList()
    getMediaBase64()
})()