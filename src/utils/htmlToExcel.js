import * as XLSX2 from 'xlsx';
import * as XLSX from 'xlsx-styles';

class ToXlsx {
  // id指的是绑定数据的table的id，
  // title指的是导出表格的名称，记得带后缀xlsx，例如：title='重复导.xlsx';
  constructor (id, title) {
    this.id = id;
    this.title = title;
  }
  
  /**
   * 自定义表格
   * @returns {Promise<void>}
   */
  async createCustomizeTable() {
    let sheet = XLSX2.utils.table_to_sheet(document.querySelector(this.id));
    // 设置单个单元格样式 ，A2对应的是excel表格的A2
    // sheet["A2"].s = {
    //   alignment: {
    //     horizontal: "center",
    //     vertical: "center",
    //     wrap_text: true
    //   }
    // };
    
    // sheet居然是个对象，所以遍历就用for in
    // 偷个懒，因为要所有的表格都居中，所以这里就用for in 遍历设置了，如果只是单个设置，那就用上面的单独设置就行
    for (let key in sheet){
      if (new RegExp('^[A-Za-z0-9]+$').exec(key)) {
        let cell = key.toString();
        sheet[cell].s = {
          alignment: {
            horizontal: "center", // 水平对齐-居中
            vertical: "center", // 垂直对齐-居中
            wrap_text: true
          }
        }
      }
    }
    
    // wpx 字段表示以像素为单位，wch 字段表示以字符为单位
    // 注意，必须从第一个开始设置，不能只设置单独一个也有道理，
    // !cows是列宽
    sheet['cols'] = [
          {wch: 16}, // A列
          {wch: 16}, // B列
          {wch: 16}, // C列
          {wch: 16}, // D列
    ];
   
    // ！rows设置的行高
    sheet['!rows'] = [
          {wpx: 40,}, // 1行
          {wpx: 40}, // 2行
          {wpx: 40}, // 3行
          {wpx: 40}, // 4行
    ];
    try {
      this.openDownloadDialog(this.sheet2blob(sheet), this.title);
    } catch (e) {
     console.log('自定义表格报错', e);
    }
  }
  
  /**
   * 将表转换为最终excel文件的blob对象，并使用URL.createObjectUR下载它
   * @param sheet 表格配置项
   * @param sheetName 表格名称
   * @returns {Blob}
   */
  sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    let workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet; // 生成excel的配置项
    
    let wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    };
    let wbout = XLSX.write(workbook, wopts);
    let blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }); // 字符串转ArrayBuffer
    
    function s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
    return blob;
  }
  
  /**
   *
   * @param url 生成的文件
   * @param saveName 保存文件名称
   */
  openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    let aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
  }
}

export default ToXlsx
