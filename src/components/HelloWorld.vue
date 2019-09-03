<template>
  <div class="hello" :style="{background:isMobile? '':'#eee' }">
    <!--手机界面-->
    <div v-if="isMobile">
      <div
        v-if="data.guide_flag == 1"
        @click="data.guide_flag=0"
        class="guide"
        :style="{backgroundImage:'url('+data.guide_image+')'}"
      ></div>
      <!-- <div class="coverLogor"  :style="{top: data.download_flag == 1? '50px':'10px'}" >
        <img style="width:100%" src="http://api.imbcloud.cn/console/res/img/right_logo.png">
      </div>-->
      <!--微信下载显示-->
      <div class="head" v-if="data.download_flag == 0">
        <div class="logo">
          <div class="scale">
            <div style="font-size:24px;">美播云互动</div>
          </div>
        </div>
        <div class="open" style="font-size:10px;background:#ff0040;padding:2px 4px;">
          <a href="https://api.imbcloud.cn/download/apps.do">打开看一下，参与互动</a>
        </div>
      </div>

      <!--播放界面-->
      <div class="video3">
        <div
          style="top: 0;left: 0;z-index: 1;width: 100%;height: 100%;"
          v-show="data.live_status == 1"
        >
          <div
            @click="off != off"
            v-show="data.guide_flag == 0&&zhibo==true"
            id="hlsPlay"
            class="video"
          ></div>
        </div>

        <div class="video3">
          <div v-for="(item,index) in replay" :key="item.id">
            <div
              v-if="item.video_id == data.live_video_id&&play3==true"
              id="hlsPlay3"
              class="video4"
            ></div>
          </div>
          <div v-for="(item,index) in replay" :key="item.id">
            <div v-if="index == replayIndex&&play4==true" id="hlsPlay4" class="video4"></div>
          </div>
          <!--回放-->
          <!--<div  id="hlsPlay3" class="video4"></div>-->
        </div>
        <div class="video2">
          <div
            class="coverLogo"
            v-if="(data.logo_pos == 1&&Logo==true)"
            :style="{backgroundImage:'url('+data.cover_logo+')',left: '10px',top: '10px'}"
          ></div>

          <div
            class="coverLogo"
            v-if="(data.logo_pos == 2&&Logo==true)"
            :style="{backgroundImage:'url('+data.cover_logo+')',right: '10px',top: '10px'}"
          ></div>

          <div
            class="coverLogo"
            v-if="(data.logo_pos == 3&&Logo==true)"
            :style="{backgroundImage:'url('+data.cover_logo+')',left: '10px',bottom: '10px'}"
          ></div>

          <div
            class="coverLogo"
            v-if="(data.logo_pos == 4&&Logo==true)"
            :style="{backgroundImage:'url('+data.cover_logo+')',right: '10px',bottom: '10px'}"
          ></div>

          <div v-show="(data.wx_mp_flag == 1 && off)" @click="show" class="guanzhu">关注</div>
          <div v-show="(data.user_num_flag !== 0)" class="showAmount">
            <div
              class="user"
              v-if="data.online_user_num+data.user_num_base < 1000"
            >{{data.online_user_num+data.user_num_base}}</div>
            <div
              class="user"
              v-if="data.online_user_num+data.user_num_base >= 1000 &&data.online_user_num+data.user_num_base < 10000"
            >{{data.online_user_num/1000+data.user_num_base/1000|numFilter}}千</div>
            <div
              class="user"
              v-if="data.online_user_num+data.user_num_base > 10000"
            >{{data.online_user_num/10000+data.user_num_base/10000|numFilter}} 万</div>
            <div class="discuss" v-if="data.comment_count == null">0</div>
            <div
              class="discuss"
              v-if="data.comment_count < 1000&&data.comment_count >0"
            >{{data.comment_count}}</div>
            <div
              class="discuss"
              v-if="data.comment_count >=1000&&data.comment_count < 10000"
            >{{data.comment_count/1000}}千</div>
            <div class="discuss" v-if="data.comment_count > 10000">{{data.comment_count/10000}}万</div>
          </div>
          <div
            class="v-cover"
            :style="{backgroundImage:'url(' + data.live_image + ')'}"
            v-show="backGround==true"
          >
            <div style="background: rgba(0,0,0,0.2);height: 100%">
              <div class="v-front">
                <div
                  style="border-radius:14px;background:#28afee;width:80px;margin:0 auto;font-size:14px"
                  :style="{background: data.live_status == -1 ? 'red':'#28afee',marginTop: data.live_status == -1? '20px':'' }"
                >
                  <span v-show="(data.live_status == 0)">即将直播</span>
                  <span v-show="(data.live_status == 1)">正在直播</span>
                  <span v-show="(data.live_status == -1)">直播结束</span>
                </div>
                <div style="margin-top:5px;font-size:20px">{{data.name}}</div>
                <div v-show="(data.live_status == -1)">{{endTime}}</div>
                <div
                  v-show="(data.countdown_flag ==1 && data.live_status == 0)"
                  style="position: absolute;bottom: 0;right: 0;left: 0;"
                >
                  <div
                    style="margin-top:5px;border-bottom:1px solid #Fff;width:100%;margin:0 auto;"
                  >距离直播开始还有</div>
                  <div style="margin-top:5px;">
                    <div style="margin:0 auto;width:50%;display: flex">
                      <div style="width: 50%">
                        <p>{{day}}</p>
                        <p>天</p>
                      </div>
                      <div style="height:30px;border-right:1px solid;margin-top: 5px"></div>
                      <div style="width: 50%">
                        <p>{{hour}}</p>
                        <p>时</p>
                      </div>
                      <div style="height:30px;border-right:1px solid;margin-top: 5px"></div>
                      <div style="width: 50%">
                        <p>{{minute}}</p>
                        <p>分</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="l-tabs" :style="{marginTop: data.download_flag == 1 ? '33px':''}">
        <div class="c-tabs-header">
          <div class="cast" v-show="data.banner_bar.length >0 ">
            <div
              v-if="data.banner_bar.length == 1"
              class="wrapper"
              :style="{width:  data.banner_bar.length * 100 + '%',marginLeft: marginLeft}"
            >
              <div
                style="display:flex;padding:0 20px;align-items:center;height:36px;"
                v-for="item in data.banner_bar"
                :key="item.id"
                :style="{width: Ws}"
              >
                <div>
                  <a :href="item.banner_link">
                    <Icon
                      v-show="item.banner_type == 0&&item.banner_link"
                      type="ios-link"
                      style="color: white;"
                    />
                  </a>
                </div>
                <div v-show="item.banner_type == 1">
                  <a v-if="item.banner_link" :href="item.banner_link">
                    <img
                      style="width:100%;height:100%;position: absolute;top: 0;bottom: 0;transform: translateX(-40px)"
                      :src="item.banner_imgurl"
                    >
                  </a>
                  <img
                    v-if="!item.banner_link"
                    style="width:100%;height:100%;position: absolute;top: 0;bottom: 0;transform: translateX(-40px)"
                    :src="item.banner_imgurl"
                  >
                </div>
                <div
                  v-show="item.banner_type == 0"
                  style="position:relative;width:100%;height:36px;overflow:hidden;"
                >
                  <span class="animate">
                    <span v-if="move(item.banner_text)">{{item.banner_text}}</span>
                    <marquee scrollamount="4" v-if="!move(item.banner_text)">{{item.banner_text}}</marquee>
                  </span>
                </div>
              </div>
            </div>
            <div
              v-if="data.banner_bar.length > 1"
              class="wrapper"
              :style="{width:  data.banner_bar.length * 100 + '%',marginLeft: marginLeft}"
            >
              <div
                style="display:flex;padding:0 40px;align-items:center;height:36px;"
                v-for="item in data.banner_bar"
                :key="item.id"
                :style="{width: Ws}"
              >
                <div>
                  <a :href="item.banner_link">
                    <Icon
                      v-show="item.banner_type == 0&&item.banner_link"
                      type="ios-link"
                      style="color: white;"
                    />
                  </a>
                </div>
                <div v-show="item.banner_type == 1">
                  <a v-if="item.banner_link" :href="item.banner_link">
                    <img
                      style="width:100%;height:100%;position: absolute;top: 0;bottom: 0;transform: translateX(-40px)"
                      :src="item.banner_imgurl"
                    >
                  </a>
                  <img
                    v-if="!item.banner_link"
                    style="width:100%;height:100%;position: absolute;top: 0;bottom: 0;transform: translateX(-40px)"
                    :src="item.banner_imgurl"
                  >
                </div>
                <div
                  v-show="item.banner_type == 0"
                  style="position:relative;width:95%;height:36px;overflow:hidden;"
                >
                  <span class="animate">
                    <span v-if="move(item.banner_text)">{{item.banner_text}}</span>
                    <marquee scrollamount="4" v-if="!move(item.banner_text)">{{item.banner_text}}</marquee>
                  </span>
                </div>
              </div>
            </div>
            <div v-show="(this.INDEX !== 1)" style="position:absolute;left:0px;top:0px;">
              <Icon
                @click="moves(1)"
                type="ios-arrow-back"
                size="18"
                color="#ccc"
                style="margin: 9px"
              />
            </div>
            <!--<div> <Icon type="ios-link" /></div>-->
            <!--<div style="position:relative;width:84%;height:50px;overflow:hidden;"><span id="animate" :style="{left: move}">{{cast}} </span></div>-->
            <div
              v-show="( data.banner_bar.length > 0 && this.INDEX !==(data.banner_bar.length) )"
              style="position:absolute;right:0px;top:0px;"
            >
              <Icon
                @click="moves(2)"
                type="ios-arrow-forward"
                size="18"
                color="#ccc"
                style="margin: 9px"
              />
            </div>
          </div>
          <div
            style="box-shadow:0px 2px 2px #ccc;text-align:center;width:100%;position:relative;margin:0 auto;font-size:14px;"
          >
            <Icon
              color="#28afee"
              type="md-arrow-dropdown"
              size="22"
              style="position:absolute;top:27px"
              :style="{left: l}"
            />
            <div
              @click="toggle(item.menu_type,index)"
              :class="{cur: Index == index}"
              style="padding:7px 2px;float:left"
              :style="{width: w}"
              v-for="(item,index) in data.custom_menu"
              :key="item.id"
            >{{item.menu_name}}</div>
            <div style="clear:both"></div>
          </div>
        </div>
        <div class="c-tabs" style="width:100%;">
          <!--菜单栏-->

          <!--菜单栏内容-->
          <div class="c-content" :style="{top: data.banner_bar.length >0? '20px':'19px'}">
            <!--简介-->
            <div v-if="txt == 0" style="padding:0 20px;width: 100%;height: 91%">
              <div style="text-align:left;padding:5px 0px;border-bottom:1px solid #ccc;width: 100%">
                <div style="padding: 5px 0">
                  <span style="font-size:16px;font-weight:bold;">{{data.name}}</span>
                  <span
                    style="font-size:14px;font-weight:bold;color:#fff;background-color:#28afee;padding:4px 6px;margin-left:20px;"
                    :style="{background: data.live_status == -1 ? 'red':'#28afee',marginTop: data.live_status == -1? '20px':'' }"
                  >
                    <span v-show="(data.live_status == 0)">即将直播</span>
                    <span v-show="(data.live_status == 1)">正在直播</span>
                    <span v-show="(data.live_status == -1)">直播结束</span>
                  </span>
                </div>
                <div style="font-size:14px;font-weight:bold;color:#ccc;">时间：{{data.start_time}}</div>
              </div>
              <div class="container" v-html="data.detail"></div>
            </div>
            <!--图文-->
            <div style="display:flex;width: 100%;height: 91%" v-if="txt == 1">
              <div class="container" v-html="detail[Index]" style="font-size: 20px;width: 100%"></div>
              <!--<div style="width: 100%;height: 100%"><img :src="data.custom_menu[Index].menu_detail" alt=""></div>-->
            </div>
            <!--聊天-->
            <div style="position: relative;height: 92%" v-show="txt == 2">
              <div class="chat-content" :style="{bottom: data.banner_bar.length >0? '85px':'55px'}">
                <div class="content" ref="scroll">
                  <div style="min-height: 101%;">
                    <div
                      style="text-align:left;margin:5px 0;padding: 5px 15px;border-bottom: 1px solid #ddd"
                      v-for="item in Message"
                      :key="item.id"
                    >
                      <div style="display:flex;align-items:center; text-align:left;">
                        <div
                          class="avator"
                          :style="{ 'backgroundImage': item.headimgurl!=''  ? 'url(' + item.headimgurl + ')':' '}"
                        ></div>
                        <div>
                          <div style="font-size: 14px">{{item.visit_name}}</div>
                          <div style="color: #aaa" v-if="!compareDate(item)">{{item.message_time}}</div>
                          <div
                            style="color: #aaa"
                            v-if="compareDate(item)"
                          >{{item.message_time.substring(item.message_time.length-8)}}</div>
                        </div>
                      </div>
                      <div style="color: #444">{{item.message}}</div>
                    </div>
                    <div style="width: 100%;height: 1px" v-if="Message"></div>
                  </div>
                </div>
              </div>
              <div
                @click="speak"
                style="background:#fff;height:40px;width:100%;position:fixed;left:0;bottom:10px;z-index: 5"
              >
                <div
                  style="background:#fff;border:1px solid #ccc;border-radius:20px;width:100%;height:40px;"
                >
                  <input
                    style="position:relative"
                    disabled
                    type="text"
                    class="text"
                    placeholder="发言"
                  >
                </div>
              </div>
            </div>
            <!--专题-->
            <div style="display:flex;flex-wrap:wrap" v-if="txt == 3">
              <div
                class="item"
                v-for="item in special"
                :key="item.id"
                @click="specialChange(index)"
              >
                <a
                  @click="set()"
                  :href="urlhead+'/h5/share/channel?hls=1&share_type=wx&channel_id='+item.special_channel_id"
                  target="_self"
                  style="color: #2c3e50;"
                >
                  <div class="tip" :class="status(item.live_status)">
                    {{item.live_status== 1? '直播': item.live_status == 0
                    ?
                    '预约' :'结束'}}
                  </div>
                  <div class="replayIcon"></div>
                  <div
                    class="replayCover"
                    :style="{backgroundImage:'url(' +  item.live_image + ')'}"
                    style="background-size:100% 100%;"
                  ></div>
                  <div>
                    <div>{{item.name}}</div>
                    <div>{{item.start_time}}</div>
                  </div>
                </a>
              </div>
            </div>
            <!--榜单-->
            <div v-if="txt == 4" style="padding:0 10px;">
              <div class="listItem" v-for="(item,index) in rank" :key="item.id">
                <div style="display:flex;align-items:center;">
                  <div
                    style="margin-right:20px;font-size:18px;text-align:center;color:rgba(67,67,67,0.9)"
                    class="none"
                    :class="listd(index)"
                  >{{index >2? index +1:''}}</div>
                  <div
                    style="margin-right:20px"
                    class="icon"
                    :style="{ 'backgroundImage': item.headimgurl != null ? 'url(' + item.headimgurl + ')':' '}"
                  ></div>
                  <div
                    style="color:rgba(67,67,67,0.9);font-size: 13px"
                  >{{item.visit_name|deCode}}</div>
                </div>
                <div style="float: right; color:rgba(67,67,67,0.7)">
                  邀请
                  <span style="color:deepskyblue">{{item.share_count}}</span> 人
                </div>
              </div>
            </div>
            <!--回放-->
            <div style="display:flex;flex-wrap:wrap;z-index:99" v-if="txt == 5">
              <div
                class="item"
                v-for="(item,index) in replay"
                :key="item.id"
                @click="replayChange(index)"
              >
                <div class="tip">回放</div>
                <div class="replayIcon"></div>
                <div
                  class="replayCover"
                  :style="{backgroundImage:'url(' +  item.cover_url + ')'}"
                  style="background-size:100% 100%;"
                ></div>
                <div>
                  <div>{{item.title}}</div>
                  <div>{{item.create_time}}</div>
                </div>
              </div>
            </div>
            <!--成员-->
            <div style="display:flex;" v-if="txt == 6">
              <div style="display: flex;flex-wrap: wrap;margin: 10px">
                <div style="width:70px;" v-for="item in users" :key="item.id">
                  <div
                    class="user_avator"
                    :style="{ 'backgroundImage': item.headimgurl != null ? 'url(' + item.headimgurl + ')':' '}"
                  ></div>
                  <div class="user_name">{{item.visit_name|deCode}}</div>
                </div>
              </div>
            </div>
            <!--照片直播-->
            <div
              style="height: 100%;width: 100%;position: absolute;top: 0"
              :style="{ 'opacity': txt == 7 ? 1 : 0 ,'z-index': txt == 7 ? 2 : -1}"
              v-if="iframe1 +1"
            >
              <div style="width:100%;height: 100%;-webkit-overflow-scrolling:touch;overflow:auto;">
                <!-- <screen :screen="data.custom_menu" :index="iframe1"></screen> -->
                <iframe
                  :src="data.custom_menu[iframe1].menu_detail"
                  frameborder="0"
                  style="width:100%;height: 100%"
                ></iframe>
              </div>
            </div>
            <!--大屏互动-->
            <div
              style="height: 100%;width: 100%;position: absolute;top: 0;"
              :style="{ 'opacity': txt == 8 ? 1 : 0 ,'z-index': txt == 8 ? 2 : -1}"
              v-if="iframe2 +1"
            >
              <div style="width:100%;height: 100%;-webkit-overflow-scrolling:touch;overflow:auto;">
                <!-- <screen :screen="data.custom_menu" :index="iframe2"></screen> -->
                <iframe
                  :src="data.custom_menu[iframe2].menu_detail"
                  frameborder="0"
                  style="width:100%;height: 100%"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--pc界面-->
    <div id="app" v-if="!isMobile">
      <div class="wrap">
        <div style="margin-top: 20px;">
          <div style="text-align:left;font-size:30px;margin-right:20px;font-weight:bold">
            {{data.name}}
            <span class="title" v-show="(data.live_status == 1 )">直播</span>
            <span class="title" v-show="(data.live_status == 0 )">预约直播</span>
            <span class="title" v-show="(data.live_status == -1 )">直播结束</span>
          </div>
          <div style="color:#666;">
            时间：{{data.start_time}}
            <span style="margin-left:20px;">{{data.online_user_num}}人在线</span>
            <span style="margin-left:20px;">{{data.history_user_num}}次观看</span>
          </div>
        </div>
        <div @click="pcShow" class="wechat">关注公众号</div>
      </div>
      <div style="display:flex;width:100%;height:568px;margin-top:10px">
        <div v-show="data.live_status==1">
          <div id="hlsPlay2" style="width:1008px;height:568px;"></div>
        </div>
        <div
          v-show="data.live_status==-1 || data.live_status== 0 "
          class="v-cover"
          style="width:1008px;height:568px;position:relative"
          :style="{ backgroundImage:'url(' + data.live_image + ')'}"
        >
          <div v-show="modal3" class="mask2">
            <div style="position:relative" class="m-content2">
              <Icon
                @click="modal3 = !modal3"
                color="#333"
                type="md-close"
                style="position:absolute;right:10px;top:10px;"
                size="24"
              />
              <div class="heads">{{data.wx_mp_name}}</div>
              <div class="ewm" :style="{backgroundImage: 'url(' + data.wx_mp_image + ')'}"></div>
              <div style="font-size:24">扫一扫关注公众号</div>
            </div>
          </div>
          <div @click="modal4 = !modal4" class="saoma">
            <span id="erweima"></span> 手机直播
          </div>
          <div class="patern" v-show="modal4">
            <div id="qrcode">
              <vue-qr :text="mobileUrl" :size="150"></vue-qr>
            </div>
            <div style="display:flex">
              <Input
                style="width:200px;margin-right:20px;"
                id="input"
                v-model="mobileUrl"
                type="text"
              />
              <div>
                <i-button @click="copy" type="primary">复制</i-button>
              </div>
            </div>
          </div>
          <div
            class="coverLogo"
            style="position:absolute;width:150px;top:10px"
            v-show="(data.logo_pos !==0)"
          >
            <img style="width:100%" :src="data.cover_logo">
          </div>
          <div class="v-front" v-show="(data.live_status == 0 )">
            <div
              style="border-radius:10px;background:#28afee;width:120px;padding:4px 10px;margin:0 auto;font-size:24px;"
            >即将直播</div>
            <div style="margin-top:5px;font-size:30px;">{{data.name}}</div>
            <div v-show="(data.countdown_flag ==1)">
              <div
                style="margin-top:15px;padding-bottom:20px;border-bottom:1px solid #Fff;font-size:24px;"
              >距离直播开始还有</div>
              <div style="margin-top:25px;">
                <table style="margin:0 auto;width:50%;font-size:24px">
                  <tr>
                    <td>{{day}}</td>
                    <td>{{hour}}</td>
                    <td>{{minute}}</td>
                  </tr>
                  <tr>
                    <td>天</td>
                    <td>时</td>
                    <td>分</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="v-end" style="margin-top:120px" v-show="( data.live_status == -1)">
            <div style="font-size:24px;">直播结束</div>
            <div style="margin-top:5px;font-size:30px;">{{data.name}}</div>
            <div style="margin-top:5px;font-size:24px;">{{endTime}}</div>
          </div>
        </div>
        <div style="width:20%;background:#333">
          <div style="display:flex;width:100%;color:#fff">
            <div
              @click="toggle3(item)"
              class="itemPc"
              :class="{cur3 : txt3 == item.menu_name}"
              v-for="item in column"
              :key="item.id"
            >{{item.menu_name}}</div>
          </div>
          <div>
            <div class="chat" v-show="txt3 == '聊天'">
              <div class="content">
                <div
                  style="text-align:left;   padding:0 10px;margin:5px 0;color:#fff;"
                  v-for="item in Msg"
                  :key="item.id"
                >
                  <div style="display:flex;align-items:center; text-align:left;">
                    <div class="avator"></div>
                    <div>
                      <div>{{item.visit_name}}</div>
                      <div>{{item.message_time}}</div>
                    </div>
                  </div>
                  <div>{{item.message}}</div>
                </div>
              </div>
              <div v-show="Login" class="msg">
                <div style="border-radius:4px;overflow:hidden;display:flex;">
                  <div>
                    <input v-model="word" type="text" placeholder="说点什么吧">
                  </div>
                  <div @click="send" class="send">发送</div>
                </div>
              </div>
              <div v-show="!Login" class="msg2" style="padding-right:30px;">
                <div id="qrcode2" v-show="Login2">
                  <vue-qr :text="mobileUrl2" :size="150"></vue-qr>
                </div>
                <span
                  @click="Login2 = !Login2"
                  style="margin-left:30px;color:#00ffff;cursor:pointer"
                >登陆微信</span>后才可以发送评论哦^_^
              </div>
            </div>
            <div v-show="txt3 == '榜单'">
              <div class="listItem" v-for="(item,index) in rank" :key="item.id">
                <div style="display:flex;align-items:center;">
                  <div
                    style="margin-right:20px;font-size:16px;text-align:center"
                    class="none"
                    :class="listd(index)"
                  >{{index >2? index +1:''}}</div>
                  <div style="margin-right:20px" class="icon"></div>
                  <div style="margin-right:60px">{{item.name}}</div>
                </div>
                <div>
                  邀请
                  <span style="color:red">{{item.num}}</span>人
                </div>
              </div>
            </div>
            <div style="display:flex;flex-wrap:wrap;" v-show="txt3 == '成员'">
              <div style="width:60px;" v-for="item in users" :key="item.id">
                <div
                  class="user_avator"
                  :style="{ backgroundImage:'url(' + item.headimgurl + ')' }"
                ></div>
                <div class="user_name">{{item.visit_name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style="font-size:18px;display:flex;width:100%;color:#999">
          <div
            @click="toggle2(item)"
            class="item2"
            :class="{cur2: txt2 == item.menu_name}"
            v-for="item in column2"
            :key="item.id"
          >{{item.menu_name}}</div>
        </div>
        <div v-show="txt2 == '简介'">
          <div style="text-align:left;padding:10px 0px;border-bottom:1px solid #ccc">
            <div>
              <span style="font-size:16px;font-weight:bold;">{{data.name}}</span>
            </div>
            <div style="font-size:14px;font-weight:bold;color:#ccc;">时间：{{data.start_time}}</div>
          </div>
          <div class="container">{{data.detail}}</div>
        </div>
        <div
          class="flex"
          style="flex-wrap:wrap;display:flex;padding-top:20px"
          v-show="txt2 == '专题'"
        >
          <div class="items" v-for="item in special" :key="item.id">
            <div class="tip" :class="status(item.status)">{{item.status}}</div>
            <div style="height:100px;width:100%;"></div>
            <div>
              <div>{{item.title}}</div>
              <div>{{item.createTime}}</div>
            </div>
          </div>
        </div>
        <div v-show="txt2 == '图文'"></div>
        <div style="display:flex;flex-wrap:wrap;padding-top:20px" v-show="txt2 == '回放'">
          <div class="items" v-for="item in replay" :key="item.id">
            <div class="tip">{{item.status}}</div>
            <div style="height:100px;width:100%;"></div>
            <div>
              <div>{{item.title}}</div>
              <div>{{item.createTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="modal1" title="发言" @on-ok="sendComments" @on-cancel="cancel">
      <textarea v-model="MSG" class="area" placeholder="请输入发言内容"></textarea>
    </Modal>

    <div v-if="modal2" class="mask">
      <div style="position:relative" class="m-content">
        <Icon
          @click="close"
          type="md-close"
          style="position:absolute;right:10px;top:10px;"
          size="24"
        />
        <div class="heads">{{data.wx_mp_name}}</div>
        <img class="ewm" :src="data.wx_mp_image">
        <!--<div class="ewm" :style="{backgroundImage: 'url(' + data.wx_mp_image + ')'}"></div>-->
        <div style="font-size:24">扫一扫关注公众号</div>
      </div>
    </div>

    <div v-if="(data.wx_mp_pop == 1 && isMobile && mp_pop == true)" class="mask">
      <div style="position:relative" class="m-content">
        <Icon
          @click="mp_pop = false"
          type="md-close"
          style="position:absolute;right:10px;top:10px;"
          size="24"
        />
        <div class="heads">{{data.wx_mp_name}}</div>
        <img class="ewm" :src="data.wx_mp_image">
        <!--<div class="ewm" :style="{backgroundImage: 'url(' + data.wx_mp_image + ')'}"></div>-->
        <div style="font-size:24">扫一扫关注公众号</div>
      </div>
    </div>
  </div>
</template>
<script>
// import screen from '../components/screen.vue'
import VueQr from 'vue-qr'
import axios from 'axios'
// import BScroll from 'better-scroll'
// import VueCookies from 'vue-cookies'

export default {
  data() {
    return {
      urlhead: 'https://ceshi.imbcloud.cn',
      // urlhead:"https://api.imbcloud.cn",
      mp_pop: true,
      play3: false,
      play4: false,
      iframe1: 0,
      iframe2: 0,
      mobileUrl2: '',
      Login2: false,
      mobileUrl: window.location.href,
      modal3: false,
      modal4: false,
      w: '',
      isMobile: true,
      MSG: '',
      Message: [],
      historyPage: 1,
      word: '',
      widths: window.screen.width,
      off: true,
      users: [],
      isShow: true,
      modal1: false,
      marginLeft: '',
      Login: false,
      Msg: [],
      modal2: false,
      rank: [],
      day: '',
      lastDate: '',
      hour: '',
      minute: '',
      l: '',
      flag: true,
      cast: '',
      lf: '',
      txt: '简介',
      txt2: '简介',
      txt3: '聊天',
      msg: '',
      column: [],
      column2: [],
      data: [],
      data1: [],
      coverUrl: '',
      INDEX: 1,
      detail: [],
      special: [
        {
          item: 1
        }
      ],
      Ws: window.screen.width + 'px',
      replay: [
        {
          item: 1
        }
      ],
      endTime: '',
      index: 0,
      Index: 0,
      keepAliveDate: '',
      pageShow: 0,
      unionId: 0,
      user_id: 0,
      n: true,
      Logo: true,
      backGround: true,
      zhibo: '',
      replayIndex: -1,
      hisScroll: null
    }
  },
  created() {
    this.$nextTick(() => {
      var self = this

      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        self.isMobile = true
      } else {
        self.isMobile = false
      }
      if (self.unionId != null && self.unionId != undefined) {
        self
          .$api('/h5/getData.do?share_type=wx&flag=' + this.flag)
          .then(res => {
            if (res) {
              self.flag = false
              self.data = ''
              self.getData()
              localStorage.setItem('data', JSON.stringify(res))
              self.data = JSON.parse(localStorage.getItem('data'))
              localStorage.removeItem('data')
              self.getReplayLst()
              self.getHistory()
              self.getComments()
              setTimeout(function() {
                self.wxshare()
              }, 1000)
              for (let i = 0; i < self.data.custom_menu.length; i++) {
                self.detail.push(
                  Base64.decode(self.data.custom_menu[i].menu_detail)
                )
              }
              for (let i = 0; i < self.data.custom_menu.length; i++) {
                if (self.data.custom_menu[i].menu_type == 7) {
                  this.iframe1 = i
                  break
                } else {
                  this.iframe1 = false
                }
              }
              for (let i = 0; i < self.data.custom_menu.length; i++) {
                if (self.data.custom_menu[i].menu_type == 8) {
                  this.iframe2 = i
                  break
                } else {
                  this.iframe2 = false
                }
              }
              if (self.data.live_status == -1) {
                let y = self.data.end_time.substr(0, 4)
                let m = self.data.end_time.substr(5, 2)
                let d = self.data.end_time.substr(8, 2)
                let h = self.data.end_time.substr(11, 2)
                let M = self.data.end_time.substr(14, 2)
                self.endTime =
                  '于' + m + '月' + d + '日' + ' ' + h + '时' + M + '分结束'
                if (self.data.live_video_id != '') {
                  self.getReplay()
                }
              }
              if (self.data.live_status == 0) {
                self.countDown()
              }
              if (self.data.live_status == 1) {
                self.zhibo = true
                if (self.isMobile) {
                  if (navigator.userAgent.match(/(Android)/i)) {
                    // alert("android+"+self.data.streams.hls_play_url);
                    setTimeout(function() {
                      var player = new TcPlayer('hlsPlay', {
                        m3u8: self.data.streams.hls_play_url,
                        // "coverpic": {"style": "cover", "src": self.data.live_image},
                        width: '100%',
                        height: '100%',
                        live: true,
                        autoplay: true,
                        controls: 'system',
                        listener: function(msg) {
                          var type = msg.type
                          if (type == 'error') {
                            //播放错误了，重连
                            window.setTimeout(function() {
                              // player.load();//进行重连
                              // window.location.reload();
                            }, 5000)
                          } else if (type == 'ended') {
                            //结束了，重新刷新页面，跳转到结束直播页面
                            window.location.reload() //更新页面
                          } else if (type == 'pause') {
                            //暂停，没做处理
                          } else if (type == 'play') {
                            self.Logo = false
                          }
                        }
                      })
                      $('#hlsPlay > div > video').attr(
                        'x-webkit-airplay',
                        'true'
                      )
                      $('#hlsPlay > div > video').attr('x5-playsinline', 'true')
                      $('#hlsPlay > div > video').attr(
                        'webkit-playsinline',
                        'true'
                      )
                      $('#hlsPlay > div > video').attr('playsinline', 'true')
                      $('#hlsPlay > div > video').attr(
                        'poster',
                        self.data.live_image
                      )
                      $('#hlsPlay > div > video').attr('live', 'true')
                      $('#hlsPlay > div > video').attr('autoplay', 'true')
                    }, 100)
                  } else {
                    // alert("ios+"+self.data.streams.hls_play_url);
                    setTimeout(function() {
                      var player = new TcPlayer('hlsPlay', {
                        m3u8: self.data.streams.hls_play_url,
                        // "coverpic": {"style": "cover", "src": self.data.live_image},
                        width: '100%',
                        height: '100%',
                        live: true,
                        autoplay: true,
                        controls: 'system',
                        listener: function(msg) {
                          var type = msg.type
                          if (type == 'error') {
                            //播放错误了，重连
                            window.setTimeout(function() {
                              // player.load();//进行重连
                              // window.location.reload();
                            }, 5000)
                          } else if (type == 'ended') {
                            //结束了，重新刷新页面，跳转到结束直播页面
                            window.location.reload() //更新页面
                          } else if (type == 'pause') {
                            //暂停，没做处理
                          } else if (type == 'play') {
                            //暂停，没做处理
                            self.Logo = false
                          }
                        }
                      })
                      $('#hlsPlay > div > video').attr(
                        'x-webkit-airplay',
                        'true'
                      )
                      $('#hlsPlay > div > video').attr('x5-playsinline', 'true')
                      $('#hlsPlay > div > video').attr(
                        'webkit-playsinline',
                        'true'
                      )
                      $('#hlsPlay > div > video').attr('playsinline', 'true')
                      $('#hlsPlay > div > video').attr(
                        'poster',
                        self.data.live_image
                      )
                      $('#hlsPlay > div > video').attr('live', 'true')
                      $('#hlsPlay > div > video').attr('autoplay', 'true')
                    }, 100)
                  }
                } else {
                  //pc
                  setTimeout(function() {
                    var player2 = new TcPlayer('hlsPlay2', {
                      m3u8: self.data.streams.hls_play_url,
                      // "coverpic": {"style": "cover", "src": self.data.live_image},
                      live: true,
                      width: '100%',
                      height: '100%',
                      autoplay: true,
                      volume: 0.5,
                      controls: 'system',
                      listener: function(msg) {
                        var type = msg.type
                        if (type == 'error') {
                          //播放错误了，重连
                          window.setTimeout(function() {
                            // player.load();//进行重连
                          }, 5000)
                        } else if (type == 'ended') {
                          //结束了，重新刷新页面，跳转到结束直播页面
                          window.location.reload() //更新页面
                        } else if (type == 'pause') {
                          //暂停，没做处理
                        }
                      }
                    })
                  }, 1000)
                }
              }

              document.title = self.data.name
              if (this.isMobile) {
                self.width()
                this.toggle(self.data.custom_menu[0].menu_type, 0)()
                self.scroll()
              }
            } else {
              self.getData()
            }
          })
      }
    })
  },
  mounted() {
    var self = this
    // self.pushHistory()
    // self.reload()
    setTimeout(function() {
      self.toggle(self.data.custom_menu[0].menu_type, 0)()
    }, 1000)
    setTimeout(function() {
      self.go()
    }, 1000)
  },
  components: { VueQr },
  filters: {
    // 精确到小数点后两位
    numFilter(value) {
      let realVal = parseFloat(value).toFixed(2)
      return parseFloat(realVal)
    },
    // base64解码
    deCode(value) {
      let realVal = Base64.decode(value)
      return realVal
    }
  },
  methods: {
    set() {
      this.data = ''
    },
    reload() {
      var self = this
      window.onload = function() {
        setTimeout(function() {
          window.addEventListener('popstate', function() {
            // alert("返回按钮事件1");
            self.data = ''
            window.location.reload()
          })
        }, 0)
      }
    },
    pushHistory() {
      var state = {
        title: 'title',
        url: '#'
      }
      window.history.pushState(state, 'title', '#')
    },
    scroll() {
      let self = this
      this.hisScroll = new BScroll(this.$refs.scroll, {
        click: true,
        scrollY: true,
        probeType: 3,
        pullDownRefresh: {
          threshold: 60, // 下拉距离超过60px触发pullingDown事件
          stop: 10 // 回弹停留在距离顶部10px的位置
        }
      })
      self.hisScroll.on('pullingDown', () => {
        self.getHistory()
      })
    },
    go() {
      var self = this
      if (self.data.banner_bar.length > 1) {
        this.timer = setInterval(() => {
          if (self.INDEX >= self.data.banner_bar.length) {
            self.INDEX = 1
            self.index = 0
            self.marginLeft = 0
            this.moves(1)
          }
          this.moves(2)
        }, 10000)
      }
    },
    wxshare() {
      let self = this
      let params = {
        // 'url': 'https://ceshi.imbcloud.cn/h5/share/channel?hls=1&share_type=wx&channel_id=' + this.data.channel_id,
        url: location.href.split('#')[0]
      }
      self
        .$api({ url: '/wechatParam.do', methods: 'post', params: params })
        .then(res => {
          // 微信分享
          if (res) {
            wx.config({
              debug: false,
              appId: res.appid,
              timestamp: res.timestamp,
              nonceStr: res.nonceStr,
              signature: res.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
            })
            wx.ready(function() {
              wx.onMenuShareTimeline({
                title: self.data.wx_share_title,
                desc: self.data.wx_share_msg,
                link:
                  self.urlhead +
                  '/h5/share/channel?hls=1&share_type=wx&channel_id=' +
                  self.data.channel_id +
                  '&user_id=' +
                  self.data.visit_id,
                imgUrl: self.data.wx_share_image,
                type: '',
                dataUrl: '',
                success: function() {
                  // alert('分享成功！！')
                }
              }),
                wx.onMenuShareAppMessage({
                  title: self.data.wx_share_title,
                  desc: self.data.wx_share_msg,
                  link:
                    self.urlhead +
                    '/h5/share/channel?hls=1&share_type=wx&channel_id=' +
                    self.data.channel_id +
                    '&user_id=' +
                    self.data.visit_id,
                  imgUrl: self.data.wx_share_image,
                  type: '',
                  dataUrl: '',
                  success: function() {
                    // alert('分享成功！！')
                  }
                })
            })
          }
        })
    },
    pullingDownUp() {
      let self = this
      self.hisScroll.finishPullDown()
      self.hisScroll.finishPullUp()
      self.hisScroll.refresh() //重新计算元素高度
    },
    getHistory() {
      let self = this
      let params = {
        visit_id: this.data.visit_id,
        channel_id: this.data.channel_id,
        page: this.historyPage
      }
      self
        .$api({ url: '/getHistoryComments.do', method: 'post', params: params })
        .then(res => {
          if (res) {
            // let array = res.comments
            if (res.result == false) {
              // alert("没有更多的历史聊天记录了")
            } else {
              if (this.historyPage == 1) {
                for (var i = 0; i < res.comments.length - 1; i++) {
                  self.Message.unshift(res.comments.splice(0, 1)[0])
                  i--
                }
              } else {
                for (var i = 0; i < res.comments.length; i++) {
                  self.Message.unshift(res.comments.splice(0, 1)[0])
                  i--
                }
              }
              // 历史评论
            }
          }
        })
      if (self.historyPage == 1) {
        // self.scroll()
      } else {
        this.$nextTick(() => {
          // 聊天滚动
          self.pullingDownUp()
        })
      }
      self.historyPage += 1
    },
    getComments() {
      let self = this
      let params = {
        lastDate: this.lastDate,
        visit_id: this.data.visit_id,
        channel_id: this.data.channel_id,
        visit_name: this.visitName
        // 'date': new Date().toTimeString()
      }
      self
        .$api({ url: '/getComments.do', method: 'post', params: params })
        .then(res => {
          if (res.result) {
            self.lastDate = res.date
            if (res.comments.length != 0) {
              for (var i = 0; i < res.comments.length; i++) {
                self.Message.push(res.comments.splice(0, 1)[0])
                i--
              }
              // console.log("其他人发送的评论");
              console.log(this.hisScroll.maxScrollY)
              setTimeout(() => {
                this.hisScroll.scrollTo(0, this.hisScroll.maxScrollY)
              }, 100)
            } else {
              // console.log("没有其他人发送的评论");
            }
            self.getComments()
          }
        })
    },
    sendComments() {
      let self = this
      let params = {
        visit_name: this.data.visit_name,
        visit_id: this.data.visit_id,
        message: this.MSG,
        headimgurl: this.data.headimgurl,
        channel_id: this.data.channel_id,
        date: new Date().toTimeString()
      }
      if (self.MSG == '') {
        alert('聊天信息不能为空')
      } else {
        self
          .$api({ url: '/sendComment.do', method: 'post', params: params })
          .then(res => {
            // console.log('你发送的信息')
            if (res.result) {
              // self.Message.push(res.msg)
              self.MSG = ''
            }
          })
        setTimeout(() => {
          this.hisScroll.scrollTo(0, this.hisScroll.maxScrollY)
        }, 100)
        if (navigator.userAgent.match(/(|iPhone|iPod|ios|iPad|)/i)) {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
          // console.log('ios置顶')
        }
      }
    },
    replayChange(index) {
      var self = this
      self.zhibo = false
      self.backGround = false
      self.Logo = false
      self.play3 = false
      self.play4 = true
      $('.video3')
        .eq(0)
        .css('background', 'rgba(0,0,0,0.75)')
      if (self.replayIndex == index) {
      } else {
        // self.data.live_video_id = self.replay[index].video_id
        self.replayIndex = index
        setTimeout(function() {
          var player4 = new TcPlayer('hlsPlay4', {
            m3u8: self.replay[index].video_url,
            // "coverpic": {"style": "cover", "src": self.replay[index].cover_url},
            live: false,
            width: '100%',
            height: '100%',
            autoplay: false,
            volume: 0.5,
            controls: 'system',
            'x-webkit-airplay': 'true',
            'x5-playsinline': 'true',
            playsinline: 'true',
            'webkit-playsinline': 'true',
            listener: function(msg) {
              var type = msg.type
              if (type == 'error') {
                //播放错误了，重连
                window.setTimeout(function() {
                  // player4.load();//进行重连
                }, 5000)
              } else if (type == 'ended') {
                //结束了，重新刷新页面，跳转到结束直播页面
                reloadPage() //更新页面
              } else if (type == 'pause') {
                //暂停，没做处理
              } else if (type == 'play') {
              }
            }
          })
          $('#hlsPlay4 > div > video').attr('x-webkit-airplay', 'true')
          $('#hlsPlay4 > div > video').attr('x5-playsinline', 'true')
          $('#hlsPlay4 > div > video').attr('webkit-playsinline', 'true')
          $('#hlsPlay4 > div > video').attr('playsinline', 'true')
          $('#hlsPlay4 > div > video').attr(
            'poster',
            self.replay[index].cover_url
          )
        }, 100)
      }
    },
    keepAlive: function() {
      var self = this
      let params = {
        visitName: self.data.visit_name,
        visit_id: self.data.visit_id,
        lastDate: self.keepAliveDate,
        channel_id: self.data.channel_id,
        date: new Date().toTimeString()
      }
      self
        .$api({ url: '/keepAliveChannel.do', methods: 'post', params: params })
        .then(res => {
          // console.log('最近活跃日期')
          if (res.result) {
            self.keepAliveDate = res.lastDate
          }
        })
    },
    compareDate(item) {
      let nowMonth = new Date().getMonth()
      let nowDate = new Date().getDate()
      let sendMonth = new Date(item.message_time).getMonth()
      let sendDate = new Date(item.message_time).getDate()
      if (item) {
        if (nowMonth == sendMonth && nowDate == sendDate) {
          return true
        } else {
          return false
        }
      }
    },
    getRank() {
      let self = this
      let params = {
        channel_id: self.data.channel_id
      }
      self
        .$api({ url: '/getSharelist.do', method: 'get', params: params })
        .then(res => {
          // console.log('榜单')
          if (res.result) {
            self.rank = res.users
          }
        })
    },
    getUsers() {
      let self = this
      let params = {
        page: 1,
        filter: 1,
        sort: 'asc',
        channel_id: self.data.channel_id
      }
      self
        .$api({ url: '/getUsers.do', method: 'get', params: params })
        .then(res => {
          // console.log('用户')
          if (res.result) {
            self.users = res.users
          }
        })
    },
    getSpecialChannel() {
      var self = this
      let params = {
        channel_id: this.data.channel_id,
        page: 1
      }
      self
        .$api({ url: '/getSpecialChannel.do', method: 'post', params: params })
        .then(res => {
          // console.log('专题列表')
          if (res) {
            self.special = res.specials
          }
        })
    },
    getReplayLst() {
      var self = this
      let params = {
        channel_id: this.data.channel_id,
        page: 1
      }
      self
        .$api({ url: '/h5/getPlaybackLst.do', method: 'post', params: params })
        .then(res => {
          // console.log('回放列表')
          if (res) {
            self.replay = res
            // self.defaultReplay();
          }
        })
    },
    getReplay() {
      var self = this
      self.backGround = false
      self.Logo = false
      self.play4 = false
      self.play3 = true
      $('.video3')
        .eq(0)
        .attr('background', 'rgbba(0,0,0,0.75)')
      let params = {
        channel_id: this.data.channel_id,
        video_id: this.data.live_video_id
      }
      self
        .$api({ url: '/h5/getPlayback.do', method: 'post', params: params })
        .then(res => {
          // console.log('默认回放')
          if (res) {
            var player3 = new TcPlayer('hlsPlay3', {
              m3u8: res.video_url,
              // "coverpic": {"style": "cover", "src": res.cover_url},
              width: '100%',
              height: '100%',
              live: false,
              autoplay: false,
              controls: 'system',
              'x-webkit-airplay': 'true',
              'x5-playsinline': 'true',
              playsinline: 'true',
              'webkit-playsinline': 'true',
              listener: function(msg) {
                var type = msg.type
                if (type == 'error') {
                  //播放错误了，重连
                  window.setTimeout(function() {
                    player3.load() //进行重连
                  }, 5000)
                } else if (type == 'ended') {
                  //结束了，重新刷新页面，跳转到结束直播页面
                  reloadPage() //更新页面
                } else if (type == 'pause') {
                  //暂停，没做处理
                } else if (type == 'play') {
                }
              }
            })
            $('#hlsPlay3 > div > video').attr('x-webkit-airplay', 'true')
            $('#hlsPlay3 > div > video').attr('x5-playsinline', 'true')
            $('#hlsPlay3 > div > video').attr('webkit-playsinline', 'true')
            $('#hlsPlay3 > div > video').attr('playsinline', 'true')
            $('#hlsPlay3 > div > video').attr('poster', res.cover_url)
          }
        })
    },
    getData() {
      let self = this
      if (self.unionId != null && self.unionId != undefined) {
        self.$api('/h5/getData.do?share_type=wx&flag=false').then(res => {
          if (res) {
            localStorage.setItem('data', JSON.stringify(res))
            self.data1 = JSON.parse(localStorage.getItem('data'))
            if (self.data1.guide_flag == 1) {
              self.data1.guide_flag = 0
            }
            if (self.data.live_status == self.data1.live_status) {
              self.data = self.data1
            } else {
              window.location.reload()
            }
            localStorage.removeItem('data')
          }
        })
      }
      setTimeout(function() {
        self.getData()
      }, 15000)
    },
    pcLogin() {
      var self = this,
        n = 0,
        params = {}
      var timer = setInterval(function() {
        if (n == 60) {
          clearInterval(timer)
        } else {
          self
            .$api({ url: '/sendComment.do', method: 'post', params: params })
            .then(res => {
              if (res.result) {
                self.Msg.push(res.msg)
                n++
              } else {
                n++
              }
            })
        }
      }, 1000)
    },
    send() {
      let self = this
      let params = {
        visit_name: self.data.visit_name,
        visit_id: self.data.visit_id,
        message: self.word,
        channel_id: self.data.channel_id,
        date: new Date().toTimeString()
      }
      self.word = ''
      self
        .$api({ url: '/sendComment.do', method: 'post', params: params })
        .then(res => {
          // console.log('pc已发送的评论')
          if (res.result) {
            self.Msg.push(res.msg)
          }
        })
    },
    copy() {
      var text = $('#input input').value
      var input = $('#input input')
      input.value = text // 修改文本框的内容
      input.select() // 选中文本
      document.execCommand('copy') // 执行浏览器复制命令
      this.$Message.success('复制成功')
    },
    login() {
      this.Login2 = !this.Login2
    },
    move(text) {
      if (text) {
        if (text.length >= 19) {
          return false
        } else {
          return true
        }
      }
    },
    moves(key) {
      clearInterval(this.timer)
      if (this.marginLeft.length > 0) {
        this.index = parseInt(this.marginLeft)
      }
      if (key == 1) {
        this.marginLeft = this.index + window.screen.width + 'px'
        this.INDEX--
      }
      if (key == 2) {
        this.marginLeft = this.index - window.screen.width + 'px'
        this.INDEX++
      }
      this.go()
    },
    countDown() {
      clearInterval(timer)
      var self = this
      var date = new Date().toString().replace(/-/g, '/')
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0 //时间默认值
      var times =
        new Date(self.data.start_time.replace(/-/g, '/')).getTime() -
        new Date(date).getTime()
      //new Date(data.replace(/-/g,'/')).getTime() //ios getTime兼容问题
      var timer = null
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24 * 1000))
        hour = Math.floor(times / (60 * 60 * 1000)) - day * 24
        minute = Math.floor(times / (60 * 1000)) - day * 24 * 60 - hour * 60
      }
      if (day <= 9) day = '0' + day
      if (hour <= 9) hour = '0' + hour
      if (minute <= 9) minute = '0' + minute
      self.day = day
      self.hour = hour
      self.minute = minute
      timer = setInterval(function() {
        if (times > 0) {
          day = Math.floor(times / (60 * 60 * 24 * 1000))
          hour = Math.floor(times / (60 * 60 * 1000)) - day * 24
          minute = Math.floor(times / (60 * 1000)) - day * 24 * 60 - hour * 60
        }
        if (day <= 9) day = '0' + day
        if (hour <= 9) hour = '0' + hour
        if (minute <= 9) minute = '0' + minute
        self.day = day
        self.hour = hour
        self.minute = minute
        times = times - 10000
        if (times < 0) {
          window.location.reload()
        }
      }, 10000)
      if (times <= 0) {
        clearInterval(timer)
        window.location.reload()
      }
    },
    width() {
      if (this.data.custom_menu.length == 2) {
        this.w = '50%'
      }
      if (this.data.custom_menu.length == 3) {
        this.w = '33.3%'
      }
      if (this.data.custom_menu.length == 4) {
        this.w = '25%'
      }
      if (this.data.custom_menu.length == 5) {
        this.w = '20%'
      }

      this.l =
        ((window.screen.width * parseInt(this.w)) / 200 - 11).toFixed(2) + 'px'
    },
    posn() {
      let obj = {}
      if (this.data.logo_pos == 1) {
        obj.left = '10px'
        obj.top = '10px'
        return obj
      }
      if (this.data.logo_pos == 2) {
        obj.right = '10px'
        obj.top = '10px'
        return obj
      }
      if (this.data.logo_pos == 3) {
        obj.left = '10px'
        obj.bottom = '10px'
        return obj
      }
      if (this.data.logo_pos == 4) {
        obj.right = '10px'
        obj.bottom = '10px'
        return obj
      }
    },
    status(item) {
      if (item == 1) {
        return 'live'
      }
      if (item == -1) {
        return 'end'
      }
      if (item == 0) {
        return 'order'
      }
    },
    listd(i) {
      if (i == 0) {
        return 'first'
      } else if (i == 1) {
        return 'sec'
      } else if (i == 2) {
        return 'thir'
      } else {
        // console.log(i)
        return
      }
    },
    toggle2(item) {
      this.txt2 = item.menu_name
    },
    toggle3(item) {
      this.txt3 = item.menu_name
    },
    toggle(item, i) {
      this.txt = item
      this.Index = i
      this.l =
        (window.screen.width * parseInt(this.w)) / 200 -
        11 +
        i * ((window.screen.width * parseInt(this.w)) / 100).toFixed(2) +
        'px'
      if (item == 2) {
        this.scroll()
        this.$nextTick(() => {
          this.pullingDownUp()
        })
        setTimeout(() => {
          this.hisScroll.scrollTo(0, this.hisScroll.maxScrollY)
        }, 10)
      }
      if (item == 3) {
        this.getSpecialChannel()
      }
      if (item == 4) {
        this.getRank()
      }
      if (item == 5) {
        this.getReplayLst()
      }
      if (item == 6) {
        this.getUsers()
      }
    },
    speak() {
      this.modal1 = true
      $('.v-transfer-dom>.ivu-modal-wrap>.ivu-modal').css('top', '300px')
    },
    ok() {},
    cancel() {},
    ok2() {},
    pcShow() {
      this.modal3 = true
    },
    pcShow2() {
      this.modal4 = true
    },
    cancel2() {},
    close() {
      this.modal2 = false
    },
    open() {
      window.location.href = ' ../download/apps.do'
    },
    show() {
      this.modal2 = true
    }
  }
}
</script>

Add "scoped" attribute to limit CSS to this component only
<style scoped>
#qrcode2 {
  position: absolute;
  left: 0;
  bottom: 50px;
}

#erweima {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../assets/share.png) no-repeat;
  background-size: cover;
  cursor: pointer;
}

.saoma {
  width: 100%;
  display: flex;
  cursor: pointer;
  height: 50px;
  background: #555;
  text-align: left;
  line-height: 30px;
  padding-left: 40px;
  color: #fff;
  align-items: center;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.patern {
  position: absolute;
  left: 10px;
  bottom: 60px;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
}

.user_avator {
  width: 40px;
  height: 40px;
  margin: 10px auto;
  border-radius: 50%;
  background: url(../assets/peo.png) center no-repeat #333;
  background-size: cover;
}

.wechat {
  padding: 4px 10px;
  cursor: pointer;
  background: rgb(54, 142, 243);
  color: #fff;
}

body {
  background-color: #eee;
}

#app {
  width: 1258px;
  margin: 0 auto;
}

.coverLogo {
  width: 100px;
  height: 25px;
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 999;
  font-size: 20px;
  color: white;
}

.coverLogor {
  width: 60px;
  height: 40px;
  position: fixed;
  right: 10px;
  top: 54px;
  z-index: 999;
}

.showAmount {
  position: absolute;
  right: 5px;
  bottom: 3%;
  z-index: 999;
  display: flex;
}

.avator {
  width: 40px;
  height: 40px;
  background: url(../assets/avator.png) no-repeat;
  background-size: 41px;
  margin-right: 20px;
  border-radius: 50%;
}

.v-cover {
  width: 100%;
  height: 100%;
  /* background: url(../assets/login_bg.png) 100% 100% no-repeat; */
  background: rgba(0, 0, 0, 0.3);
  background-size: 100% 100%;
  color: #fff;
  /*padding-top: 10%;*/
}

.guide {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 20000;
  background: transparent;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.user {
  height: 20px;
  padding-left: 19px;
  margin-right: 9px;
  color: #fff;
  line-height: 26px;
  background: url(../assets/peo.png) no-repeat;
  background-size: 20px;
}

.discuss {
  height: 20px;
  padding-left: 24px;
  margin-right: 15px;
  color: #fff;
  line-height: 26px;
  background: url(../assets/dis.png) no-repeat;
  background-size: 20px;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
}

.mask2 {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
}

.m-content {
  width: 80%;
  margin: 0 auto;
  margin-top: 80%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
}

.m-content2 {
  width: 250px;
  margin: 0 auto;
  margin-top: 20%;
  background: #fff;
  border-radius: 6px;
  padding: 20px;
}

.ewm {
  width: 100px;
  height: 100px;
  /*background: url(../assets/gz.jpg) center no-repeat;*/
  /*background-size: cover;*/
  margin: 15px auto;
}

.heads {
  /*border-bottom: 1px solid #ccc;*/
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin-top: 9px;
}

.animate {
  width: 100%;
  position: absolute;
  left: 10px;
  font-size: 14px;
  top: 9px;
  text-align: left;
}

.replayCover {
  width: 100%;
  height: 100px;
  background: url(../assets/avator.png) no-repeat;
  background-size: 100% 100%;
}

.item {
  width: 48%;
  position: relative;
  margin: 1%;
  text-align: left;
  box-shadow: 0px 0px 2px #ccc;
}

.content {
  position: relative;
  color: black;
  height: 100%;
  overflow: hidden;
  /*padding-bottom: 10px;*/
  /*color: black;*/
}

.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.itemPc {
  width: 33.33%;
  padding: 10px 0;
  cursor: pointer;
}

.msg {
  position: absolute;
  left: 0;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  width: 100%;
  background: #000;
  align-items: center;
  height: 50px;
  padding: 10px;
}

.replayIcon {
  position: absolute;
  left: 40%;
  top: 20%;
  width: 30px;
  background: url(../assets/play.png) no-repeat;
  background-size: cover;
  height: 30px;
}

.item2 {
  width: 120px;
  padding: 10px 0;
  cursor: pointer;
}

.guanzhu {
  width: 60px;
  height: 20px;
  padding-left: 20px;
  background: url(../assets/gz.jpg) no-repeat;
  background-size: 20px;
  position: absolute;
  right: 0;
  top: 20px;
  z-index: 939;
  color: #42b983;
  overflow: scroll;
}

.area {
  width: 100%;
  height: 60px;
  font-size: 14px;
  border: none;
}

.area:focus {
  outline: none;
}

.c-content {
  margin-top: -12px;
  position: absolute;
  width: 100%;
  overflow: auto;
  top: 40px;
  bottom: 0;
  z-index: 7;
}

.chat-content {
  position: absolute;
  width: 100%;
  overflow: hidden;
  top: 0px;
  z-index: 7;
  /*bottom: 65px;*/
  /*margin-bottom: 40px;*/
}

.container {
  font-size: 16px;
  text-align: justify;
  padding: 10px 0;
  word-break: break-all;
}

.container >>> img {
  max-width: 100%;
}

.c-tabs-header {
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
}

.head {
  width: 100%;
  height: 33px;
  display: flex;
  justify-content: space-between;
  background: #000;
  color: #fff;
  align-items: center;
  padding: 0 10px;
  z-index: 99;
}

.logo {
  /* background: url(../assets/logo1.png) no-repeat; */
  padding-left: 40px;
  background-size: 28px;
  height: 29px;
}

.icon {
  width: 40px;
  height: 40px;
  background: url(../assets/avator.png) no-repeat;
  background-size: cover;
  border-radius: 50%;
}

.title {
  font-size: 14px;
  background: #ff0040;
  border-radius: 4px;
  padding: 2px 4px;
  color: #fff;
  margin-left: 20px;
}

.c-tabs {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
}

.none {
  width: 20px;
  height: 20px;
}

.first {
  width: 20px;
  height: 20px;
  background: url(../assets/fir.png) no-repeat;
  background-size: 20px;
}

.sec {
  width: 20px;
  height: 20px;

  background: url(../assets/sec.png) no-repeat;
  background-size: 20px;
}

.v-front {
  margin: 0 auto;
  padding-top: 10%;
  font-size: 14px;
}

.v-end {
  width: 80%;
  margin: 0 auto;
  font-size: 14px;
}

.thir {
  width: 20px;
  height: 20px;
  background: url(../assets/third.png) no-repeat;
  background-size: 20px;
}

.listItem {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  color: #fff;
}

.scale {
  transform: scale(0.6);
  position: absolute;
  left: 30px;
  top: 1px;
}

.items {
  width: 236px;
  margin-right: 15px;
  margin-bottom: 20px;
  position: relative;
  text-align: left;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.tip {
  background: green;
  padding: 2px 10px;
  position: absolute;
  left: 0;
  z-index: 3;
  color: #fff;
  top: 0;
}

.live {
  background: red;
}

.order {
  background: #ff0040;
}

.coverText {
  position: absolute;
  left: 25%;
  top: 80px;
}

.wrapper {
  display: flex;
  margin-left: 0px;
  transition: margin-left 2s;
  -webkit-transition: margin-left 2s; /* Safari */
}

.cast {
  position: relative;
  height: 35px;
  background: #000;
  color: #fff;
  white-space: nowrap;
  align-items: center;
  overflow: hidden;
  font-size: 16px;
}

.l-tabs {
  padding-top: 56.25%;
  /*margin-top: 56.25%;*/
  top: 0;
  bottom: 0;
  z-index: 1;
  position: absolute;
  display: block;
  width: 100%;
  overflow: hidden;
}

.end {
  background: gray;
}

.vdo {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

#video {
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  object-fit: contain;
}

.video {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
}

.video2 {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*background: url(../assets/login_bg.png) 100% 100% no-repeat;*/
  background-size: 100% 100%;
}

.video3 {
  position: absolute;
  display: block;
  width: 100%;
  /*height: 56.25%;*/
  height: 0;
  padding-top: 56.25%;
}

.video4 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 2;
  transform: translateY(-100%);
}

.vcp-player video {
  x5-playsinline: true;
  playsinline: true;
  webkit-playsinline: true;
}

.hello {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

.cur {
  color: #28afee;
  border-bottom: 1px solid #28afee;
}

.cur3 {
  color: #28afee;
  border-bottom: 1px solid #28afee;
}

.cur2 {
  border-bottom: 2px solid #28afee;
  color: #28afee;
}

.text {
  border-radius: 20px;
  border: none;
  margin: 0 auto;
  height: 100%;
  font-size: 16px;
  width: 90%;
  padding: 0 20px;
  background: #fff;
}

input:focus {
  outline: none;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.chat {
  position: relative;
}

a {
  color: white;
}

.msg2 {
  position: absolute;
  left: 0;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  color: #fff;
  width: 100%;
  background: #6c6c6c;
  align-items: center;
  height: 50px;
}

.msg input {
  border: none;
  width: 180px;
  height: 30px;
  padding-left: 10px;
  background: #333;
  color: #fff;
}

.send {
  width: 40px;
  color: #fff;
  background: gray;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.msg input:focus {
  outline: none;
}

.opacity1 {
  opacity: 0;
}

.opacity2 {
  opacity: 1;
}
</style>
