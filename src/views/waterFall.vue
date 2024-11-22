<template>
<div>
  <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="handleReachBottom"></vue-waterfall-easy>

  <el-button @click="shopInformationDialog = true" type="primary">open</el-button>
  <el-button @click="test" type="primary">test</el-button>

  <div v-for="item in list" :key="item.type">
    <div v-if="item.type === 1" style="margin-bottom: 10px;">
      <el-input v-model="item.sex" />
      <el-input v-model="item.name" />
    </div>
    <div v-if="item.type === 2" style="margin-bottom: 10px;">
      <el-input v-model="item.sex" />
      <el-input v-model="item.name" />
      <el-input v-model="item.hobby" />
    </div>
    <div v-if="item.type === 3">
      <el-input v-model="item.sex" />
      <el-input v-model="item.name" />
      <el-input v-model="item.hobby" />
      <el-input v-model="item.phone" />
    </div>
  </div>
  

  <el-dialog
    title="店铺信息"
    :visible.sync="shopInformationDialog"
    append-to-body
    width="40%"
    top="10vh"
  >
    <div class="auth-wrapper">
      <div class="auth-container" v-for="authItem in newShopInformation.shopAuths" :key="authItem.authType">
        <!-- 平台授权 -->
        <el-card class="box-card" style="margin-top: 10px;" v-if="authItem.authType === 0">
          <div slot="header" class="clearfix">
            <span>平台授权</span>
            <el-button type="success" size="small" class="fr" @click="open_access_window">API授权</el-button>
            <el-button type="success" size="small" class="fr" v-if="currentPlatform === 'Mercado'" @click="getShopMarketplaces">获取店铺数组</el-button>
          </div>
          <el-row>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>{{ currentPlatform | filterClientId }}：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.clientId" :disabled="currentPlatform === 'allegro'" size="small" />
              </div>
            </el-col>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>{{ currentPlatform | filterClientSecret }}：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.clientSecret" :disabled="currentPlatform === 'allegro'" size="small" />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>Redirect URI：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.redirectUrl" :disabled="currentPlatform === 'allegro'" size="small" />
              </div>
            </el-col>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>令牌：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.accessToken" size="small" disabled />
              </div>
            </el-col>
          </el-row>
          <!-- 过期时间 -->
          <el-row>
              <el-col :span="12" class="cols">
                <div class="label">
                  <label class="expiresTime-color">过期时间：</label>
                </div>
                <div class="inp" style="padding-top: 7px;">
                  <span class="expiresTime-color">{{ authItem.expiresTime }}</span>
                </div>
              </el-col>
          </el-row>
        </el-card>
        <!-- 自授权 -->
        <el-card class="box-card" style="margin-top: 10px;" v-if="authItem.authType === 1">
          <div slot="header" class="clearfix">
            <span>自授权</span>
            <el-button type="success" size="small" class="fr" @click="get_access_token(currentPlatform)">API授权</el-button>
          </div>
          <el-row>
            <el-col :span="12" class="cols" v-if="!['Blidz'].includes(currentPlatform)">
              <div class="label">
                <label>{{ currentPlatform | filterClientId }}：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.clientId" size="small" />
              </div>
            </el-col>
            <el-col :span="12" class="cols" v-if="!['Merlin', 'Blidz'].includes(currentPlatform)">
              <div class="label">
                <label>{{ currentPlatform | filterClientSecret }}：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.clientSecret" size="small" />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="cols" v-if="['Kaufland', 'Linio', 'Coupang'].includes(currentPlatform)">
              <div class="label">
                <label>Redirect URI：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.redirectUrl" size="small" />
              </div>
            </el-col>
            <el-col :span="12" class="cols" v-if="['B2w', 'Bol', 'Walmart', 'Cdiscount', 'Otto', 'Fruugo', 'Wayfair', 'LingWu'].includes(currentPlatform)">
              <div class="label">
                <label>令牌：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.accessToken" size="small" disabled />
              </div>
            </el-col>
            <!-- 过期时间 -->
            <el-col :span="12" class="cols">
                <div class="label">
                  <label class="expiresTime-color">过期时间：</label>
                </div>
                <div class="inp" style="padding-top: 7px;">
                  <span class="expiresTime-color">{{ authItem.expiresTime }}</span>
                </div>
              </el-col>
          </el-row>
        </el-card>
        <!-- SP授权 -->
        <el-card class="box-card" style="margin-top: 10px;" v-if="authItem.authType === 3">
          <div slot="header" class="clearfix">
            <span>SP授权</span>
            <el-button class="fr" type="success" size="small" @click="amazonSPAuthorize">SP授权</el-button>
          </div>
          <el-row>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>卖家编号：</label>
              </div>
              <div class="inp">
                <el-input v-model="newShopInformation.sellerId" size="small" />
              </div>
            </el-col>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>SP刷新令牌：</label>
              </div>
              <div class="inp">
                <el-input
                  v-model="authItem.refreshToken"
                  size="small"
                  disabled
                />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="cols">
              <div class="label">
                <label class="expiresTime-color">过期时间：</label>
              </div>
              <div class="inp" style="padding-top: 7px;">
                <span class="expiresTime-color">{{ authItem.expiresTime }}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <!-- 广告授权 -->
        <el-card class="box-card" style="margin-top: 10px;" v-if="authItem.authType === 2">
          <div slot="header" class="clearfix">
            <span>广告授权</span>
            <!-- <el-button type="success" size="small" style="float: right;">API授权</el-button> -->
          </div>
          <el-row>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>{{ currentPlatform | filterClientId }}：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.clientId" size="small" />
              </div>
            </el-col>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>{{ currentPlatform | filterClientSecret }}：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.clientSecret" size="small" />
              </div>
            </el-col>
          </el-row>
          <el-row v-if="currentPlatform !== 'Bol'">
            <el-col :span="12" class="cols">
              <div class="label">
                <label>Redirect URI：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.redirectUrl" size="small" />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>广告api令牌：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.accessToken" size="small" disabled />
              </div>
            </el-col>
            <el-col :span="12" class="cols" v-if="currentPlatform !== 'Amazon'">
              <div class="label">
                <label>adScopeId：</label>
              </div>
              <div class="inp">
                <el-input v-model="authItem.adScopeId" size="small" disabled />
              </div>
            </el-col>
          </el-row>
        </el-card>
        <!-- MFA二步认证 -->
        <el-card class="box-card" style="margin-top: 10px;" v-if="authItem.authType === 4">
          <div slot="header" class="clearfix">
            <span>MFA二步认证</span>
          </div>
          <el-row>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>上传文件：</label>
              </div>
              <el-upload
                action="#"
                multiple
                accept=".jpg,.JPG,.png,.PNG,.jpeg,.JPEG"
                :http-request="(param) => httpRequestHandle(param)"
                :show-file-list="false"
                class="inline-block"
              >
                <div class="el-upload__text">
                  <el-button type="primary" size="mini">上传文件</el-button>
                </div>
              </el-upload>
            </el-col>
            <el-col :span="12" class="cols">
              <div class="label">
                <label>令牌：</label>
              </div>
              <div class="inp">
                <el-input
                  v-model="authItem.accessToken"
                  size="small"
                  disabled
                />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import vueWaterfallEasy from "@parrotjs/vue-waterfall"; 
import "@parrotjs/vue-waterfall/dist/vue-waterfall.css";
export default {
  components: {
    vueWaterfallEasy,
  },
  filters: {
    filterClientId() {},
    filterClientSecret() {},
  },
  data() {
    return {
      imgsArr: [
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://t7.baidu.com/it/u=1575628574,1150213623&fm=193&f=GIF",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        }
      ],
      list: [
        { type: 1, sex: 'man', name: 'jace', hobby: 'pp' },
        { type: 2, sex: 'man', name: 'tom', hobby: 'bb' },
        { type: 3, sex: 'woman', name: 'xx', hobby: 'pp', phone: '123' }
      ],
      data: {
        powerData: []
      },
      shopInformationDialog: false,
      shop: {
        shopNumber: 123,
        name: 456
      },
      currentPlatform: '',
      newShopInformation: {
        id: '',
        authId: '', // 'LingWu', 'Fruugo', 'Blidz', 'Wayfair'
        shopName: '', // 店铺名称
        shopNumber: '', // 店铺序号
        errorMsg: '', // 店铺是否重复提示信息
        siteId: '',
        siteDisabled: false, // 当站点列表只有一个时禁用
        staffId: '',
        sellerId: '',
        changeDate: '',
        currencyCode: '',
        commissionRate: '', // 佣金比例
        shopAuths: [
          {
            authId: '',
            authType: 2, // 平台
            clientId: 'plat',
            clientSecret: 'plat',
            redirectUrl: '1234',
            accessToken: 'plat', // 令牌
            expiresTime: 'plat-2023' // 过期时间
          },
          {
            authId: '',
            authType: 3, // 自授权
            clientId: 'self',
            clientSecret: 'self',
            redirectUrl: '1234',
            accessToken: 'self', // 令牌
            expiresTime: 'self-2023' // 过期时间
          }
        ],
        // mercado 新增
        marketplaces: '', // 可刊登站点JSON
        isGetMarket: false,
        // amazon 新增站点
        parentId: ''
      }
    };
  },
  methods: { 
    handleReachBottom:function(){
      this.imgsArr = this.imgsArr.concat(this.imgsArr); 
    },
    test() {
      const flag = true
      const a = 1, b = 2

      const loga = () => {
        console.log('this is', a)
      }

      const logb = () => {
        console.log('this is', b)
      }

      if (flag) {
        loga()
      } else {
        logb
      }

    },
    amazonSPAuthorize() {},
    httpRequestHandle() {},
    getShopMarketplaces() {
      this.newShopInformation.sellerId = 'xxx'
      this.newShopInformation.marketplaces = 'xxx'
      this.newShopInformation.isGetMarket = true
    }
  },
};
</script>

<style>
</style>