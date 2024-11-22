
import Component from './component.vue'
import Vue from 'vue'

//定义调用类
class Dialog {
  //定义相关实例，每次new Dialog的时候都会创建一个新的实例，这样弹窗之间就不会相互影响
  instance = null;
  component = null

  open(option) {
    //创建Vue实例，传入相关参数信息
    this.instance = new Vue({
      render(h) {
        return h(Component, { title: option.title }, option.chidren)
      }
    })
    console.log(this.instance, 'open-instance')
    //调用实例的$mount()挂载组件
    this.component = this.instance.$mount();
    console.log(this.component, 'open')
    document.body.appendChild(this.component.$el);
    const notification = this.instance.$children[0];
    return notification.open(option);
  }
  close() {
    //传入的销毁方法，直接在dom树上将当前组件直接销毁
    if (this.component) {
      console.log(this.component, 'close')
      document.body.removeChild(this.component.$el)
    }
    this.component = null
  }
}
export default Dialog
