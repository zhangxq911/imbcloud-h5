<template>
    <div @click="go">
        <img style="width:100%;" :src="img" >
    </div>
</template>
<style>

</style>
<script>
export default {
  
    data () {
        return {
            img:'',
            boolean:true,
            hls:'',
            share_type: '',
            channel_id: '',
            user_id: ''
        }
    },
    mounted () {
        var self = this
        self.$api('/h5/getData.do').then((res) =>{
        if(res) {
            localStorage.setItem('data',JSON.stringify(res))
            this.img = res.guide_image 
            if(res.guide_flag == 1){
                this.countDown()
            }else {
                self.$router.push('/mobile')
            }
        }else {
        }
        })
        
    },
    methods:{
        countDown () {
            var self = this
            setTimeout(function(){
                if(self.boolean) {
                    self.$router.push('/mobile')
                }
            },6000)
        },
        go () {
            this.boolean = false
            this.$router.push('/mobile')
        }
    }
}
</script>