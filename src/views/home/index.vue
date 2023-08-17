<template>
    <div>
        我是一级路由首页页面
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
// 获取仓库
let userStore = useUserStore()
// 当首页挂载完毕发请求获取用户信息
onMounted(()=>{
    userStore.userInfo();
})
</script>

<style scoped></style>