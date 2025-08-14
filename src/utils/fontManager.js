const FontManager = {
  registeredFonts: new Set(), // 已注册字体集合

  registerFonts(fonts) {
    fonts
      // 1. 只处理自定义字体
      .filter(f => f.fontType === 'CustomFont' && f.files && f.files.truetype && f.files.truetype.url)
      // 2. 过滤掉已注册的字体
      .filter(f => !this.registeredFonts.has(f.fontFamily))
      .forEach(f => {
        this._registerFont(f);
        this.registeredFonts.add(f.fontFamily);
      });
  },

  _registerFont(font) {
    const { fontFamily, files } = font;
    const url = files.truetype.url;
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${url}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }
};


export default FontManager;