<template>
  <div
      :class="{ fullscreen: fullscreen }"
      class="tinymce-container"
      :style="{ width: containerWidth }"
  >
    <tinymce-editor
        :id="id"
        v-model="tinymceContent"
        :init="initOptions"
    />
    <!--  自定义上传  -->
    <div class="editor-custom-btn-container">
      <editor-image-upload
        :color="uploadButtonColor"
        class="editor-upload-btn"
        @success-callback="imageSuccessCBK"
      />
    </div>
  </div>
</template>

<script>
// Import TinyMCE
import 'tinymce/tinymce'
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default'
// Import themes
import 'tinymce/themes/silver'
import 'tinymce/themes/mobile'
// Any plugins you want to use has to be imported
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import TinymceEditor from '@tinymce/tinymce-vue' // TinyMCE vue wrapper
import EditorImageUpload from './component/EditorImage.vue'
import { plugins, toolbar } from './config'

export default {
  name: 'Tinymce',
  components: {
    EditorImageUpload,
    TinymceEditor
  },
  props: {
    value: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: () => 'vue-tinymce-' + Date.now() + Math.floor(Math.random() * 1000)
    },
    toolbar: {
      type: Array,
      default: () => []
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [String, Number],
      default: '360px'
    },
    width: {
      type: [String, Number],
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      fullscreen: false,
      languageTypeList: {
        en: 'en',
        zh: 'zh_CN',
        es: 'es',
        ja: 'ja',
        ko: 'ko_KR',
        it: 'it'
      },
      uploadButtonColor: '#1890ff',
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
        return `${width}px`
      }
      return width
    },
    language() {
      return this.languageTypeList['zh']
    },
    tinymceContent: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    initOptions() {
      return {
        selector: `#${this.id}`,
        height: this.height,
        body_class: 'panel-body',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        language: this.language,
        language_url: this.language === 'en' ? '' : `${process.env.BASE_URL}tinymce/langs/${this.language}.js`,
        skin_url: `${process.env.BASE_URL}tinymce/skins/`,
        emoticons_database_url: `${process.env.BASE_URL}tinymce/emojis.min.js`,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        convert_urls: false,
        init_instance_callback: (editor) => {
          if (this.value) {
            editor.setContent(this.value)
          }
          this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup: (editor) => {
          editor.on('FullscreenStateChanged', (e) => {
            this.fullscreen = e.state
          })
        },
        paste_data_images: true,
        // 粘贴图片后，自动上传
        urlconverter_callback: (url, node, on_save, name) => {
          // console.log('图片链接', url)
          return url
        },
        images_upload_url: '/API/uploadFile',
        images_upload_handler: async (blobInfo, success, failure) => {
          success("https://img0.baidu.com/it/u=3665653716,3679163486&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800")
          // var form = new FormData()
          // form.append('multiple', blobInfo.blob(), blobInfo.filename())
          // // blobInfo.blob()：包含了图片相关信息
          // const { data } = await getTemImageUrls(form)
          // // console.log(data)
          // // 上传成功后，调用success函数传入图片地址
          // success(data.ossUrl)
        }
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const tinymceManager = window.tinymce
      if (tinymceManager) {
        tinymceManager.init(this.initOptions)
      }
    },
    destroyTinymce() {
      const tinymceManager = window.tinymce
      const tinymceInstance = tinymceManager.get(this.id)
      if (this.fullscreen) {
        tinymceInstance.execCommand('mceFullScreen')
      }
      if (tinymceInstance) {
        tinymceInstance.destroy()
      }
    },
    imageSuccessCBK(arr) {
      console.log(arr)
      const tinymce = window.tinymce.get(this.id)
      arr.forEach(v => {
        tinymce.insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;

  .mce-fullscreen {
    z-index: 10000;
  }
}

.editor-custom-btn-container {
  position: absolute;
  right: 6px;
  top: 6px;
  z-index: 1002;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}

textarea {
  visibility: hidden;
  z-index: -1;
}
</style>
