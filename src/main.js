// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
// import screen from '../src/components/screen.vue'
// import data from './lib/test.json'
// import md5 from 'js-md5';
// import $ from 'jquery';
// import BScroll from 'better-scroll'
import VueCookies from 'vue-cookies'
// Vue.prototype.$BScroll = BScroll
// let Base64 = require('js-base64').Base64;

let vm = new Vue({})
var SERVER_BASE_URL = ''; // 这个地方放公用的地址前缀
// SERVER_BASE_URL = 'https://ceshi.imbcloud.cn/access/'
// SERVER_BASE_URL = 'http://192.168.1.14:8080/imb_web/'

if (process.env.NODE_ENV == "development") {
  SERVER_BASE_URL = 'http://192.168.1.157:8080/imb_web/'
  // SERVER_BASE_URL = 'https://ceshi.imbcloud.cn/access/'
} else {
  SERVER_BASE_URL = '/access/'
  // SERVER_BASE_URL = 'https://ceshi.imbcloud.cn/access/'
}

const fetch = options => {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: SERVER_BASE_URL,
      transformRequest: [function (data) {
        let ret = ''
        // console.log(data);
        for (let it in data) {
          // console.log(it);
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        // console.log(ret);
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformResponse: [function (data) {
        // console.log(data);
      }]
    });
    instance.defaults.headers.common["token"] = localStorage.getItem("token");

    instance.interceptors.request.use(
      config => {
        let url = config.url;
        // console.log(url);
        if (url.indexOf("login") > -1) {
          localStorage.setItem('token', "");
          config.headers.token = "";
        }
        // console.log(config);
        return config;
      },
      err => {
        return Promise.reject(err);
      });
    instance.interceptors.response.use(
      response => {
        let res = response.request.response;
        res = JSON.parse(res);
        // console.log(res);
        //   if (res.status !== 0 && res.status !== 200) {
        //       vm.$Message.error(res.msg);
        //       iview.LoadingBar.error();
        //       return;
        //   }
        // return Promise.resolve(response);
        return res;
      },
      error => {
        // vm.$Message.error('啊哦~出错了o(╥﹏╥)o~~'+error);
        return Promise.reject(error); // 返回接口返回的错误信息
      });
    // 请求处理
    instance(options)
      .then((res) => {
        if (res.data) {
          resolve(res.data);
        } else {
          resolve(res)
        }

        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
}

Vue.config.productionTip = false
Vue.prototype.$api = fetch
Vue.use(iview)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


