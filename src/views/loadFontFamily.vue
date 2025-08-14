<template>
  <div>
    <!-- 字体选择 -->
    <el-select
      v-model="selectedFont"
      placeholder="选择字体"
      style="width: 300px"
    >
      <el-option
        v-for="font in allFonts"
        :key="font.fontFamily"
        :label="font.fontFamily"
        :value="font.fontFamily">
        <!-- 用自定义模板渲染 option -->
        <span :style="{ fontFamily: font.fontFamily, fontSize: '18px' }">
          {{ font.fontFamily }}
        </span>
      </el-option>
    </el-select>

    <!-- 显示文字 -->
    <div
      class="preview-text"
      :style="{ fontFamily: selectedFont || 'inherit' }">
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
</template>

<script>
import "@/assets/fonts/fonts.css";
import FontManager from "@/utils/fontManager";

export default {
  data() {
    return {
      selectedFont: '',
      allFonts: [
        {
          fontFamily: 'Quimil-Demo-2',
          fontVariants: ['regular'],
          fontVersion: 'v23',
          fontType: 'CustomFont',
          files: {
            truetype: {
              fileName: 'Quimil-Demo-2.ttf',
              url: "https://image.yuanmeinetwork.com/20250813/_BzqYONggScYCwETUVkN6.ttf"
            }
          }
        },
        {
          fontFamily: 'Abril Fatface',
          fontVariants: ['regular'],
          fontVersion: 'v23',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Acme',
          fontVariants: ['regular'],
          fontVersion: 'v25',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Alfa Slab One',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Alegreya',
          fontVariants: ['regular'],
          fontVersion: 'v36',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Allura',
          fontVariants: ['regular'],
          fontVersion: 'v21',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Amatic SC',
          fontVariants: ['regular'],
          fontVersion: 'v26',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Antic Slab',
          fontVariants: ['regular'],
          fontVersion: 'v16',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Anton',
          fontVariants: ['regular'],
          fontVersion: 'v25',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Archivo Black',
          fontVariants: ['regular'],
          fontVersion: 'v21',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Arimo',
          fontVariants: ['regular'],
          fontVersion: 'v29',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Arvo',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Asap Condensed',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Audiowide',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Bad Script',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Baloo',
          fontVariants: ['regular'],
          fontVersion: 'v5',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Baloo Bhai',
          fontVariants: ['regular'],
          fontVersion: 'v5',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Bangers',
          fontVariants: ['regular'],
          fontVersion: 'v24',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Bebas Neue',
          fontVariants: ['regular'],
          fontVersion: 'v14',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Bowlby One SC',
          fontVariants: ['regular'],
          fontVersion: 'v25',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Bree Serif',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Cabin Sketch',
          fontVariants: ['regular'],
          fontVersion: 'v21',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Cantata One',
          fontVariants: ['regular'],
          fontVersion: 'v15',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Caveat',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Chewy',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Cinzel',
          fontVariants: ['regular'],
          fontVersion: 'v23',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Comfortaa',
          fontVariants: ['regular'],
          fontVersion: 'v45',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Cookie',
          fontVariants: ['regular'],
          fontVersion: 'v21',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Cormorant Garamond',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Courgette',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Covered By Your Grace',
          fontVariants: ['regular'],
          fontVersion: 'v16',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Damion',
          fontVariants: ['regular'],
          fontVersion: 'v15',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Dancing Script',
          fontVariants: ['regular'],
          fontVersion: 'v25',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Days One',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Didact Gothic',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'EB Garamond',
          fontVariants: ['regular'],
          fontVersion: 'v30',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Encode Sans',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Fauna One',
          fontVariants: ['regular'],
          fontVersion: 'v15',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Fjalla One',
          fontVariants: ['regular'],
          fontVersion: 'v15',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Fondamento',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Forum',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Fredericka the Great',
          fontVariants: ['regular'],
          fontVersion: 'v21',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Fredoka One',
          fontVariants: ['regular'],
          fontVersion: 'v13',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Fugaz One',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Glegoo',
          fontVariants: ['regular'],
          fontVersion: 'v16',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Gloria Hallelujah',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Gochi Hand',
          fontVariants: ['regular'],
          fontVersion: 'v23',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Great Vibes',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Homemade Apple',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'IBM Plex Serif',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Inconsolata',
          fontVariants: ['regular'],
          fontVersion: 'v32',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Indie Flower',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Italianno',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Josefin Sans',
          fontVariants: ['regular'],
          fontVersion: 'v32',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Julius Sans One',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Kalam',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Karma',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Kaushan Script',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Lato',
          fontVariants: ['regular'],
          fontVersion: 'v24',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Libre Baskerville',
          fontVariants: ['regular'],
          fontVersion: 'v16',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Lobster',
          fontVariants: ['regular'],
          fontVersion: 'v30',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Luckiest Guy',
          fontVariants: ['regular'],
          fontVersion: 'v23',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Marcellus',
          fontVariants: ['regular'],
          fontVersion: 'v13',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Marck Script',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Merienda',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Merienda One',
          fontVariants: ['regular'],
          fontVersion: 'v16',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Mitr',
          fontVariants: ['regular'],
          fontVersion: 'v12',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Monda',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Monoton',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Montserrat',
          fontVariants: ['regular'],
          fontVersion: 'v29',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Montserrat Subrayada',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Mountains of Christmas',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Nanum Gothic Coding',
          fontVariants: ['regular'],
          fontVersion: 'v26',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Nunito',
          fontVariants: ['regular'],
          fontVersion: 'v26',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Old Standard TT',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Open Sans',
          fontVariants: ['regular'],
          fontVersion: 'v40',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Orbitron',
          fontVariants: ['regular'],
          fontVersion: 'v31',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Oswald',
          fontVariants: ['regular'],
          fontVersion: 'v53',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Pacifico',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Pangolin',
          fontVariants: ['regular'],
          fontVersion: 'v11',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Parisienne',
          fontVariants: ['regular'],
          fontVersion: 'v13',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Patua One',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Patrick Hand',
          fontVariants: ['regular'],
          fontVersion: 'v23',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Permanent Marker',
          fontVariants: ['regular'],
          fontVersion: 'v16',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Pinyon Script',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Play',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Playfair Display',
          fontVariants: ['regular'],
          fontVersion: 'v37',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Playfair Display SC',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Poiret One',
          fontVariants: ['regular'],
          fontVersion: 'v16',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Poppins',
          fontVariants: ['regular'],
          fontVersion: 'v23',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Press Start 2P',
          fontVariants: ['regular'],
          fontVersion: 'v15',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Pridi',
          fontVariants: ['regular'],
          fontVersion: 'v14',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Quantico',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Raleway',
          fontVariants: ['regular'],
          fontVersion: 'v34',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Righteous',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Roboto',
          fontVariants: ['regular'],
          fontVersion: 'v47',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Roboto Slab',
          fontVariants: ['regular'],
          fontVersion: 'v34',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Rochester',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Rock Salt',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Rubik',
          fontVariants: ['regular'],
          fontVersion: 'v28',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Rubik Mono One',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Russo One',
          fontVariants: ['regular'],
          fontVersion: 'v16',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Sacramento',
          fontVariants: ['regular'],
          fontVersion: 'v15',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Sanchez',
          fontVariants: ['regular'],
          fontVersion: 'v15',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Satisfy',
          fontVariants: ['regular'],
          fontVersion: 'v21',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Sawarabi Mincho',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Shadows Into Light',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Shadows Into Light Two',
          fontVariants: ['regular'],
          fontVersion: 'v17',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Sigmar One',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Slabo 27px',
          fontVariants: ['regular'],
          fontVersion: 'v14',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Source Code Pro',
          fontVariants: ['regular'],
          fontVersion: 'v23',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Special Elite',
          fontVariants: ['regular'],
          fontVersion: 'v19',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Staatliches',
          fontVariants: ['regular'],
          fontVersion: 'v13',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Syncopate',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Taviraj',
          fontVariants: ['regular'],
          fontVersion: 'v14',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Teko',
          fontVariants: ['regular'],
          fontVersion: 'v22',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Ultra',
          fontVariants: ['regular'],
          fontVersion: 'v24',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Unica One',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Varela Round',
          fontVariants: ['regular'],
          fontVersion: 'v20',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Vidaloka',
          fontVariants: ['regular'],
          fontVersion: 'v18',
          fontType: 'GoogleFont'
        },
        {
          fontFamily: 'Zilla Slab',
          fontVariants: ['regular'],
          fontVersion: 'v11',
          fontType: 'GoogleFont'
        }
      ],
      fontLink: {
        Allura: 'https://m.media-amazon.com/images/S/gestalt-fonts-eu-prod-eu-west-1/fonts/allura-v22-latin-regular.woff2',
        'Amatic SC': 'https://m.media-amazon.com/images/S/gestalt-fonts-eu-prod-eu-west-1/fonts/amatic-sc-v27-latin-regular.woff2',
        'Antic Slab': 'https://m.media-amazon.com/images/S/gestalt-fonts-eu-prod-eu-west-1/fonts/antic-slab-v16-latin-regular.woff2'
      }
    }
  },
  mounted() {
     // 页面加载时，动态注册自定义字体
     FontManager.registerFonts(this.allFonts);
  },
  methods: {
  }
}
</script>

<style scoped>
.preview-text {
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
  font-size: 28px;
}
</style>
