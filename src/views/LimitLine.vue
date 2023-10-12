<template>
  <div>
    <!-- 文本内容显示6行，超出6行出现显示更多按钮，css样式超出行数只能使用...去替代 -->
    <!-- 
        分析：
            1，宽度不定（移动端），高度不定，文本内容不定（文字可以是汉子，字母，数字等），几乎什么都不确定，如何控制？如何才能知道什么情况下才是第6行？
            2，经过思考，小编得到一个公式：行数=文本高度 / 行高；
            3，通过这个计算行数公式，小编确定行高，如line-height: 20px;
            4，先把文本的所有内容进行展示，此时，文本div不设置高度
            5，获取文本div的offsetHeight（vue可以使用ref获取）
            6，文本高度和行高都确定了，就可以得到总行数
            7，根据这个总行数是否大于6进行判断，大于6行，则现实“展示更多”，小于6的不显示
     -->
    <div
      class="lines"
      ref="lines"
      :style="{ height: lineFlag ? '120px' : 'auto' }"
    >
      噫吁嚱，危乎高哉！蜀道之难，难于上青天
      蚕丛及鱼凫，开国何茫然！尔来四万八千岁，不与秦塞通人烟。西当太白有鸟道，可以横绝峨眉巅。地崩山摧壮士死，然后天梯石栈相钩连。上有六龙回日之高标，下有冲波逆折之回川。黄鹤之飞尚不得过，猿猱欲度愁攀援。青泥何盘盘，百步九折萦岩峦。扪参历井仰胁息，以手抚膺坐长叹。
      问君西游何时还？畏途巉岩不可攀。但见悲鸟号古木，雄飞雌从绕林间。又闻子规啼夜月，愁空山。蜀道之难，难于上青天，使人听此凋朱颜！连峰去天不盈尺，枯松倒挂倚绝壁。飞湍瀑流争喧豗，砯崖转石万壑雷。其险也如此，嗟尔远道之人胡为乎来哉！
      剑阁峥嵘而崔嵬，一夫当关，万夫莫开。所守或匪亲，化为狼与豺。朝避猛虎，夕避长蛇；磨牙吮血，杀人如麻。锦城虽云乐，不如早还家。蜀道之难，难于上青天，侧身西望长咨嗟！
    </div>

    <div>
      <span class="more" v-if="lineFlag" @click="moreInfo">展示更多</span>
      <span class="more" v-else @click="moreInfo">收起</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LimitLine",
  data() {
    return {
      lineNum: 0,
      lineFlag: false,
    };
  },
  mounted() {
    this.lineNum = this.$refs.lines.offsetHeight / 20;
    this.lineNum > 6 ? (this.lineFlag = true) : (this.lineFlag = false);
    console.log("this.lineNum ==> ", this.lineNum);
  },
  methods: {
    moreInfo() {
      this.lineFlag = !this.lineFlag;
    },
  },
};
</script>

<style>
.lines {
  width: 500px;
  /*border: 1px solid gray;*/
  line-height: 20px;
  text-align: left;
  overflow: hidden;
  background: #999999;
}
.more {
  text-decoration: underline;
  margin-left: 425px;
}
.more:hover {
  cursor: pointer;
}
</style>