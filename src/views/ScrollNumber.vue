<template>
  <ul class="flex">
    <ScrollNum
      v-for="(num, index) in numArr"
      :key="index"
      as="li"
      :i="num"
      :delay="index + 1"
      class="num"
    ></ScrollNum>
  </ul>
</template>

<script>
import ScrollNum from "../components/ScrollNum";

export default {
  components: {
    ScrollNum,
  },
  data() {
    return {
      num: 886,
    };
  },
  computed: {
    numArr() {
      const str = String(this.num);

      return [parseInt(str[0]), parseInt(str[1]), parseInt(str[2])];
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.num {
  --width: 26px;
  margin-right: 6px;
  border: 1px solid black;
  border-radius: 8px;
}
</style>