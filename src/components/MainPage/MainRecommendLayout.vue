<template>
    <div class="recommend-layout">

    </div>
</template>

<script setup lang="ts">

function getRcmd() {
    fetch("http://localhost:6600/api/rcmd").then(res => res.json()).then(data => {
        console.log(data.data.item);
    })
}

getRcmd()
</script>

<style scoped lang="less">
.recommend-layout {
    width: 100%;
    background: #000;
}
</style>