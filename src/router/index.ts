import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

// 定义路由配置
// 每个路由映射一个组件
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 404页面路由，必须放在最后
  // 当访问不存在的路径时，会重定向到此页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

// 创建路由器实例并配置路由
const router = createRouter({
  // 使用HTML5 History模式
  // history: createWebHistory(),
  // Hash模式
  history: createWebHashHistory(),
  routes
})

export default router