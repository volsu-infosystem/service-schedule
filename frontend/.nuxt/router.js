import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bd7757da = () => interopDefault(import('../node_modules/@nuxtjs/svg-sprite/lib/pages/icons-list.vue' /* webpackChunkName: "" */))
const _2c350340 = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _fbc4650c = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _114bd098 = () => interopDefault(import('../pages/edit/_timetable.vue' /* webpackChunkName: "pages/edit/_timetable" */))
const _8f13ab3a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/_icons",
    component: _bd7757da,
    name: "icons-list"
  }, {
    path: "/admin",
    component: _2c350340,
    name: "admin"
  }, {
    path: "/login",
    component: _fbc4650c,
    name: "login"
  }, {
    path: "/edit/:timetable?",
    component: _114bd098,
    name: "edit-timetable"
  }, {
    path: "/",
    component: _8f13ab3a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
