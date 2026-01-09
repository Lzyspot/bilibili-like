<template>
  <div class="error-container">
    <div class="error-panel">
      <img :src="verySorry" alt="">
      <div class="rollback-btn-container">
        <button class="btn rollback-btn" @click="goToReferrer">返回上一级</button>
      </div>
    </div>
    <div class="error-manga">
      <img :src="errManga" alt="">
      <button class="btn change-img-btn" @click="setErrManga(mangaList)">换一张</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const verySorry = ref<string>('')
const errManga = ref<string>('')
const mangaList = ref<string[]>([])

const mangaPath = './src/error-manga/'

onMounted(async () => {
  verySorry.value = mangaPath + 'very_sorry.png'
  fetch(mangaPath + 'error-manga.json')
    .then(res => res.json())
    .then(data => {
      verySorry.value = mangaPath + data.verySorry

      mangaList.value = data.errorManga
      setErrManga(data.errorManga)
    })
})

// function rollback() {
//   history.back()
// }

function goToReferrer() {
  const referrer = document.referrer;
  if (referrer) {
    window.location.href = referrer;
  } else {
    // 如果没有来源，可以跳转到默认页面
    window.location.href = '/';
  }
}


function setErrManga(mangaList: string[]) {
  errManga.value = mangaPath + mangaList[Math.floor(Math.random() * mangaList.length)]
}

</script>

<style scoped lang="less">
.btn {
  text-align: center;
  background: @bg3;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
  transition: 0.2s;
  cursor: pointer;
}

.error-container {
  width: 980px;
  margin: 30px auto 30px;
  background: @bg1;
  border-radius: 10px;

  .rollback-btn-container {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 80px;
  }

  .rollback-btn {
    line-height: 40px;
    padding: 0 20px;
  }
}

.error-manga {
  padding: 30px;
  text-align: center;

  img {
    max-width: 800px;
  }

  .change-img-btn {
    display: block;
    width: 150px;
    background: @bg4;
    line-height: 48px;
    padding: 0 20px;
    margin: 30px auto 0;
  }
}
</style>