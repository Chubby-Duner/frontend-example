<template>
  <div>
    <!-- 主预览区域 -->
    <div class="preview-wrapper">
      <img
        v-if="selectedImage"
        :src="selectedImage"
        class="preview-image"
        alt="预览图"
      />
      <img
        :src="maskImage"
        class="mask-image"
        alt="蒙版图"
      />
    </div>

    <!-- 可选缩略图 -->
    <div class="thumbnails">
      <img
        v-for="(img, idx) in imageList"
        :key="idx"
        :src="img"
        class="thumbnail"
        @click="selectImage(img)"
      />
    </div>
  </div>
</template>

<!-- 图片层叠效果： 蒙版图位于背景图上层，就会产生镂空部分会截断的效果 -->

<script>
import previewImage from "@/assets/images/previewImage.png";
import maskImage from "@/assets/images/maskImage.png";

export default {
  data() {
    return {
      previewImage: previewImage,
      maskImage: maskImage,
      selectedImage: previewImage,
      imageList: [
        'https://t13.baidu.com/it/u=601606161,1122792901&fm=224&app=112&f=JPEG?w=283&h=499',
        'https://pic1.zhimg.com/v2-9de21fc7f2fc5a4ab641b8c4a2d6de81_r.jpg?source=1940ef5c',
      ]
    }
  },
  methods: {
    selectImage(img) {
      this.selectedImage = img
    }
  }
}
</script>

<style scoped>
.preview-wrapper {
  position: relative;
  width: 300px;
  height: 400px;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.preview-image,
.mask-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mask-image {
  z-index: 2;
  pointer-events: none;
}

.preview-image {
  z-index: 1;
}

.thumbnails {
  display: flex;
  gap: 10px;
}

.thumbnail {
  width: 80px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail:hover {
  border-color: #f40;
}
</style>
