<template>
    <div ref="wrapper" class="login-wrapper-mask">
        <div class="login-wrapper">
            <div ref="close" class="close" v-html="controller.close"></div>
            <div class="tabs">
                <div ref="login" class="login-tab active">登陆</div>
                <div ref="register" class="register-tab">注册</div>
            </div>
            <div class="login">
                <div class="">短信登陆></div>
                <div class="user-input">
                    <input type="text" placeholder="请输入手机号/邮箱">
                    <p class="err-msg"></p>
                </div>
                <div class="user-input">
                    <input type="text" placeholder="请输入密码">
                    <p class="err-msg"></p>
                </div>
                <div class="flex-between">
                    <div ref="remember" class="remember checked">
                        <label v-html="controller.checked" class="checked-img"></label>
                        <label v-html="controller.unchecked" class="unchecked-img"></label>
                        <span>记住我</span>
                    </div>
                    <div>
                        <span>无法验证？</span>
                        <span>忘记密码？</span>
                    </div>
                </div>
                <button>登陆</button>
            </div>

            <div class="register">

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import controller from '@/assets/icons/controller';

const wrapper = ref<HTMLElement | null>(null);
const close = ref<HTMLElement | null>(null);

const login = ref<HTMLElement | null>(null);
const register = ref<HTMLElement | null>(null);

const remember = ref<HTMLElement | null>(null);

onMounted(() => {
    login.value?.addEventListener('click', () => {
        login.value?.classList.add('active');
        register.value?.classList.remove('active');
    });
    register.value?.addEventListener('click', () => {
        login.value?.classList.remove('active');
        register.value?.classList.add('active');
    });

    // remember 点击时切换其classname是否包含checked
    remember.value?.addEventListener('click', () => {
        remember.value?.classList.toggle('checked');
    });

    close.value?.addEventListener('click', () => {
        wrapper.value?.remove();
    });
});

</script>

<style lang="less" scoped>
.login-wrapper-mask {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;

    user-select: none;
}

.login-wrapper {
    position: relative;
    width: 420px;
    border-radius: 8px;
    box-shadow: 0 0 6px rgba(0, 0, 0, .1);
    padding: 25px 45px 40px;
    box-sizing: border-box;
    background: url('/src/banner.d4f08beb.jpg') top no-repeat #fff;

    /deep/ .close {
        border-radius: 3px;
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;

        &,
        * {
            cursor: pointer !important;
        }

        svg {
            width: 20px;
            height: 20px;
            margin: 5px;

            path {
                fill: #fff;
            }
        }

        &:hover {
            background: @bg3;
        }
    }

    .tabs {
        position: relative;
        display: flex;

        .login-tab,
        .register-tab {
            position: relative;
            font-size: 18px;
            line-height: 20px;
            padding: 10px 14px;
            cursor: pointer;
            transition: all .2s ease-out;

            &::before,
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 5px;
            }

            &::after {
                transition: all .2s ease-out;
                background: #eee;
            }

            &.active::after {
                background: @bg3;
            }
        }
    }

    .err-msg {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #f25d8e;
    }

    .login {
        >:first-child {
            line-height: 20px;
            font-size: 12px;
            float: right;
            margin-bottom: 5px;
            color: @bg3;
            cursor: pointer;
        }

        .user-input {
            width: 100%;
            font-size: 14px;

            input {
                background-color: transparent;
                border-radius: 4px;
                border: 1px solid #dcdfe6;
                color: #606266;
                display: inline-block;
                font-size: inherit;
                height: 40px;
                line-height: 40px;
                outline: 0;
                padding: 0 15px;
                transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                width: 100%;
            }
        }

        button {
            width: 100%;
            background: @bg3;
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            outline: 0;
            padding: 12px 20px;
            border: 1px solid #dcdfe6;

            &:hover {
                background: @bg4;
            }
        }

        .flex-between {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: @bg3;
            margin-bottom: 10px;

            .remember {
                color: #000;

                &,
                * {
                    cursor: pointer;
                }

                /deep/ label.checked-img,
                /deep/ label.unchecked-img {
                    margin-right: 8px;

                    svg {
                        width: 14px;
                        height: 14px;
                    }
                }

                /deep/ label.checked-img {
                    display: none;

                    path {
                        fill: @bg3;
                    }
                }

                &.checked {

                    /deep/ label.checked-img {
                        display: inline-block;
                    }

                    /deep/ label.unchecked-img {
                        display: none;

                        svg {
                            width: 14px;
                            height: 14px;
                        }


                    }
                }
            }
        }
    }
}
</style>