<template>
  <div class="main-box" :style="isMobile ? 'overflow: hidden;' : 'overflow: auto;'">
    <!-- 移动端 -->
    <div style="height:100%; display:flex; flex-direction: column;" v-if="isMobile">
      <!-- 引导图，点击关闭 -->
      <div
        v-if="data.guide_flag == 1"
        @click="data.guide_flag = 0"
        class="guide"
        :style="{backgroundImage:'url('+data.guide_image+')'}"
      >
        <!-- <span v-if="data.guide_flag == 1 && data.guide_image" class="timeTip">{{countdown}}s</span> -->
      </div>
      <!--微信下载显示-->
      <div class="head" v-if="data.download_flag === 1">
        <div class="logo">
          <div class="scale">
            <div style="font-size:24px;">美播云互动</div>
          </div>
        </div>
        <div class="open">
          <a href="https://api.imbcloud.cn/download/apps.do">打开看一下，参与互动</a>
        </div>
      </div>
      <!--播放界面-->
      <div class="mobile-play">
        <!-- 直播 -->
        <div
          style="top: 0;left: 0;z-index: 1;width: 100%;height: 30vh;"
          v-show="data.live_status === 1"
        >
          <div
            @click="off != off"
            v-show="data.guide_flag === 0 && zhibo === true && !speakModal && !wechatModal"
            id="hlsPlay"
            class="video"
          ></div>
        </div>

        <!-- 默认回放 -->
        <div class="video3">
          <div v-for="(item,index) in replay" :key="item.id">
            <div
              v-if="item.video_id === data.live_video_id && play3 === true"
              id="hlsPlay3"
              class="video4"
            ></div>
          </div>
          <div v-for="(item,index) in replay" :key="item.id">
            <div v-if="index === replayIndex && play4 === true" id="hlsPlay4" class="video4"></div>
          </div>
        </div>

        <!-- 封面 -->
        <div class="video2">
          <div class="coverLogo" v-if="data.logo_pos && Logo === true" :style="logoPos"></div>
        </div>

        <div
          class="v-cover"
          :style="{ backgroundImage: 'url(' + data.live_image + ')'}"
          v-show="backGround === true && data.live_status !== 1"
        >
          <div style="height: 100%; min-height: 20vh;">
            <div class="v-front">
              <div
                style="text-align: center;border-radius:14px; background:#28afee; width:80px; margin:0 auto; font-size:14px;"
                :style="{background: data.live_status === -1 ? 'red':'#28afee', marginTop: data.live_status === -1? '20px':'' }"
              >
                <span v-show="(data.live_status == 0)">即将直播</span>
                <span v-show="(data.live_status == 1)">正在直播</span>
                <span v-show="(data.live_status == -1)">直播结束</span>
              </div>
              <div style="text-align: center;margin-top:5px;font-size:20px">{{data.name}}</div>
              <div style="text-align: center;" v-show="data.live_status === -1">{{endTime}}</div>
              <div v-show="(data.countdown_flag ==1 && data.live_status == 0)">
                <div
                  style="text-align: center;margin-top:5px;border-bottom:1px solid #Fff;width:100%;margin:0 auto;"
                >距离直播开始还有</div>
                <div style="text-align: center;margin-top:5px;">
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
      <!-- 底部内容 -->
      <div class="l-tabs">
        <!-- 有横幅 -->
        <div class="cast" v-if="data.banner_bar.length > 0 ">
          <div style="flex: 1;">
            <div
              style="display: flex; padding: 0 30px; align-items: center; height: 36px;"
              v-show="data.banner_bar[curBar]"
            >
              <div>
                <a :href="'https://'+ data.banner_bar[curBar].banner_link">
                  <Icon
                    v-show="data.banner_bar[curBar].banner_type === 0 && data.banner_bar[curBar].banner_link"
                    type="ios-link"
                    style="color: white;"
                  />
                </a>
              </div>
              <div v-show="data.banner_bar[curBar].banner_type === 1">
                <!-- 横幅类型为图片 -->
                <a
                  v-if="data.banner_bar[curBar].banner_link"
                  :href="data.banner_bar[curBar].banner_link"
                >
                  <img
                    style="width: 80%; height: 100%; position: absolute; top: 0px; left: 50%; transform: translate(-50%);"
                    :src="data.banner_bar[curBar].banner_imgurl"
                  />
                </a>
                <img
                  v-if="!data.banner_bar[curBar].banner_link"
                  style="height: 100%; position: absolute; top: 0px; left: 50%; transform: translate(-50%);"
                  :src="data.banner_bar[curBar].banner_imgurl"
                />
              </div>
              <div
                v-show="data.banner_bar[curBar].banner_type == 0"
                style="position: relative; width: 100%; height: 36px; overflow: hidden;"
              >
                <!-- 横幅类型为文字 -->
                <span class="animate">
                  <span
                    v-if="move(data.banner_bar[curBar].banner_text)"
                  >{{data.banner_bar[curBar].banner_text}}</span>
                  <marquee
                    scrollamount="4"
                    v-if="!move(data.banner_bar[curBar].banner_text)"
                  >{{data.banner_bar[curBar].banner_text}}</marquee>
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="this.data.banner_bar.length > 1"
            @click="moves(1)"
            style="position: absolute; left: 0px; top: 0px; width: 30px;"
          >
            <Icon type="ios-arrow-back" size="18" color="#ccc" style="margin: 9px" />
          </div>
          <div
            v-if="this.data.banner_bar.length > 1"
            @click="moves(2)"
            style="position: absolute; right: 0px; top: 0px; width: 30px;"
          >
            <Icon type="ios-arrow-forward" size="18" color="#ccc" style="margin: 9px" />
          </div>
        </div>
        <div class="c-tabs-header">
          <!-- 菜单项 -->
          <div
            @click="changeTab(item.menu_type, item.menu_id)"
            :class="['tab-menu', item.menu_id === curTab ? 'tab-active': '']"
            v-for="(item, index) in data.custom_menu"
            :key="item.menu_id"
          >
            {{item.menu_name}}
            <!-- {{data.comment_count}} -->
            <span v-if="item.menu_type === 2" class="personNum">
              <span v-if="data.comment_count === 0"></span>
              <span
                v-if="data.comment_count < 100 && data.comment_count >0"
              >({{data.comment_count}})</span>
              <span v-if="data.comment_count > 100">(99+)</span>
              <!-- <span
                v-if="data.comment_count < 1000 && data.comment_count >0"
              >({{data.comment_count}})</span>
              <span
                v-if="data.comment_count >=1000 && data.comment_count < 10000"
              >({{data.comment_count/1000}}K)</span>
              <span v-if="data.comment_count > 10000">({{data.comment_count/10000}}W)</span>-->
            </span>
          </div>
          <div
            v-show="data.wx_mp_flag === 1 && off"
            @click="wechatModal = true"
            class="focus-btn"
          >关注</div>
        </div>

        <div class="c-tabs" style="width:100%;">
          <!-- 菜单内容 -->
          <div class="c-content">
            <!-- 简介 -->
            <div
              style="height: 100%; display: flex; flex-direction: column; flex-wrap: wrap;"
              v-show="curType === 0"
            >
              <div
                style="text-align:left;padding:5px 0px;border-bottom:1px solid #ccc;width: 100%;margin-bottom: 10px;"
              >
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
                <div style="font-size:12px; color:#ccc;">
                  时间：{{data.start_time}}
                  <span v-show="data.user_num_flag !== 0">
                    <span
                      class="user"
                      v-if="data.online_user_num+data.user_num_base < 1000"
                    >{{data.online_user_num+data.user_num_base}}人观看</span>
                    <span
                      class="user"
                      v-if="data.online_user_num+data.user_num_base >= 1000 &&data.online_user_num+data.user_num_base < 10000"
                    >{{data.online_user_num/1000+data.user_num_base/1000|numFilter}} 千人观看</span>
                    <span
                      class="user"
                      v-if="data.online_user_num+data.user_num_base > 10000"
                    >{{data.online_user_num/10000+data.user_num_base/10000|numFilter}} 万人观看</span>
                  </span>
                </div>
              </div>
              <div
                style="flex: 1; overflow: auto; text-align: initial;"
                class="container"
                v-html="data.detail"
              ></div>
            </div>
            <!-- 图文 -->
            <div v-if="curType === 1">
              <div class="container" v-html="detail" style="font-size: 20px;width: 100%"></div>
            </div>
            <!-- 聊天 -->
            <!-- <div v-show="curType === 2" style="height:100%; width: 100%;"> -->
            <div class="core-container" v-show="curType === 2">
              <div class="scroll-wrapper" ref="scroll">
                <div class="scroll-content">
                  <div class="scroll-item" v-for="(item, index) in Message" :key="item.id">
                    <div style="display:flex;align-items:center; text-align:left;">
                      <div
                        class="avator"
                        :style="{ 'backgroundImage': item.headimgurl  ? 'url(' + item.headimgurl + ')':' '}"
                      ></div>
                      <div>
                        <div
                          style="font-size: 14px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                        >{{item.visit_name| decode}}</div>
                        <div style="color: #aaa">{{item.message_time | commentTime}}</div>
                        <!-- <div
                          style="color: #aaa"
                          v-if="compareDate(item)"
                        >{{item.message_time.substring(item.message_time.length-8)}}</div>-->
                      </div>
                    </div>
                    <div style="color: #444">{{item.message}}</div>
                  </div>
                </div>
              </div>
              <div @click="speak" class="speak-box">
                <div
                  style="background:#fff;border:1px solid #ccc;border-radius:20px;width:100%;height:40px;"
                >
                  <input
                    style="position:relative"
                    disabled
                    type="text"
                    class="text"
                    placeholder="发言"
                  />
                </div>
              </div>
            </div>
            <!-- 发送框 -->

            <!-- </div> -->
            <!-- 专题 -->
            <!-- <div>
              <div class="item">
                <a href="#" style="color: #2c3e50">
                  <div class="tip">zhibo</div>
                  <div class="replayIcon"></div>
                  <div class="replayCover" style="background-size: 100% 100%;"></div>
                  <div>
                    <div>name</div>
                    <div>title</div>
                  </div>
                </a>
              </div>
              <div class="item">
                <a href="#" style="color: #2c3e50">
                  <div class="tip">zhibo</div>
                  <div class="replayIcon"></div>
                  <div class="replayCover" style="background-size: 100% 100%;"></div>
                  <div>
                    <div>name</div>
                    <div>title</div>
                  </div>
                </a>
              </div>
              <div class="item">
                <a href="#" style="color: #2c3e50">
                  <div class="tip">zhibo</div>
                  <div class="replayIcon"></div>
                  <div class="replayCover" style="background-size: 100% 100%;"></div>
                  <div>
                    <div>name</div>
                    <div>title</div>
                  </div>
                </a>
              </div>
            </div>-->
            <div
              style="display: flex; flex-wrap: wrap;
                  overflow: hidden;
                  height: 100%;
                  margin: 0 -20px;"
              v-show="curType === 3"
            >
              <div
                style="width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  overflow: auto;
                  height: 100%;
                  padding: 0 20px;"
              >
                <div class="item" v-for="item in special" :key="item.id">
                  <a
                    :href="urlhead+'/access/h5/share/channel?hls=1&share_type=wx&channel_id='+item.special_channel_id"
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
                    <div style="padding-left: 2px;">
                      <div>{{item.name}}</div>
                      <div>{{item.start_time}}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <!-- 榜单 -->
            <div v-show="curType === 4">
              <div class="listItem" v-for="(item,index) in rank" :key="item.id">
                <div style="display:flex; align-items:center;">
                  <div
                    style="margin-right:20px; font-size:18px; text-align:center; color:rgba(67,67,67,0.9);"
                    class="none"
                    :class="listd(index)"
                  >{{index > 2 ? index + 1 : ''}}</div>
                  <div
                    style="margin-right:20px"
                    class="icon"
                    :style="{ 'backgroundImage': item.headimgurl ? 'url(' + item.headimgurl + ')':' '}"
                  ></div>
                  <div
                    style="max-width: 120px; color:rgba(67,67,67,0.9); font-size: 13px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
                  >{{item.visit_name | decode}}</div>
                </div>
                <div style="color:rgba(67,67,67,0.7)">
                  邀请
                  <span style="color:deepskyblue">{{item.share_count}}</span> 人
                </div>
              </div>
            </div>
            <!-- 回放 -->
            <div v-show="curType === 5">
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
            <!-- 成员 -->
            <div style="height: 100%; margin: 0 -20px; overflow: auto;" v-if="curType === 6">
              <div
                style="display: flex;
                    flex-wrap: wrap;
                    padding: 10px 20px;"
              >
                <div style="flex: 0 0 20%; height: 80px;" v-for="item in users" :key="item.id">
                  <div
                    class="user_avator"
                    :style="{ 'backgroundImage': item.headimgurl ? 'url(' + item.headimgurl + ')': headImg}"
                  ></div>
                  <div class="user_name">{{item.visit_name | decode}}</div>
                </div>
              </div>
            </div>
            <!-- 照片直播 -->
            <div
              style="height: 100%;width: 100%;position: absolute;top: 0"
              :style="{ 'opacity': curType === 7 ? 1 : 0 ,'z-index': curType === 7 ? 2 : -1}"
              v-show="curType === 7"
            >
              <div id="photoFrame">
                <!-- <screen :screen="data.custom_menu" :index="iframe1"></screen> -->
              </div>
            </div>
            <!-- 大屏分享 -->
            <div
              style="height: 100%;width: 100%;position: absolute;top: 0;"
              :style="{ 'opacity': curType === 8 ? 1 : 0 ,'z-index': curType === 8 ? 2 : -1}"
              v-show="curType === 8"
            >
              <div id="screenFrame">
                <!-- <screen :screen="data.custom_menu" :index="iframe2"></screen> -->
                <!-- <iframe
                  :src="data.custom_menu[screenNum].menu_detail"
                  frameborder="0"
                  style="width:100%;height: 100%"
                ></iframe>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pc端 -->
    <div class="pc-box" v-if="!isMobile">
      <div class="wrap">
        <div style="margin-top: 20px;">
          <div class="top-livestatus">
            {{data.name}}
            <span class="label" v-show="(data.live_status == 1 )">直播</span>
            <span class="label" v-show="(data.live_status == 0 )">预约直播</span>
            <span class="label" v-show="(data.live_status == -1 )">直播结束</span>
          </div>
          <div style="color:#666;">
            时间：{{data.start_time}}
            <span style="margin-left:20px;">{{data.online_user_num}}人在线</span>
            <span style="margin-left:20px;">{{data.history_user_num}}次观看</span>
          </div>
        </div>
        <div @click="focusWechat" class="wechat">关注公众号</div>
      </div>

      <div class="main-view">
        <!-- 直播窗口 未写功能 -->
        <div v-show="data.live_status==1">
          <div id="hlsPlay2" class="video-view"></div>
        </div>
        <div
          v-show="data.live_status==-1 || data.live_status== 0 "
          class="video-view"
          :style="{ backgroundImage: data.live_image ? 'url(' + data.live_image + ')' : ''}"
        >
          <!-- 手机直播分享链接 -->
          <div @click="mobileModal = !mobileModal" class="qrcode-link">
            <span class="share-logo"></span> 手机直播
          </div>
          <!-- 左上角直播logo -->
          <div
            class="cover-logo"
            style="position: absolute; width: 150px; top: 10px;"
            v-show="(data.logo_pos !==0)"
          >
            <img style="width:100%" :src="data.cover_logo" />
          </div>
          <!-- 顶部覆盖显示内容 -->
          <div class="v-front" v-show="data.live_status === 0">
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
            <div style="font-size:24px; text-align: center;">直播结束</div>
            <div style="margin-top:5px;font-size:30px; text-align: center;">{{data.name}}</div>
            <div style="margin-top:5px;font-size:24px; text-align: center;">{{data.end_time}}</div>
          </div>

          <div class="patern" v-show="mobileModal">
            <div id="qrcode" style="text-align: center;">
              <vue-qr :text="liveUrl" :size="150"></vue-qr>
            </div>
            <Input v-model="liveUrl">
              <Button class="tag-read" :data-clipboard-text="liveUrl" slot="append" @click="copy">复制</Button>
            </Input>
          </div>
        </div>
        <!-- 右侧评论区 -->
        <div class="pc-right">
          <div class="c-tabs-header">
            <!-- 菜单项 -->
            <div
              @click="changeTab2(item.menu_type, item.menu_id)"
              :class="['tab-menu', item.menu_type === curType2 ? 'tab-active': '']"
              style="width: 100px;"
              v-for="(item, index) in pc_right_menu"
              :key="item.menu_id"
            >
              {{item.menu_name}}
              <!-- {{data.comment_count}} -->
              <span v-if="item.menu_type === 2" class="personNum">
                <span v-if="data.comment_count === 0"></span>
                <span
                  v-if="data.comment_count < 100 && data.comment_count >0"
                >({{data.comment_count}})</span>
                <span v-if="data.comment_count > 100">(99+)</span>
              </span>
            </div>
          </div>
          <div class="c-tabs" style="width:100%;">
            <!-- 菜单内容 -->
            <div class="c-content">
              <!-- 聊天 -->
              <!-- <div v-show="curType === 2" style="height:100%; width: 100%;"> -->
              <div class="core-container" v-show="curType2 === 2">
                <div class="scroll-wrapper" ref="scroll">
                  <div class="scroll-content">
                    <div
                      class="scroll-item"
                      :style="isMobile ? '' : 'padding: 0px 10px;'"
                      v-for="(item, index) in Message"
                      :key="item.id"
                    >
                      <div style="display:flex;align-items:center; text-align:left;">
                        <div
                          class="avator"
                          :style="{ 'backgroundImage': item.headimgurl!=''  ? 'url(' + item.headimgurl + ')': headImg}"
                        ></div>
                        <div>
                          <div
                            style="font-size: 14px; max-width: 180px; text-overflow: ellipsis; overflow: hidden;"
                          >{{item.visit_name| decode}}</div>
                        </div>
                      </div>
                      <div style="color: #444">{{item.message}}</div>
                    </div>
                  </div>
                </div>
                <div v-show="false" @click="speak" class="speak-box">
                  <div
                    style="background:#fff;border:1px solid #ccc;border-radius:20px;width:100%;height:40px;"
                  >
                    <input
                      style="position:relative"
                      disabled
                      type="text"
                      class="text"
                      placeholder="发言"
                    />
                  </div>
                </div>
                <div v-if="!isLogin" class="wx-login-tip">
                  <div @click="loginWx">登录微信</div>后才能发表评论哦
                </div>
                <div v-else="isLogin" class="wx-send-msg">
                  <img style="width: 50px; height: 50px;" :src="this.data.headImg" alt="微信头像" />
                  <Input v-model="speakContent" @on-enter="sendComments" placeholder="请输入发言内容"></Input>
                </div>
              </div>
              <!-- 榜单 -->
              <div v-show="curType2 === 4">
                <div class="listItem" v-for="(item,index) in rank" :key="item.id">
                  <div style="display:flex; align-items:center;">
                    <div
                      style="margin-right:20px; font-size:18px; text-align:center; color:rgba(67,67,67,0.9);"
                      class="none"
                      :class="listd(index)"
                    >{{index > 2 ? index + 1 : ''}}</div>
                    <div
                      style="margin-right:20px"
                      class="icon"
                      :style="{ 'backgroundImage': item.headimgurl != null ? 'url(' + item.headimgurl + ')':' '}"
                    ></div>
                    <div
                      style="max-width: 80px; color:rgba(67,67,67,0.9); font-size: 13px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
                    >{{item.visit_name | decode}}</div>
                  </div>
                  <div style="color:rgba(67,67,67,0.7)">
                    邀请
                    <span style="color:deepskyblue">{{item.share_count}}</span> 人
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <Tabs style="width: 100%; height: 100%; display: flex; flex-direction: column;">
            <TabPane label="聊天" style="display: flex; flex-direction: column;">
              <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="flex: 1;">聊天内容区域</div>
                <div style="height: 50px;">内容发送区域</div>
                <div style="display: none;">微信登录提示区域</div>
              </div>
            </TabPane>
            <TabPane label="榜单">标签二的内容</TabPane>
          </Tabs>-->
        </div>
      </div>

      <!-- 底部tab切换 -->
      <div class="pc-container" style="padding: 20px 0px;">
        <div class="c-tabs-header">
          <!-- 菜单项 -->
          <div
            @click="changeTab(item.menu_type, item.menu_id)"
            :class="['tab-menu', item.menu_id === curTab ? 'tab-active': '']"
            style="width: 100px;"
            v-for="(item, index) in data.custom_menu"
            :key="item.menu_id"
          >
            {{item.menu_name}}
            <!-- {{data.comment_count}} -->
            <span v-if="item.menu_type === 2" class="personNum">
              <span v-if="data.comment_count === 0"></span>
              <span
                v-if="data.comment_count < 100 && data.comment_count >0"
              >({{data.comment_count}})</span>
              <span v-if="data.comment_count > 100">(99+)</span>
              <!-- <span
                v-if="data.comment_count < 1000 && data.comment_count >0"
              >({{data.comment_count}})</span>
              <span
                v-if="data.comment_count >=1000 && data.comment_count < 10000"
              >({{data.comment_count/1000}}K)</span>
              <span v-if="data.comment_count > 10000">({{data.comment_count/10000}}W)</span>-->
            </span>
          </div>
          <div
            v-show="data.wx_mp_flag === 1 && off"
            @click="wechatModal = true"
            class="focus-btn"
          >关注</div>
        </div>
        <div class="c-tabs" style="width:100%;">
          <!-- 菜单内容 -->
          <div class="c-content">
            <!-- 简介 -->
            <div
              style="height: 100%; display: flex; flex-direction: column; flex-wrap: wrap;"
              v-show="curType === 0"
            >
              <div
                style="flex: 1; overflow: auto; text-align: initial;"
                class="container"
                v-html="data.detail"
              ></div>
            </div>
            <!-- 图文 -->
            <div v-if="curType === 1">
              <div class="container" v-html="detail" style="font-size: 20px;width: 100%"></div>
            </div>
            <!-- 专题 -->
            <div class="topic" :style="isMobile ? '' : 'padding: 0px;'" v-show="curType === 3">
              <div :style="isMobile ? '' : 'padding: 0px;'">
                <div
                  class="item"
                  :style="isMobile ? '' : 'margin: 10px 10px 0px 0px; width: 200px;'"
                  v-for="item in special"
                  :key="item.id"
                >
                  <a
                    :href="urlhead+'/access/h5/share/channel?hls=1&share_type=wx&channel_id='+item.special_channel_id"
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
                    <div style="padding-left: 2px;">
                      <div>{{item.name}}</div>
                      <div>{{item.start_time}}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <!-- 榜单 -->
            <div v-show="curType === 4">
              <div class="listItem" v-for="(item,index) in rank" :key="item.id">
                <div style="display:flex; align-items:center;">
                  <div
                    style="margin-right:20px; font-size:18px; text-align:center; color:rgba(67,67,67,0.9);"
                    class="none"
                    :class="listd(index)"
                  >{{index > 2 ? index + 1 : ''}}</div>
                  <div
                    style="margin-right:20px"
                    class="icon"
                    :style="{ 'backgroundImage': item.headimgurl != null ? 'url(' + item.headimgurl + ')':' '}"
                  ></div>
                  <div
                    style="margin-right:100px ;color:rgba(67,67,67,0.9);font-size: 13px"
                  >{{item.visit_name | decode}}</div>
                </div>
                <div style="color:rgba(67,67,67,0.7)">
                  邀请
                  <span style="color:deepskyblue">{{item.share_count}}</span> 人
                </div>
              </div>
            </div>
            <!-- 回放 -->
            <div v-show="curType === 5">
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
            <!-- 成员 -->
            <div style="height: 100%; margin: 0 -20px;" v-show="curType === 6">
              <div
                style="display: flex;
                    flex-wrap: wrap;
                    padding: 10px 20px;
                    height: 100%;
                    overflow: auto;"
              >
                <div style="flex: 0 0 20%; height: 80px;" v-for="item in users" :key="item.id">
                  <div
                    class="user_avator"
                    :style="{ 'backgroundImage': item.headimgurl != null ? 'url(' + item.headimgurl + ')': headImg}"
                  ></div>
                  <div class="user_name">{{item.visit_name | decode}}</div>
                </div>
              </div>
            </div>
            <!-- 照片直播 -->
            <div
              style="height: 100%;width: 100%;position: absolute;top: 0"
              :style="{ 'opacity': curType === 7 ? 1 : 0 ,'z-index': curType === 7 ? 2 : -1}"
              v-show="curType === 7"
            >
              <div id="photoFrame">
                <!-- <screen :screen="data.custom_menu" :index="iframe1"></screen> -->
              </div>
            </div>
            <!-- 大屏分享 -->
            <div
              style="height: 100%;width: 100%;position: absolute;top: 0;"
              :style="{ 'opacity': curType === 8 ? 1 : 0 ,'z-index': curType === 8 ? 2 : -1}"
              v-show="curType === 8"
            >
              <div id="screenFrame">
                <!-- <screen :screen="data.custom_menu" :index="iframe2"></screen> -->
                <!-- <iframe
                  :src="data.custom_menu[screenNum].menu_detail"
                  frameborder="0"
                  style="width:100%;height: 100%"
                ></iframe>-->
              </div>
            </div>
          </div>
        </div>
        <!-- <Tabs value="name1">
          <TabPane label="简介" name="name1" v-show="curType === 0">
              <div style="flex: 1; overflow: auto;" class="container" v-html="data.detail"></div>
          </TabPane>
          <TabPane label="标签二" name="name2">标签二的内容</TabPane>
          <TabPane label="标签三" name="name3">标签三的内容</TabPane>
        </Tabs>-->
      </div>
    </div>

    <!-- 关注公众号 -->
    <div v-show="wechatModal || data.wx_mp_pop == 1" class="show-qrcode">
      <div class="box-warpper" :style="isMobile ? 'width: 70vw;': 'width: 300px;'">
        <div @click="closeQr">
          <img class="close-btn" src="../assets/close.png" alt="关闭" />
        </div>
        <div class="wechat-head">{{ data.wx_mp_name }}</div>
        <div class="wechat-img">
          <img style="width: 160px; height: 160px;" :src="data.wx_mp_image" alt="公众号二维码" />
        </div>
        <div v-if="isMobile" style="font-size:24; text-align: center;">长按识别二维码</div>
        <div v-else style="font-size:24; text-align: center;">扫一扫</div>
      </div>
    </div>
    <!-- <Modal v-model="wechatModal" title="关注公众号">
      <div class="wechat-head">{{ data.wx_mp_name }}</div>
      <div class="wechat-img" :style="{ backgroundImage: 'url(' + data.wx_mp_image + ')'}"></div>
      <div style="font-size:24; text-align: center;">扫一扫关注公众号</div>
      <div slot="footer">
        <Button @click="wechatModal = !wechatModal">关闭</Button>
      </div>
    </Modal>-->

    <!-- 发言窗口 -->
    <Modal class="speak-modal" v-model="speakModal" title="发言" @on-ok="sendComments">
      <Input v-model="speakContent" type="textarea" placeholder="请输入发言内容"></Input>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import VueQr from 'vue-qr'
import Clipboard from 'clipboard'
import { Base64 } from 'js-base64'
// import BScroll from 'better-scroll'
import IScroll from 'iscroll/build/iscroll-probe'
import BScroll from '@better-scroll/core'

export default {
  // =============================================================
  data() {
    return {
      isLogin: false, // pc 端判断是否微信已扫码登录
      headImg: require('../assets/headimg.png'),
      curType2: 2, // 默认是聊天选中
      pc_right_menu: [], // pc 端左侧聊天和榜单窗口
      keepAliveStatus: false,
      keepAliveDate: '', // 默认时间
      // urlhead: 'https://ceshi.imbcloud.cn',
      urlhead: 'https://api.imbcloud.cn',
      isMobile: true,
      flag: true,
      data: {
        online_user_num: 0,
        user_num_base: 0,
        live_image: '',
        banner_bar: [
          {
            banner_imgurl: '',
            banner_link: '',
            banner_text: '',
            banner_type: ''
          }
        ]
      },
      live_status: 0, // 保存当前直播状态，用来比较状态，更新时刷新
      historyPage: 1,
      Message: [],
      wechatModal: false,
      mobileModal: false,
      speakModal: false,
      liveUrl: window.location.href,
      day: 0,
      hour: 0,
      minute: 0,
      Logo: true,
      zhibo: false,
      endTime: null,
      backGround: true,
      play3: false,
      play4: false,
      replay: [{ item: 1 }],
      special: [{ item: 1 }],
      replayIndex: -1,
      logoPos: {},
      off: true,
      curTab: 1,
      curType: -1,
      detail: '',
      speakContent: '',
      // hisScroll: null,
      rank: [],
      curBar: 0,
      users: [],
      photoNum: -1,
      screenNum: -1
      // countdown: 3
    }
  },
  components: { VueQr },
  filters: {
    decode(value) {
      let realValue = Base64.decode(value)
      return realValue
    },
    commentTime(val) {
      // 聊天时间显示时分
      return val.substr(11, 5)
    }
  },
  created() {
    // 判断是否登录微信后跳转过来， 带 code 和 state 参数
    let code = this.getQueryVariable('code')
    if (code) {
      // 获取 code 后获取令牌   001l9afj2Qcq3E02kadj2Qqefj2l9afz
      let codeUrl =
        'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx4a36e3e1cab43cf6&secret=e67822d5a893d423ac08fb9317cb3255&code=' +
        code +
        '&grant_type=authorization_code'
      this.$api(codeUrl).then(res => {
        // 数据格式
        /**
         * {"access_token":"25_viV-tO_vr8DrZ9r1pyo2FdrccBbjThDUN5B27ony2TiwERTe73BbWeB2_cg97-C9IZmXV8AokXjZ8v68rkJDOON98vwToa80zLwDe2nLDq8",
         * "expires_in":7200,
         * "refresh_token":"25_Sf3jUXFmk1rUVfi3angXH8_98aIH8yEMdoWer_336_ahmNFde85An8j68f63xpLh3LYBW9fSrxQkKfQP45iQdw1ppyAr_IN1GwNL4oLa0sM",
         * "openid":"oxZbg0n-6S84qGdbpgRCIOWvhw5c",
         * "scope":"snsapi_login",
         * "unionid":"ojygT1gbbbwTrqMgIWJmkLzmxU14"}
         */
        if (res) {
          // 获取用户信息
          let userUrl =
            'https://api.weixin.qq.com/sns/userinfo?access_token=' +
            res.access_token +
            '&openid=' +
            res.openid
          this.$api(userUrl).then(res => {
            /**
             * {"openid":"oxZbg0n-6S84qGdbpgRCIOWvhw5c",
             * "nickname":"l",
             * "sex":1,
             * "language":"zh_CN",
             * "city":"",
             * "province":"",
             * "country":"GG",
             * "headimgurl":"http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLtdodE5kaIB5OCiaWvLurNUVUicTH2jsrFO9dnP8gnxxB9iaOzHqMRLJ3HApsRtRNwsiaAUKicQ2QgLAA\/132",
             * "privilege":[],
             * "unionid":"ojygT1gbbbwTrqMgIWJmkLzmxU14"}
             */
            if (res) {
              this.data.visit_name = res.nickname
              this.data.visit_id = res.unionid
              this.speakContent = ''
              this.data.headimgurl = res.headimgurl
              this.data.channel_id = 1
            }
          })
        }
      })
    }
    // 判断是否手机端,并切换相应界面
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }

    this.$api('/h5/getData.do?share_type=wx&flag=true').then(res => {
      if (res) {
        if (res.wx_mp_pop == 1) {
          this.wechatModal = true
        }
        this.data = res
        // 判断当前在线人数是否超出了最大限制在线人数
        if (this.data.online_user_num > this.data.ulimit) {
          alert('当前频道在线已超出人员上限！')
          this.data = {}
          return false
        }
        // 判断是否pc 端， pc 不在tab 显示聊天和榜单
        if (!this.isMobile) {
          let tempArr = []
          this.data.custom_menu.forEach(item => {
            if (item.menu_type === 2 || item.menu_type === 4) {
              // 聊天和榜单不加入
              this.pc_right_menu.push(item)
            } else {
              tempArr.push(item)
            }
          })
          this.data.custom_menu = tempArr
        }
        // 保持用户登录状态
        this.keepAlive()
        setTimeout(() => {
          this.wxshare()
        }, 1000)
        // 引导图倒计时
        if (res.guide_flag === 1 && !sessionStorage.getItem('guide_flag')) {
          // this.countdownCompt()
          sessionStorage.setItem('guide_flag', 0)
        } else {
          this.data.guide_flag = 0
        }
        document.title = this.data.name
        // 直播logo
        this.logoPos.backgroundImage = 'url(' + this.data.cover_logo + ')'
        switch (this.data.logo_pos) {
          case 1:
            this.logoPos.left = '10px'
            this.logoPos.top = '10px'
            break
          case 2:
            this.logoPos.right = '10px'
            this.logoPos.top = '10px'
            break
          case 3:
            this.logoPos.left = '10px'
            this.logoPos.bottom = '10px'
            break
          case 4:
            this.logoPos.right = '10px'
            this.logoPos.bottom = '10px'
            break
          default:
            this.logoPos.left = '10px'
            this.logoPos.top = '10px'
        }
        // 默认类型

        this.curType = this.data.custom_menu[0].menu_type
        this.curTab = this.data.custom_menu[0].menu_id
        // 查询获取照片直播和大屏互动是否存在
        this.data.custom_menu.forEach(el => {
          if (el.menu_type === 7) {
            let iframe = document.createElement('iframe')
            iframe.src = el.menu_detail
            iframe.style.width = '95%'
            iframe.style.height = '80%'
            iframe.style.border = '0 none'
            document.getElementById('photoFrame').appendChild(iframe)
          } else if (el.menu_type === 8) {
            let iframe = document.createElement('iframe')
            iframe.src = el.menu_detail
            iframe.style.width = '95%'
            iframe.style.height = '80%'
            iframe.style.border = '0 none'
            document.getElementById('screenFrame').appendChild(iframe)
          }
        })
        // 横幅滚动
        if (this.data.banner_bar.length > 1) {
          setInterval(() => {
            this.moves(2)
          }, 10000)
        }

        this.live_status = res.live_status
        // 直播结束
        if (this.live_status === -1) {
          let y = this.data.end_time.substr(0, 4)
          let m = this.data.end_time.substr(5, 2)
          let d = this.data.end_time.substr(8, 2)
          let h = this.data.end_time.substr(11, 2)
          let M = this.data.end_time.substr(14, 2)
          this.endTime =
            '于' + m + '月' + d + '日' + ' ' + h + '时' + M + '分结束'
          if (this.data.live_video_id !== '') {
            this.getReplay()
          }
        }
        // 预约
        if (this.live_status === 0) {
          this.timer(this.data.start_time)
          setInterval(() => {
            this.timer(this.data.start_time), 60000
          })
        }
        // 直播中
        if (this.live_status === 1) {
          this.zhibo = true
          if (this.isMobile) {
            // 移动端处理
            if (navigator.userAgent.match(/(Android)/i)) {
              // 安卓处理
              setTimeout(() => {
                let player = new TcPlayer('hlsPlay', {
                  m3u8: this.data.streams.hls_play_url,
                  // "coverpic": {"style": "cover", "src": self.data.live_image},
                  width: '100%',
                  height: '100%',
                  live: true,
                  autoplay: true,
                  controls: 'system',
                  listener: msg => {
                    let type = msg.type
                    if (type == 'error') {
                      //播放错误了，重连
                      setTimeout(function() {
                        // player.load();//进行重连
                        // window.location.reload();
                      }, 5000)
                    } else if (type == 'ended') {
                      //结束了，重新刷新页面，跳转到结束直播页面
                      window.location.reload() //更新页面
                    } else if (type == 'pause') {
                      //暂停，没做处理
                    } else if (type == 'play') {
                      this.Logo = false
                    }
                  }
                })

                $('#hlsPlay > div > video').attr('x-webkit-airplay', 'true')
                $('#hlsPlay > div > video').attr('x5-playsinline', 'true')
                $('#hlsPlay > div > video').attr('webkit-playsinline', 'true')
                $('#hlsPlay > div > video').attr('playsinline', 'true')
                $('#hlsPlay > div > video').attr('poster', this.data.live_image)
                $('#hlsPlay > div > video').attr('live', 'true')
                $('#hlsPlay > div > video').attr('autoplay', 'true')
              }, 100)
            } else {
              // ios及其他处理
              setTimeout(() => {
                let player = new TcPlayer('hlsPlay', {
                  m3u8: this.data.streams.hls_play_url,
                  // "coverpic": {"style": "cover", "src": self.data.live_image},
                  width: '100%',
                  height: '100%',
                  live: true,
                  autoplay: true,
                  controls: 'system',
                  listener: msg => {
                    let type = msg.type
                    if (type == 'error') {
                      //播放错误了，重连
                      setTimeout(() => {
                        // player.load();//进行重连
                        // window.location.reload();
                      }, 5000)
                    } else if (type == 'ended') {
                      //结束了，重新刷新页面，跳转到结束直播页面
                      window.location.reload() //更新页面
                    } else if (type == 'pause') {
                      //暂停，没做处理
                    } else if (type == 'play') {
                      this.Logo = false
                    }
                  }
                })

                $('#hlsPlay > div > video').attr('x-webkit-airplay', 'true')
                $('#hlsPlay > div > video').attr('x5-playsinline', 'true')
                $('#hlsPlay > div > video').attr('webkit-playsinline', 'true')
                $('#hlsPlay > div > video').attr('playsinline', 'true')
                $('#hlsPlay > div > video').attr('poster', this.data.live_image)
                $('#hlsPlay > div > video').attr('live', 'true')
                $('#hlsPlay > div > video').attr('autoplay', 'true')
              }, 100)
            }
          } else {
            // pc端处理
            setTimeout(() => {
              var player2 = new TcPlayer('hlsPlay2', {
                m3u8: this.data.streams.hls_play_url,
                flv: this.data.streams.http_play_url, //增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
                // "coverpic": {"style": "cover", "src": self.data.live_image},
                live: true,
                width: '100%',
                height: '100%',
                autoplay: true,
                volume: 0.5,
                controls: 'system',
                listener: msg => {
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

        this.getData() // 这里开始定时请求数据。
        this.getReplayLst()
        this.getHistory()
        this.getSpecialChannel()
        this.getComments() // 不断回调

        setInterval(() => {
          this.getRank()
          this.getUsers()
        }, 1000)
      } else {
        console.log('获取数据失败', res)
      }
    })
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false
    },
    loginWx() {
      // 获取当前登录的url, 登录微信
      let url =
        'https://open.weixin.qq.com/connect/qrconnect?appid=wx4a36e3e1cab43cf6&redirect_uri=' +
        location.href.split('#')[0] +
        '&response_type=code&scope=snsapi_login&state=2014#wechat_redirect'
      // 测试地址
      // let url =
      //   'https://open.weixin.qq.com/connect/qrconnect?appid=wx4a36e3e1cab43cf6&redirect_uri=https://api.imbcloud.cn/access/h5/share/channel?hls=1&share_type=wx&channel_id=149037&response_type=code&scope=snsapi_login&state=2014#wechat_redirect'
      window.location.href = url
    },
    keepAlive() {
      let params = {
        visitName: Base64.decode(this.data.visit_name),
        visitId: this.data.visit_id,
        lastDate: this.keepAliveDate,
        channel_id: this.data.channel_id,
        date: new Date().toTimeString()
      }
      let headers = {}
      if (!this.keepAliveStatus) {
        headers = {
          // 'Poll-Connection': 'close'
          'Poll-Connection': 'keep-alive'
        }
      } else {
        headers = {
          'Poll-Connection': 'keep-alive'
        }
      }
      this.$api({
        url: '/keepAliveChannel.do',
        headers: headers,
        methods: 'post',
        params: params
      }).then(res => {
        if (res.result) {
          this.keepAliveDate = res.lastDate
          // 第一次请求成功后修改headers
          this.keepAliveStatus = true
          // 请求成功后不断请求
          this.keepAlive()
        }
      })
    },
    // 关闭二维码
    closeQr() {
      this.wechatModal = !this.wechatModal
      this.data.wx_mp_pop = 0
    },
    // 用户
    getUsers() {
      let params = {
        page: 1,
        filter: 1,
        sort: 'asc',
        channel_id: this.data.channel_id
      }
      this.$api({ url: '/getUsers.do', method: 'get', params: params }).then(
        res => {
          if (res.result === 'success') {
            this.users = res.users
          }
        }
      )
    },
    // 生成微信分享链接，添加上user_Id
    wxshare() {
      let params = {
        // 'url': 'https://ceshi.imbcloud.cn/h5/share/channel?hls=1&share_type=wx&channel_id=' + this.data.channel_id,
        // url: location.href.split('#')[0]
        url: location.href.split('#')[0]
      }
      this.$api({
        url: '/wechatParam.do',
        methods: 'post',
        params: params
      }).then(res => {
        // 微信分享
        if (res) {
          wx.config({
            debug: false, // 是否开启debug
            appId: res.appid,
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: [
              // 'onMenuShareTimeline', // 分享朋友圈，即将废弃
              // 'onMenuShareAppMessage' // 分享给朋友， 即将废弃
              'updateAppMessageShareData', // 分享给朋友，新api
              'updateTimelineShareData' // 分享朋友圈，新api
            ]
          })
          wx.ready(() => {
            // console.log('微信分享')
            /**
             * 分享到朋友圈 ========
             *  */
            wx.updateTimelineShareData({
              title: this.data.wx_share_title, // 分享标题
              link:
                this.urlhead +
                '/access/h5/share/channel?hls=1&share_type=wx&channel_id=' +
                this.data.channel_id +
                '&user_id=' +
                this.data.visit_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.data.wx_share_image ? this.data.wx_share_image : '', // 分享图标
              success: function() {
                // 设置成功
                console.log('分享朋友圈链接生成成功')
              }
            })
            // 原处理方式-----
            // wx.onMenuShareTimeline({
            //   title: this.data.wx_share_title,
            //   desc: this.data.wx_share_msg,
            //   link:
            //     this.urlhead +
            //     '/access/h5/share/channel?hls=1&share_type=wx&channel_id=' +
            //     this.data.channel_id +
            //     '&user_id=' +
            //     this.data.visit_id,
            //   imgUrl: this.data.wx_share_image,
            //   type: '',
            //   dataUrl: '',
            //   success: function() {
            //     // alert('分享成功！！')
            //   }
            // }),
            /**
             * 分享给朋友 ==============
             *  */

            wx.updateAppMessageShareData({
              title: this.data.wx_share_title, // 分享标题
              desc: this.data.wx_share_msg,
              link:
                this.urlhead +
                '/access/h5/share/channel?hls=1&share_type=wx&channel_id=' +
                this.data.channel_id +
                '&user_id=' +
                this.data.visit_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: this.data.wx_share_image ? this.data.wx_share_image : '', // 分享图标
              success: function() {
                // 设置成功
                console.log('分享好友链接生成成功')
              }
            })
            // wx.onMenuShareAppMessage({
            //   title: this.data.wx_share_title,
            //   desc: this.data.wx_share_msg,
            //   link:
            //     this.urlhead +
            //     '/access/h5/share/channel?hls=1&share_type=wx&channel_id=' +
            //     this.data.channel_id +
            //     '&user_id=' +
            //     this.data.visit_id,
            //   imgUrl: this.data.wx_share_image,
            //   type: '',
            //   dataUrl: '',
            //   success: function() {
            //     // alert('分享成功！！')
            //   }
            // })
          })
        }
      })
    },
    // 横幅文字过长时横向滚动
    move(text) {
      if (text) {
        if (text.length >= 19) {
          return false
        } else {
          return true
        }
      }
    },
    // 横幅跳转
    moves(params) {
      // 1 向左， 2 向右
      if (params === 2) {
        // 判断是否大于长度，大于的话跳到头上
        if (this.curBar >= this.data.banner_bar.length - 1) {
          this.curBar = 0
        } else {
          this.curBar++
        }
      } else {
        if (this.curBar <= 0) {
          this.curBar = this.data.banner_bar.length - 1
        } else {
          this.curBar--
        }
      }
    },
    // 回放选择
    replayChange(index) {
      this.zhibo = false
      this.backGround = false
      this.Logo = false
      this.play3 = false
      this.play4 = true
      $('.video3')
        .eq(0)
        .css('background', 'rgba(0,0,0,0.75)')
      if (this.replayIndex == index) {
      } else {
        // this.data.live_video_id = this.replay[index].video_id
        this.replayIndex = index
        setTimeout(() => {
          let player4 = new TcPlayer('hlsPlay4', {
            m3u8: this.replay[index].video_url,
            // "coverpic": {"style": "cover", "src": this.replay[index].cover_url},
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
            listener: msg => {
              let type = msg.type
              if (type == 'error') {
                //播放错误了，重连
                setTimeout(function() {
                  // player4.load();//进行重连
                }, 5000)
              } else if (type == 'ended') {
                //结束了，重新刷新页面，跳转到结束直播页面
                window.location.reload() //更新页面
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
            this.replay[index].cover_url
          )
        }, 100)
      }
    },
    // 处理榜单前三位添加样式
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
    // 获取榜单
    getRank() {
      let params = {
        channel_id: this.data.channel_id
      }
      this.$api({
        url: '/getSharelist.do',
        method: 'get',
        params: params
      }).then(res => {
        if (res.result) {
          this.rank = res.users
        }
      })
    },
    // 专题直播状态显示修改
    status(status) {
      switch (status) {
        case -1:
          return 'end'
          break
        case 0:
          return 'order'
          break
        case 1:
          return 'live'
          break
      }
    },
    // 获取专题内容
    getSpecialChannel() {
      let params = {
        channel_id: this.data.channel_id,
        page: 1
      }
      this.$api({
        url: '/getSpecialChannel.do',
        method: 'post',
        params: params
      }).then(res => {
        if (res) {
          this.special = res.specials
        }
      })
    },
    // 滚动条
    scroll() {
      // console.log('滚动触发')
      this.hisScroll = new BScroll(this.$refs.scroll, {
        click: true,
        scrollY: true,
        probeType: 3,
        pullDownRefresh: {
          threshold: 30, // 下拉距离超过60px触发pullingDown事件
          stop: 10 // 回弹停留在距离顶部10px的位置
        }
      })
      // 下拉刷新加载历史数据
      this.hisScroll.on('pullingDown', () => {
        alert('xialashijian')
        this.getHistory()
      })
    },
    // 提交发言
    sendComments() {
      if (!this.speakContent) {
        this.$Message.error('聊天信息不能为空！')
        return
      }
      let params = {
        visit_name: this.data.visit_name,
        visit_id: this.data.visit_id,
        message: this.speakContent,
        headimgurl: this.data.headimgurl,
        channel_id: this.data.channel_id,
        date: new Date().toTimeString()
      }

      // 测试数据，需要重新获取
      // let params = {
      //   visit_name: Base64.encode('l'),
      //   visit_id: 'ojygT1gbbbwTrqMgIWJmkLzmxU14',
      //   message: 'ceshishuju',
      //   headimgurl:
      //     'http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLtdodE5kaIB5OCiaWvLurNUVUicTH2jsrFO9dnP8gnxxB9iaOzHqMRLJ3HApsRtRNwsiaAUKicQ2QgLAA\/132',
      //   channel_id: 1,
      //   date: new Date().toTimeString()
      // }

      this.$api({
        url: '/sendComment.do',
        method: 'post',
        params: params
      }).then(res => {
        if (res.result && this.data.visit_id === res.msg.visit_id) {
          // 当前登录用户直接显示，非当前登录用户 getcomment 显示
          this.Message.push(res.msg) // 重复显示
        }
        // 清空数据
        this.speakContent = ''
        this.$nextTick(() => {
          let dom = document.querySelector('.scroll-wrapper')
          if (dom) {
            dom.scrollTop = dom.scrollHeight
          }
        })
        if (navigator.userAgent.match(/(|iPhone|iPod|ios|iPad|)/i)) {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
          // console.log('ios置顶')
        }
      })
    },
    // 点击发言显示窗口
    speak() {
      this.speakModal = true
    },
    // pc 右侧
    changeTab2(type, id) {
      switch (type) {
        case 2:
          // 聊天
          break
        case 4:
          // 榜单
          this.getRank()
          break
        default:
          break
      }
      this.curType2 = type
    },
    // 切换菜单内容
    changeTab(type, id) {
      // 不同类型请求不同数据，当前只有图文可能重复，需要每次内容判断
      switch (type) {
        case 1:
          this.data.custom_menu.forEach(item => {
            if (item.menu_id === id) {
              this.detail = Base64.decode(item.menu_detail)
            }
          })
          // this.detail = this.data.custom_menu[id].menu_detail
          break
        case 2:
          // this.$nextTick(() => {
          //   this.scroll()

          //   // this.pullingDownUp()
          // })
          break
        case 6:
          this.getUsers()
          break
        case 4:
          this.getRank()
          break
        default:
          break
      }
      this.curType = type
      this.curTab = id
    },
    // 倒计时计算
    timer(timeStr) {
      // 将日期格式 2017-04-28 23:59:59 换成 2017/04/28 23:59:59 ios 显示问题
      let time = timeStr.replace(/\-/g, '/')
      let nowTime = new Date(time) - new Date()
      let minutes = parseInt((nowTime / 1000 / 60) % 60, 10) //计算剩余的分钟
      let days = parseInt(nowTime / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
      let hours = parseInt((nowTime / 1000 / 60 / 60) % 24, 10) //计算剩余的小时
      this.day = days
      this.hour = hours
      this.minute = minutes
    },
    // 引导图倒计时计算
    countdownCompt() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown--
          this.countdownCompt()
        }, 1000)
      } else {
        this.data.guide_flag = 0
      }
    },
    // 复制
    copy() {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$Message.success('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$Message.error('复制失败')
        clipboard.destroy()
      })
    },
    // 关注公众号
    focusWechat() {
      this.wechatModal = true
    },
    // 定时请求
    getData() {
      this.$api('/h5/getData.do?share_type=wx&flag=false').then(res => {
        if (res) {
          if (res.live_status !== this.live_status) {
            window.location.reload()
          }
          this.data.comment_count = res.comment_count
          this.data.user_num_base = res.user_num_base
          this.data.online_user_num = res.online_user_num
        }
      })
      setTimeout(() => {
        this.getData()
        this.getComments()
      }, 15000)
    },
    // 获取回放列表
    getReplayLst() {
      let params = {
        channel_id: this.data.channel_id,
        page: 1
      }
      this.$api({
        url: '/h5/getPlaybackLst.do',
        method: 'post',
        params: params
      }).then(res => {
        if (res) {
          this.replayList = res
        }
      })
    },
    // 获取历史评论
    getHistory() {
      let params = {
        visit_id: this.data.visit_id,
        channel_id: this.data.channel_id,
        page: this.historyPage
      }
      this.$api({
        url: '/getHistoryComments.do',
        method: 'post',
        params: params
      }).then(res => {
        // console.log('历史评论', res)
        if (res.result) {
          if (this.historyPage == 1) {
            for (var i = 0; i < res.comments.length - 1; i++) {
              this.Message.unshift(res.comments.splice(0, 1)[0])
              // this.Message.push(res.comments.splice(0, 1)[0])
              i--
            }
          } else {
            for (var i = 0; i < res.comments.length; i++) {
              this.Message.unshift(res.comments.splice(0, 1)[0])
              // this.Message.push(res.comments.splice(0, 1)[0])
              i--
            }
          }
          this.historyPage++
          this.$nextTick(() => {
            let dom = document.querySelector('.scroll-wrapper')
            if (dom) {
              dom.scrollTop = dom.scrollHeight
            }
          })
        }
      })
      if (this.historyPage !== 1) {
        // this.$nextTick(() => {
        //   this.pullingDownUp()
        // })
      }
      this.historyPage += 1
    },
    // 获取评论
    getComments() {
      let params = {
        lastDate: this.lastDate,
        visit_id: this.data.visit_id,
        channel_id: this.data.channel_id,
        visit_name: this.visitName
      }
      this.$api({
        url: '/getComments.do',
        method: 'post',
        params: params
      }).then(res => {
        if (res.result) {
          // 判断获取的评论是否当前用户发送，如果是的话就不用加入了，因为发送的时候已添加
          res.comments.forEach(item => {
            if (item.visit_id !== this.data.visit_id) {
              this.Message.push(item)
              this.$nextTick(() => {
                let dom = document.querySelector('.scroll-wrapper')
                dom.scrollTop = dom.scrollHeight
              })
            }
          })
        }
      })
    },
    // 聊天滚动
    pullingDownUp() {
      // this.hisScroll.finishPullDown()
      // this.hisScroll.finishPullUp()
      // this.hisScroll.refresh() //重新计算元素高度
    },
    // 获取默认回放
    getReplay() {
      this.backGround = false
      this.Logo = false
      this.play4 = false
      this.play3 = true
      $('.video3')
        .eq(0)
        .attr('background', 'rgbba(0,0,0,0.75)')
      let params = {
        channel_id: this.data.channel_id,
        video_id: this.data.live_video_id
      }
      this.$api({
        url: '/h5/getPlayback.do',
        method: 'post',
        params: params
      }).then(res => {
        if (res) {
          let player3 = new TcPlayer('hlsPlay3', {
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
            listener: msg => {
              let type = msg.type
              if (type == 'error') {
                //播放错误了，重连
                setTimeout(() => {
                  player3.load() //进行重连
                }, 5000)
              } else if (type == 'ended') {
                //结束了，重新刷新页面，跳转到结束直播页面
                window.location.reload() //更新页面
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
    }
  },
  mounted() {
    // 基础数据请求
  },
  beforeDestroy() {
    // this.bs.destroy()
  }
}
</script>

<style>
.speak-modal .ivu-modal {
  position: relative;
  z-index: 999;
}
.main-box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /* overflow: hidden; */
}
.pc-box {
  width: 1280px;
  margin: 0 auto;
}
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-livestatus {
  text-align: left;
  font-size: 30px;
  margin-right: 20px;
  font-weight: bold;
}
.label {
  font-size: 14px;
  /* 后续背景颜色应该要改变 */
  background: #ff0040;
  border-radius: 4px;
  padding: 2px 4px;
  color: #fff;
  margin-left: 20px;
}
.wechat {
  padding: 4px 10px;
  cursor: pointer;
  background: rgb(54, 142, 243);
  color: #fff;
}

.wechat-head {
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin-top: 40px;
  text-align: center;
}
.wechat-img {
  margin: 15px auto;
  text-align: center;
}

.main-view {
  display: flex;
  width: 100%;
  height: 568px;
  margin-top: 10px;
}
.video-view {
  width: 1008px;
  height: 568px;
  background: rgba(0, 0, 0, 0.3);
  background-size: 100% 100%;
  color: #fff;
  position: relative;
}
.patern {
  position: absolute;
  left: 10px;
  bottom: 60px;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
}
.qrcode-link {
  width: 100%;
  display: flex;
  cursor: pointer;
  height: 50px;
  background: #555;
  text-align: left;
  line-height: 30px;
  padding-left: 10px;
  color: #fff;
  align-items: center;
  font-size: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.share-logo {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../assets/share.png) no-repeat;
  background-size: cover;
  cursor: pointer;
}
.cover-logo {
  width: 100px;
  height: 25px;
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 999;
  font-size: 20px;
  color: white;
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
.head {
  width: 100%;
  height: 33px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: #000;
  color: #fff;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 10px;
  align-items: center;
}
.logo {
  /* background: url(../assets/logo1.png) no-repeat; */
  background-size: 28px;
  height: 29px;
}
.open {
  font-size: 12px;
  background: rgb(255, 0, 64);
  padding: 2px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
}
.scale {
  -webkit-transform: scale(0.6);
  transform: scale(0.6);
  position: absolute;
  left: 0;
}

.mobile-play {
  display: block;
  position: relative;
  width: 100%;
  height: 30vh;
}

.video {
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 20vh;
  top: 0;
  z-index: 2;
}
.v-cover {
  width: 100%;
  height: 30vh;
  background: rgba(0, 0, 0, 0.3);
  background-size: 100% 100%;
  color: #fff;
  padding-bottom: 10vh;
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
.guanzhu {
  width: 60px;
  height: 20px;
  padding-left: 20px;
  background: url(../assets/gz.jpg) no-repeat;
  background-size: 20px;
  position: absolute;
  right: 0;
  top: 10px;
  z-index: 939;
  color: #42b983;
  overflow: scroll;
}
.showAmount {
  position: absolute;
  right: 0px;
  bottom: 3%;
  z-index: 999;
  display: flex;
}
.user {
  /* height: 20px; */
  padding-left: 19px;
  /* margin-right: 9px; */
  color: #666;
  /* line-height: 26px; */
  /* background: url(../assets/peo.png) no-repeat; */
  /* background-size: 20px; */
}
.discuss {
  height: 20px;
  padding-left: 24px;
  margin-right: 15px;
  color: #fff;
  line-height: 26px;
  /* background: url(../assets/dis.png) no-repeat; */
  background-size: 20px;
}
.l-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 70vh; */
  flex: 1;
  overflow: hidden;
}
.c-tabs-header {
  display: flex;
  width: 100%;
  height: 38px;
  position: relative;
  left: 0;
  top: 0;
  box-shadow: 0 2px 6px #ccc;
}
.pc-container .tab-menu {
  flex: none;
}
.tab-menu {
  flex: 1;
  font-size: 14px;
  padding: 8px 0;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.tab-menu:hover {
  cursor: pointer;
}
.tab-menu.tab-active {
  color: #288fee;
}
.tab-menu.tab-active .personNum {
  color: #288fee;
}
.tab-menu.tab-active:after {
  /* color: #2d8cf0; */
  /* border-bottom: 2px solid #2d8cf0; */
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translate(-50%);
  bottom: 0px;
  display: inline-block;
  height: 3px;
  width: 20px;
  /* text-align: center; */
  background-color: #288fee;
  content: '';
}
.c-tabs {
  width: 100%;
  height: 100%;
  min-height: 50px;
  position: relative;
  left: 0;
  top: 0;
  flex: 1;
  overflow: hidden;
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
.c-content {
  width: 100%;
  height: 100%;
  /* overflow: auto; */
  padding: 0 20px;
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
.avator {
  width: 40px;
  height: 40px;
  background: url(../assets/headimg.png) center no-repeat;
  background-size: cover;
  /* margin-right: 20px; */
  border-radius: 50%;
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
.replayIcon {
  position: absolute;
  left: 40%;
  top: 20%;
  width: 30px;
  background: url(../assets/play.png) no-repeat;
  background-size: cover;
  height: 30px;
}
.replayCover {
  width: 100%;
  height: 100px;
  background: url(../assets/avator.png) no-repeat;
  background-size: 100% 100%;
}
/* 榜单 */
.listItem {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  color: #fff;
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
.thir {
  width: 20px;
  height: 20px;
  background: url(../assets/third.png) no-repeat;
  background-size: 20px;
}
.icon {
  width: 40px;
  height: 40px;
  background: url(../assets/headimg.png) center no-repeat;
  background-size: cover;
  border-radius: 50%;
}
.animate {
  width: 100%;
  position: absolute;
  left: 10px;
  font-size: 14px;
  top: 9px;
  text-align: left;
}
.container > p {
  text-align: initial;
}
.focus-btn {
  width: 60px;
  background: #1890ff;
  color: #fff;
  font-size: 14px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.show-qrcode {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
}
.show-qrcode .box-warpper {
  padding-bottom: 60px;
  /* width: 70vw; */
  border-radius: 2px;
  /* height: 50vh; */
  position: absolute;
  left: 50%;
  top: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
}
.close-btn {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.personNum {
  color: #666666;
}

.item {
  width: 48%;
  height: 138px;
  position: relative;
  margin: 1%;
  text-align: left;
  box-shadow: 0px 0px 2px #ccc;
}
.user_avator {
  width: 40px;
  height: 40px;
  margin: 10px auto;
  border-radius: 50%;
  background: url(../assets/headimg.png) center no-repeat #ffffff;
  /* background-color: #FFFFFF; */
  background-size: cover;
}
.ios-scroll {
  height: 100%;
  position: absolute;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
#photoFrame,
#screenFrame {
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  position: relative;
  margin-left: -20px;
  height: 100%;
}
#photoFrame iframe,
#screenFrame iframe {
  position: absolute;
  left: 0;
  top: 0;
  overflow: auto;
}
.timeTip {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  padding: 2px 16px;
  border: 1px solid #fff;
  border-radius: 4px;
}
.chat-content {
  position: absolute;
  width: 100%;
  overflow: hidden;
  top: 0px;
  z-index: 7;
}
.content {
  position: relative;
  color: black;
  height: 100%;
  overflow: hidden;
}
.core-container {
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
}
.scroll-wrapper::-webkit-scrollbar {
  width: 0 !important;
}
.scroll-wrapper {
  padding: 6px 0px;
  flex: 1;
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  -webkit-overflow-scrolling: touch;
}
.speak-box {
  background: rgb(255, 255, 255);
  padding-bottom: 10px;
  width: 100%;
}
/* .scroll-content {
} */
.scroll-item {
  height: 60px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.user_name {
  display: block;
  width: 60px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.pc-right {
  display: flex;
  flex-direction: column;
  border: 1px solid #333;
  flex: 1px;
}
.pc-right .core-container {
  height: 100%;
}
.pc-right .scroll-wrapper {
  flex: 1;
}
.pc-right .speak-box {
  height: 50px;
}
.pc-right .c-content {
  padding: 0px;
}
.pc-right .wx-login-tip {
  height: 50px;
  background: #555555;
  border-top: 1px solid #555555;
  display: flex;
  color: #ffffff;
  justify-content: center;
  align-items: center;
}
.pc-right .wx-login-tip > div {
  color: rgb(0, 255, 255);
  padding: 0px 20px;
}
.pc-right .wx-login-tip > div:hover {
  cursor: pointer;
  text-decoration: underline;
}
.pc-right .wx-send-msg {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pc-container .topic {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: 100%;
  margin: 0 -20px;
}
.pc-container .topic > div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  height: 100%;
  padding: 0 20px;
}
</style>
