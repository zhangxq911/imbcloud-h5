<template>
  <div class="core-container">
    <button @click="openWin('https://open.weixin.qq.com/connect/qrconnect?appid=wx4a36e3e1cab43cf6&redirect_uri=https://api.imbcloud.cn/h5/share/channel?hls=1&share_type=wx&channel_id=149037&response_type=code&scope=snsapi_login&state=2014#wechat_redirect', 'title', '800', '600')">微信登录</button>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  data() {
    return {
      isLogin: false,
      data: {}
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.bs.destroy()
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollY: true,
        probeType: 3 // listening scroll hook
      })
    },
    openWin(url,name,iWidth,iHeight) { 
            //获得窗口的垂直位置 
            var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
            //获得窗口的水平位置 
            var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
            window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no'); 
        },
    loginWx() {
      console.log('微信登录')
      window.open('https://open.weixin.qq.com/connect/qrconnect?appid=wx4a36e3e1cab43cf6&redirect_uri=https://api.imbcloud.cn/access/h5/share/channel?hls=1&share_type=wx&channel_id=612913&response_type=code&scope=snsapi_login&state=2014#wechat_redirect', 'title', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
    }
  }
}
</script>

<style scoped>

.scroll-wrapper {
  height: 400px;
  overflow: hidden;
}

.scroll-item {
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  text-align: center;
}
</style>