// ==UserScript==
// @name         加载到animated-banner
// @namespace    http://tampermonkey.net/
// @version      2025-09-12
// @description  try to take over the world!
// @author       You
// @match        https://web.archive.org/web/*/https://www.bilibili.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=archive.org
// @grant        none
// ==/UserScript==

window.onload = function () {

    const target = document.querySelector('.animated-banner')
    console.log(target);

    if (!target) {

        // 刷新页面
        location.reload()
    }
};