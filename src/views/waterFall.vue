<template>
<div>
  asd
  <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="handleReachBottom"></vue-waterfall-easy>
</div>
</template>

<script>
import vueWaterfallEasy from "@parrotjs/vue-waterfall"; 
import "@parrotjs/vue-waterfall/dist/vue-waterfall.css";
export default {
  components: {
    vueWaterfallEasy,
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
    };
  },
  methods: { 
    handleReachBottom:function(){
      this.imgsArr = this.imgsArr.concat(this.imgsArr); 
    }
  },
};
</script>

<style>
</style>