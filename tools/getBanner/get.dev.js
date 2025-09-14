/**
 * Ctrl + Q 快捷键执行
 * 获取所有媒体资源
 * 收集所有.layer下媒体元素当前的transform属性transform（x, y）scale Rotate，当前鼠标的位置X
 * 再次触发 Ctrl + Q
 * 将现在所有的.layer下媒体元素的transform 与之前的相比较
 * 计算出 translate rotate scale 三种值 (旧 - 新) / 鼠标横向移动距离
 * Ctrl + X 废弃当前脚本
 * 
 * { src, type, base64, style: { width, height, transform} }
 */
(() => {
    const srcList = []

    const srcSet = {}

    // getMediaSrcList()
    // getMediaBase64()



    let isExecuting = false;
    // 添加Ctrl+Q快捷键监听功能
    let notificationElement = null;
    let currentAnimation = null; // 用于跟踪当前动画

    let lastMousePosition = { x: 0, y: 0 }
    let lastMousePositon_beforeMove = {x: 0, y: 0}

    // 用于判断该脚本是否已被废弃
    let isDeprecated = false;

    // 监听鼠标移动，实时记录位置
    document.addEventListener('mousemove', e => {
        lastMousePosition = { x: e.clientX, y: e.clientY };
    })

    // 监听键盘事件
    document.addEventListener('keydown', event => {
        if (isDeprecated) {
            return;
        }
        // 检查是否按下Ctrl+Q
        if (event.ctrlKey && event.key === 'q') {
            event.preventDefault(); // 阻止默认行为
            console.log('空格被按下时的鼠标位置:', lastMousePosition);

            getMediaSrcList()
            if (isExecuting) {
                // 如果正在执行，显示执行成功
                createNotification('执行成功', 3000);
            } else {
                // 开始执行
                createNotification('开始执行', 3000);
            }

            isExecuting = !isExecuting;
        }
        // 如果按下Ctrl + X，则isDeprecated = true
        if (event.ctrlKey && event.key === 'x') {
            event.preventDefault(); // 阻止默认行为
            isDeprecated = true;

            createNotification('已禁用', 3000);
            
        }
    })

    function getMediaSrcList() {
        document.querySelectorAll('.animated-banner>.layer ').forEach((elem, index) => {
        // document.querySelectorAll('.layer').forEach((elem, index) => {
            const label = elem.querySelector('img,video')            

            let { src, style, height, width } = label

            const mediaId = `${src}_${index}`

            width = parseFloat(width ?? style.style.width)
            height = parseFloat(height ?? style.style.height)

            if (!isExecuting) {
                srcSet[mediaId] = {
                    src: label.src,
                    index,
                    type: label.tagName,
                    base64: '',
                    style: {
                        width: width + 'px',
                        height: height + 'px',
                        // 需要提取 translate()
                        transform: style.transform,
                        opacity: style.opacity,
                        filter: style.filter,
                        zIndex: index
                    }
                }

                lastMousePositon_beforeMove = lastMousePosition
            } else {
                const originTransform = srcSet[mediaId].style.transform;
                const transform = style.transform;

                const originTranslate = getTranslateValues(originTransform)
                const translate = getTranslateValues(transform)

                const originScale = getScaleValues(originTransform)
                const scale = getScaleValues(transform)

                const originBlur = getBlurValue(srcSet[mediaId].style.filter)
                const blur = getBlurValue(style.filter)

                const originOpacity = srcSet[mediaId].style.opacity;
                const opacity = style.opacity;


                const originRotate = getRotateValues(originTransform)
                const rotate = getRotateValues(transform)

                const mouseMovement = {
                    x: lastMousePosition.x - lastMousePositon_beforeMove.x,
                    y: lastMousePosition.y - lastMousePositon_beforeMove.y
                }

                srcSet[mediaId].offsetRate = {
                    // translate
                    x: (translate.x - originTranslate.x) / mouseMovement.x,
                    y: (translate.y - originTranslate.y) / mouseMovement.x,

                    // scale
                    scaleX: (originScale.x - scale.x) / mouseMovement.x,
                    scaleY: (originScale.y - scale.y) / mouseMovement.x,

                    // rotate
                    rotate: (originRotate - rotate) / mouseMovement.x,

                    // blur
                    blur: (originBlur - blur) / mouseMovement.x,

                    // opacity
                    opacity: (originOpacity - opacity) / mouseMovement.x,
                }

                srcSet[mediaId].init = ensureNumericValues({
                    translate: originTranslate,
                    scale: originScale,
                    rotate: originRotate,
                    blur: originBlur,
                    opacity: originOpacity
                })
            }
        })

        if (isExecuting) {
            Object.keys(srcSet).forEach(src => {
                srcList[srcSet[src].index] = srcSet[src]
            })
            console.log(srcList);
            getMediaBase64()
        }
    }

    function getMediaBase64() {
        // 单独获取logo
        try {
            const logo = document.querySelector('.head-logo img')?.src
            if (logo) srcList.push({ src: logo, type: 'LOGO', base64: '' })

            const _logo = document.querySelector('.logo img')?.src
            if (_logo) srcList.push({ src: _logo, type: 'LOGO', base64: '' })

            const title = document.querySelector('.head-title')?.innerText
            if (title) srcList.push({ title, type: 'TITLE'})
        } catch (error) {
            console.error(error)
        }

        console.log('开始转换媒体资源...')
        convertMediaToBase64(srcList).then(result => {
            console.log('转换成功:', result)
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
            console.log('转换中...');
            try {
                if (isDeprecated) {
                    throw new Error("脚本废弃");
                       
                }
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
            'mov': 'video/quicktime',
            'mkv': 'video/x-matroska',
            'flv': 'video/x-flv',
            'wmv': 'video/x-ms-wmv'
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

    function getTranslateValues(transform) {
        // 匹配 translate2D: translate(x, y) 或 translate(x)（只一个参数）
        const regex = /translate\(\s*([^,\s]+)(?:\s*,\s*([^)\s]+))?\s*\)/;
        const match = transform.match(regex);

        if (!match) {
            return { x: 0, y: 0 };
        }

        const x = match[1] ? parseFloat(match[1]) || 0 : 0;
        const y = match[2] !== undefined ? parseFloat(match[2]) || 0 : 0; // 如果没有 y，默认为 0

        return { x, y };
    }

    function getScaleValues(transform) {
        const match = transform.match(/scale\(([^)]+)\)/);
        if (!match) {
            return { x: 1, y: 1 };
        }

        const values = match[1].split(',').map(Number);
        const x = values[0] || 1;
        const y = values[1] || values[0] || 1;

        return { x, y };
    }

    function getRotateValues(transform) {
        const match = transform.match(/rotate\(([^)]+)\)/);
        if (match) {
            const angleStr = match[1];
            // 支持 deg, rad, turn 等单位
            if (angleStr.includes('deg')) {
                return parseFloat(angleStr);
            } else if (angleStr.includes('rad')) {
                return parseFloat(angleStr) * (180 / Math.PI);
            } else if (angleStr.includes('turn')) {
                return parseFloat(angleStr) * 360;
            }
        }
        return 0;
    }

    function getBlurValue(filter) {
        if (!filter || filter === 'none') {
            return 0;
        }

        // 匹配 blur(xpx)、blur(10%)、blur(2em) 等，提取数值
        const match = filter.match(/blur\(\s*(\d*\.?\d+)([a-z%]+)?\s*\)/i);

        if (match) {
            return parseFloat(match[1]); // 返回数值部分，单位忽略（blur 通常用 px）
        }

        return 0; // 没有 blur 或未匹配
    }
    // 创建提示元素的函数
    function createNotification(message, duration) {
        // 如果已存在提示元素，先取消之前的动画并移除
        if (notificationElement) {
            if (currentAnimation) {
                cancelAnimationFrame(currentAnimation);
            }
            // 检查parentNode是否存在再移除
            if (notificationElement.parentNode) {
                notificationElement.parentNode.removeChild(notificationElement);
            }
            notificationElement = null;
        }

        // 创建提示元素
        notificationElement = document.createElement('div');
        notificationElement.textContent = message;
        notificationElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 8px;
            font-size: 24px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            text-align: center;
            opacity: 0;
        `;

        document.body.appendChild(notificationElement);

        // 使用JavaScript动画实现淡入效果
        let startTime = null;
        const fadeDuration = duration * 0.2; // 淡入时间为总持续时间的20%
        let fadeOutTimer = null;
        let isFadingOut = false;

        function fadeAnimation(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / fadeDuration, 1);

            // 淡入效果
            if (notificationElement) {  // 添加检查确保元素存在
                notificationElement.style.opacity = progress;
                notificationElement.style.transform = `translate(-50%, -50%) scale(${0.8 + 0.2 * progress})`;
            }

            if (progress < 1) {
                currentAnimation = requestAnimationFrame(fadeAnimation);
            } else {
                // 淡入完成后，设置淡出定时器
                fadeOutTimer = setTimeout(() => {
                    if (isFadingOut) return; // 防止重复触发
                    isFadingOut = true;
                    let outStartTime = null;
                    function fadeOutAnimation(timestamp) {
                        if (!outStartTime) outStartTime = timestamp;
                        const elapsed = timestamp - outStartTime;
                        const progress = Math.min(elapsed / fadeDuration, 1);

                        // 淡出效果
                        if (notificationElement) {  // 添加检查确保元素存在
                            notificationElement.style.opacity = 1 - progress;
                            notificationElement.style.transform = `translate(-50%, -50%) scale(${1 - 0.2 * progress})`;
                        }

                        if (progress < 1) {
                            currentAnimation = requestAnimationFrame(fadeOutAnimation);
                        } else {
                            // 动画完成后移除元素
                            if (notificationElement && notificationElement.parentNode) {
                                notificationElement.parentNode.removeChild(notificationElement);
                                notificationElement = null;
                                currentAnimation = null;
                            }
                        }
                    }
                    currentAnimation = requestAnimationFrame(fadeOutAnimation);
                }, duration - fadeDuration * 2);
            }
        }

        currentAnimation = requestAnimationFrame(fadeAnimation);
    }

    function ensureNumericValues(obj) {
        // 如果是 null 或非对象，尝试转为数字
        if (obj === null || typeof obj !== 'object') {
            return Number(obj);
        }

        // 如果是数组，遍历每一项
        if (Array.isArray(obj)) {
            return obj.map(ensureNumericValues);
        }

        // 如果是对象，遍历其属性
        const result = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            if (typeof value === 'object' && value !== null) {
                // 递归处理嵌套对象
                result[key] = ensureNumericValues(value);
            } else {
                // 将值转换为数字
                result[key] = Number(value);
            }
            }
        }

        return result;
    }
})()