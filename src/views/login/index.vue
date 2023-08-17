<template>
    <div class="box">
        <div class="login-form">
            <div class="form-header">Login</div>
            <div class="form-body">
                <el-form :model="loginForm" :rules="rules" ref="loginForms">
                    <el-form-item prop="username">
                        <el-input placeholder="账号" v-model="loginForm.username"/>
                    </el-form-item>
                    <el-form-item prop="password">
                            <el-input placeholder="密码" type="password" show-password v-model="loginForm.password"/>
                        </el-form-item>
                </el-form>
            </div>
            <div class="form-footer">
                <el-button @click="login" >G O</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 收集表单数据
import {reactive,ref} from 'vue';
// 引入路由
import {useRouter} from 'vue-router';
// 引入与用户相关的小仓库
import useUserStore from "@/store/modules/user"
// 引入element中的消息提醒
import { ElNotification, messageType } from 'element-plus';
// 引入获取当前时间的函数
import {getTime} from '@/utils/time'
let useStore = useUserStore();
let loginForm = reactive({
    username: '',
    password: ''
})
let $router = useRouter();
let loginForms = ref();
// 登录按钮的回调
const login = async() => {
    // 保证全部的表单项校验通过在发请求
    await loginForms.value.validate();
    try{
        await useStore.userLogin(loginForm);
        $router.push('/')
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI,${getTime()}好`
        })
    } catch (error) {
       
        
         ElNotification({
            type: 'error',
            message: (error as string)
        })
    }
}
const validatorUserName = (rule: any,value: any,callback: any) => {
    if(value == ''){
        callback(new Error('账号不能为空'));
    }else if(!/^[a-zA-Z0-9]{5,}$/.test(value)){
        callback(new Error('账号至少为5位'))
    }else {
        callback();
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value == '') {
        callback(new Error('密码不能为空'));
    } else if (!/^[a-zA-Z0-9]{6,}$/.test(value)) {
        callback(new Error('账号至少为6位'))
    } else {
        callback();
    }
}
// 定义表单校验所需要的配置对象
const rules = {
    username:[
    {
        trigger: 'change',
        validator: validatorUserName
    }
],
    password: [{
        trigger: 'change',
        validator: validatorPassword
    }]
}
</script>

<style scoped lang="scss">
.box{
    display: flex;
  justify-content: center;
  align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/images/login.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width:45%;
        height: 40%;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 4%;

        .form-header {
            font-size: 50px;
            margin-bottom: 10%;
            font-weight: bold;
        }
        .form-body{
            .el-form{
                .el-form-item{
                    
                    background-color: transparent;
                   .el-input{
                    width: 400px;
                    height: 50px;
                   }
                }
            }
        }
        .form-footer{
            .el-button{
                width: 80px;
                background-color: skyblue;
            }
        }
    }
}
</style>