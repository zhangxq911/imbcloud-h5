<template>
  <div v-show="false">
    <div>
      <button @click="close">关闭</button>
      <video
        v-if="isShow"
        id="video"
        ref="video"
        src="http://playvideo.imbcloud.cn/60dc896c76114db880e13b9c55f405e1/9d5f228cd7944daa9d71cd7b43c7308e-2e8038267687b9b72a281685ed50b90a-ld.mp4"
        controls="controls"
        controlslist="nofullscreen nodownload"
        :style="{width: '100%'}"
      ></video>
    </div>
    <button @click="play">播放</button>
    <button @click="stop">暂停</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        cover: '',
        url: ''
      },
      isShow: true
    }
  },
  methods: {
    play() {
      // this.data = {
      //   cover: '',
      //   url: ''
      // }
      // this.data = {
      //   cover: '',
      //   url: ''
      // }
      // this.$refs.video.play()
      document.getElementById('video').play()
    },
    stop() {
      document.getElementById('video').pause()
      // this.$refs.video.pause()
    },
    close() {
      this.isShow = false
    }
  }
}
</script>

<style>
</style>