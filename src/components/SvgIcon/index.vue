<template>
    <svg :style="{width,height}">
        <use :xlink:href="prefix+name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
// 接收父组件传过来的参数
defineProps({
    // xlink:href属性值的前缀
    prefix:{
        type: String,
        // 默认
        default: '#icon-'
    },
    // 图标的名字
    name:String,
    // 图标的颜色
    color: {
        type: String,
        default: ''
    },
    // 图标的宽高
    width: {
        type: String,
        default: '16px'
    },
    height: {
        type: String,
        default: '16px'
    }
})
</script>