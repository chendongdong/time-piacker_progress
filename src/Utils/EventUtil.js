export default {
  addEvent(ele, type, handler) {
    if (ele.addEventListener) {
      ele.addEventListener(type, handler, false)
    } else if (ele.attachEvent) {
      ele.attachEvent('on' + type, handler)
    } else {
      ele['on' + type] = handler
    }
  },
  removeEvent(ele, type, handler) {
    if (ele.removeEventListener) {
      ele.removeEventListener(type, handler, false)
    } else if (ele.detachEvent) {
      ele.detachEvent('on' + type, handler)
    } else {
      ele['on' + type] = null
    }
  },
  // 阻止冒泡
  stopPropagration(ev) {
    if (ev.stopPropagration) {
      ev.stopPropagration()
    } else {
      ev.cancelBubble = true
    }
  },
  // 阻止默认事件，捕获
  preventDefalut(ev) {
    if (ev.preventDefalut) {
      ev.preventDefalut()
    } else {
      ev.returnValue = false
    }
  },
}
