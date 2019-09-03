<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import data from './lib/test.json'
export default {
  name: 'App',
  data () {
    return {
      unionId:"",
      data:"",
      data2:"",
    }
  },
  mounted () {
    let self = this
    // self.unionId = this.$cookies.get("unionId")
    // setInterval(function () {
    //   self.getData()
    // },15000)

    // localStorage.setItem('data',JSON.stringify(data))
    // console.log(data);
  },
  methods :{
    getData(){
      let self = this
      if(self.unionId != null && self.unionId != undefined){
        self.$api('/h5/getData.do?share_type=wx&flag=false').then((res) =>{
          if(res) {
            console.log(self.data)
            localStorage.setItem('data',JSON.stringify(res))
            self.data = JSON.parse(localStorage.getItem('data'))
            console.log(self.data)
            localStorage.removeItem('data')
          }else {
          }
        })
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'MicrosoftYaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
body {
  padding: 0;
  margin: 0;
}
</style>
