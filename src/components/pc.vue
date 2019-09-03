<template>
  <div id="app">
  
  </div>
</template>

<script>

export default {
  data () {
      return {
          column:['聊天','榜单','成员'],
          column2:['简介','专题','图文','回放'],
          txt:'聊天',
          txt2:'简介',
          Login:true,
          Msg:[
              {
                  visit_name:'宝宝',
                  message_time:'2018-12-01',
                  message:'我叫宝宝，宝宝好开心啊'
              },
              {
                  visit_name:'宝宝',
                  message_time:'2018-12-01',
                  message:'我叫宝宝，宝宝好开心啊'
              },
              {
                  visit_name:'宝宝',
                  message_time:'2018-12-01',
                  message:'我叫宝宝，宝宝好开心啊'
              }
          ],
          list:[
        {
          status:'预约',
          name:'哈哈哈',
          num:99
        },
        {
          status:'直播',
          name:'哈哈哈',
          num:99
        },
         {
          status:'预约',
          name:'哈哈哈',
          num:299
        },
        {
          status:'直播',
          name:'哈哈哈',
          num:99
        },
         {
          status:'预约',
          name:'哈哈哈',
          num:199
        },
        {
          status:'直播',
          name:'哈哈哈',
          num:99
        },
      ],
      expert :[
         {
          status:'预约',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
        {
          status:'直播',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
          {
          status:'结束',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
        {
          status:'直播',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
         {
          status:'回放',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
        {
          status:'回放',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
      ],
      replay:[
        {
          status:'回放',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
        {
          status:'回放',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
         {
          status:'回放',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
        {
          status:'回放',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
        {
          status:'回放',
          title:'哈哈哈',
          createTime:'2010-01-10'
        },
        {
          status:'回放',
          title:'哈哈哈',
          createTime:'2010-01-10'
        }
      ]
      }
  },
  mounted () {
        var player = new TcPlayer('hlsPlay', {
  		/* "m3u8": "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8", //请替换成实际可用的播放地址 */
		"m3u8" : 'http://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/cc9f922c5285890781386012275/v.f230.m3u8',
		"flv":'http://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/7732bd367447398157015849771/v.f30.mp4',
        "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
        /* "coverpic" : "h-ui.admin/images/login_bg.jpg", */
        "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
        "height" : '100%',//视频的显示高度，请尽量使用视频分辨率高度
        "controls" : "system",
        "listener" : function(msg) {
                        var type = msg.type;
                        if (type == 'error') {//播放错误了，重连
                                window.setTimeout(function(){
                                    player.load();//进行重连
                                },5000);
                        } else if (type == 'ended') {//结束了，重新刷新页面，跳转到结束直播页面
                            reloadPage();//更新页面
                        } else if (type == 'pause') {//暂停，没做处理
                        }
                    }
        });
  },
  methods:{
      toggle (item) {
          this.txt = item
      },
      toggle2 (item) {
          this.txt2 = item
      },
      login () {

      },
      listd (i) {
        console.log(i)
        if(i== 0) {
            return 'first'
        }
        if(i== 1) {
            return 'sec'
        }
        if(i== 2) {
            return 'thir'
        }
      },
       status (item) {
        if(item == '直播') {
            return  'live'
        }
        if(item == '结束') {
            return  'end'
        }
        if(item == '预约') {
            return  'order'
        }
    },
  }
}
</script>

<style>
    .wechat {
        padding:4px 10px;
        cursor: pointer;
        background: rgb(54, 142, 243);
        color:#fff;
    }
    body {
        background-color: #eee
    }
    #app {
        width:1258px;
        margin:0 auto;
    }
    #video {
        width:100%;
    }
    .first {
        width:20px;
        height: 20px;
        background: url(../assets/fir.png) no-repeat;
        background-size:20px;
    }
    .sec {
        width:20px;
        height: 20px;
        background: url(../assets/sec.png) no-repeat;
        background-size:20px;
    }
    .thir {
        width:20px;
        height: 20px;
        background: url(../assets/third.png) no-repeat;
        background-size:20px;
    }
    .none {
        width:20px;
        height: 20px;
    }
    .listItem {
        display: flex;
        padding:10px;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #ccc;
        color:#fff;
    }
    .items {
        width:236px;
        margin-right: 15px ;
        margin-bottom:20px;
        position: relative;
        text-align: left;
        box-shadow: 0 0 4px rgba(0,0,0,.5)
    }
    .tips {
        background: green;
        padding: 2px 10px;
        position: absolute;
        left:0;
        z-index: 3;
        color:#fff;
        top:0;
    }
    .live {
        background: red;
    }
    .order {
        background: #00ffff;
    }
    .item {
        width:33.33%;
        padding: 10px 0;
        cursor:pointer;
    }
    .item2 {
        width:120px;
        padding: 10px 0;
        cursor:pointer;
    }
    .cur {
        border-bottom:1px solid #00ffff;
        color:#00ffff;
    }
    .cur2 {
        border-bottom:2px solid #00ffff;
    }
    .chat {
        position: relative;
    }
    .content {
        height:568px;
        padding-bottom: 40px;
        color:#fff;
    }
    .wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .avator {
        width:20px;
        height:20px;
        background: url(../assets/avator.png) no-repeat;
        background-size: 20px; 
        margin-right:20px;
    }
    .msg {
        position: absolute;
        left:0;
        bottom:44px;
        display: flex;
        justify-content: space-between;
        color:#fff;
        width:100%;
        background: #000;
        align-items: center;
        height:60px;
        padding:10px;

    }
     input::-webkit-input-placeholder{
            color:#fff;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#fff;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#fff;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#fff;
        }
    .msg2 {
        position: absolute;
        left:0;
        bottom:0;
        display: flex;
        justify-content: space-between;
        color:#fff;
        width:100%;
        background: #6c6c6c;
        align-items: center;
        height:60px;
    }
    .msg input {
        border:none;
        width: 180px;
        height:30px;
        padding-left: 10px;
        background: #333;
        color:#fff;
    }
    .send {
        width: 40px;
        color:#fff;
        background: gray;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
    }
    .msg input:focus {
        outline: none;
    }
</style>
