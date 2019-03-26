export default {
  // 防抖，停止操作 second 时间后调用，一直操作则一直一调用
  doubleClick(second, fn) {
    console.log('doubleClick---只打印1次')
    let timer = null
    return function(ev) {
      console.log('每次点击都打印 doubleClick--ev=', ev)
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(()=>{
        console.log('最后一次点击1秒后才会打印')
        fn(ev)
      }, second)
    }
  },
  // 节流，每隔 second 时间后调用一次
  throttle(second, fn) {
    let isValid = true
    return function(ev) {
      if (!isValid) {
        return
      }
      isValid = false
      setTimeout(()=>{
        fn(ev)
        isValid = true
      }, second)
    }
  },
  copyObj(target, source, isDeep) {
    if (isDeep) {
      // 深拷贝
      // JSON 方式拷贝弊端：Object, Array无法拷贝，忽略 symbol 和 undefined
      //   target = JSON.parse(JSON.stringify(source))
      for (let key in source) {
        if (source[key] !== null && typeof source[key] == 'object') {
          // 是对象或者数组
          let typeObj = Object.prototype.toString.call(source[key])
          console.log('typeObj=', typeObj)
          let type = typeObj.slice(8, -1)
          target[key] = type == 'Array' ? [] : {}
          this.copyObj(target[key], source[key], isDeep)
        } else {
          target[key] = source[key]
          console.log('else target[key]=', target[key])
        }
      }
    } else {
      // 浅拷贝, 如果属性值是对象，则复制的是地址，修改对象的值会导致原对象的值也被修改
      Object.assign(target, source)
    }
  }
}
