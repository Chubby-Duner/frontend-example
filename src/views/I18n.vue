<template>
  <div class="content">
    <span>{{ $t("message.hello") }}</span>
    <div>
      <el-button>{{ $t("btn.text") }}</el-button>
    </div>
    <div>
      <el-button @click="changeLaguages()">切换语言</el-button>
    </div>
    <!-- <span v-if="lang==='zh'"  @click="changezh" style="display:block" class="color">中文</span> -->
    <!-- <span v-else ="lang==='en'" @click="changeen" style="display:block">english</span> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "zh",
    };
  },
  methods: {
    changeLaguages() {
      console.log("$i18n ==> ", this.$i18n);
      console.log("$i18n.locale ==> ", this.$i18n.locale);
      let lang = this.$i18n.locale === "zh" ? "en" : "zh";
      this.$i18n.locale = lang;
    },
    // changezh () {
    //   this.lang = '中文'
    //   this.$i18n.locale = 'zh'
    // },
    // changeen () {
    //   this.lang = 'english'
    //   this.$i18n.locale = 'en'
    // }
  },
};
</script>

<style scoped>
</style>
