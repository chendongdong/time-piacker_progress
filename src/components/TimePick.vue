<template>
  <div class="t-picker">
    <div class="t-picker-container">
      <div class="t-picker-title">{{title}}</div>
      <div class="t-picker-content">
        <div v-for="(pickerItem, pickerIndex) in pickerData" :key="pickerIndex" class="t-picker-item">
          <ul @touchstart="touchStart" @touchmove="touchMove($event, pickerIndex)" @touchend="touchEnd($event, pickerIndex)"
              :style="{'transition': drag?'none':'transform .5s', transform: 'translateY(' + pickerItem.translateY + 'px)'}">
            <li v-for="(item, index) in pickerItem.data" :key="index"
                :class="['t-item', {'t-activeItem': selectItem[pickerIndex]==item,'lightColor':Math.abs(selectIdx[pickerIndex] - index) >= centerIdx}]">{{item}}</li>
          </ul>
          <div class="unit">{{paramData[pickerIndex].unit}}</div>
        </div>
        <div class="t-picker-line"></div>
      </div>
      <div class="container-root-btn">
        <div class="root-btn-cancel root-btn-press" @click="$emit('cancel')">取消</div>
        <div class="root-btn-midBox"></div>
        <div class="root-btn-submit root-btn-press" @click="$emit('submit')">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
//  import {PrefixInteger } from '../utils/commonUtil'
  export default {
    data() {
      return {
        drag: false,
        pickerData: [],
        selectItem: [], // 当前选中的值
        itemHeight: 4, // 可视内容的高度
        itemNum: 5, // 可视的条数
        startY: 0,
        centerIdx: 0, // 可视条数的一半，即中间选中的
        selectIdx: [],  // 选中值的下标
        fontSize: 12
      }
    },
    props: {
      defaultItem: {
        type: Array,
        default: function() {
          return []
        }
      },
      paramData: {
        type: Array,
        default: function() {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      }
    },
    watch: {
      defaultItem: {
        handler(val) {
          this.initData()
        },
        deep: true
      }
    },
    methods: {
      initData() {
        this.pickerData = []
        this.selectItem = []
        this.selectIdx = []
        for (let i = 0; i < this.paramData.length; i++) {
          let item = this.paramData[i]
          let pickItem = [],
            pickHead = [],
            pickEnd = [],
            translateY = 0
          let headLen = this.centerIdx + 1
          // 头部数据，用于循环时显示
          for (let k = item.rangeEnd - item.step; pickHead.length < headLen; k-=item.step ) {
            pickHead.unshift(this.formatData(k, item.len))
          }
          // 尾部数据，用于循环时显示
          for (let k = item.rangeStart; pickEnd.length < headLen; k+=item.step) {
            pickEnd.push(this.formatData(k, item.len))
          }
          // 有效数据
          for (let j = item.rangeStart; j < item.rangeEnd; j+=item.step) {
            pickItem.push(this.formatData(j, item.len))
            // 默认选中的
            if (this.defaultItem[i] == j) {
              this.selectItem.push(this.formatData(j, item.len))
              let index = headLen + pickItem.length - 1
              this.selectIdx.push(index)
              translateY = - this.itemHeight *  (index - this.centerIdx)
               console.log('j=' + j + ' index=' + index + ' centerIdx=' + this.centerIdx + ' translateY=' + translateY)
            }
          }
          pickItem = pickHead.concat(pickItem, pickEnd)
          let itemData = {
            data: pickItem,
            translateY: translateY
          }
          this.pickerData.push(itemData)
        }
      },
      formatData(num, len) {
          if (len == 2 && num < 10) {
              return '0' + num
          } else {
              return num
          }
      },
      submit() {
        this.$emit('submit', this.selectItem)
      },
      touchStart(e) {
        this.drag = true
        this.startY = e.touches[0].clientY
      },
      touchMove(e, pickerIndex) {
        // 移动的距离
        let tranDistance = e.touches[0].clientY - this.startY
        // 重新赋值
        this.startY = e.touches[0].clientY
        // 滚动条移动距离
        let translateY = this.pickerData[pickerIndex].translateY + tranDistance
        // 获取当前选中的下标，四舍五入获取最近的
        this.selectIdx[pickerIndex] = this.centerIdx - Math.round(translateY / this.itemHeight)
        let headLen = this.centerIdx + 1
        let totalLen = this.pickerData[pickerIndex].data.length
        let dataHeight = this.itemHeight * (totalLen - headLen * 2)
        if (this.selectIdx[pickerIndex] < headLen) {
          // 上边界
          this.pickerData[pickerIndex].translateY = translateY - dataHeight
          this.selectIdx[pickerIndex] = totalLen - headLen - 1
          console.log('上边界处理后 selectIdx[pickerIndex]=', this.selectIdx[pickerIndex])
        } else if (this.selectIdx[pickerIndex] >= totalLen - headLen) {
          // 下边界
          this.pickerData[pickerIndex].translateY = translateY + dataHeight
          this.selectIdx[pickerIndex] = headLen - 1
          console.log('下边界处理后 selectIdx[pickerIndex]=', this.selectIdx[pickerIndex])
        } else {
          this.pickerData[pickerIndex].translateY = translateY
        }
        // 当前选中的值
        this.selectItem[pickerIndex] = this.pickerData[pickerIndex].data[this.selectIdx[pickerIndex]]
      },
      touchEnd(e, pickerIndex) {
        this.drag = false
        // 松手后移动到选中的下标对应的位置
        this.pickerData[pickerIndex].translateY = this.itemHeight * (this.centerIdx - this.selectIdx[pickerIndex])
      }
    },
    mounted() {
      this.$nextTick(function(){
        let ele = document.querySelector('.t-picker-content')
        let remHeight = window.getComputedStyle(ele).height.split('px')[0]
        console.log('remHeight=', remHeight)
        this.fontSize = Number.parseFloat(remHeight) / this.itemNum / 4
        this.itemHeight *= this.fontSize
        console.log('mounted fontSize=', this.fontSize + ' itemHeight=' + this.itemHeight)
        this.centerIdx = Number.parseInt(this.itemNum / 2)
        this.initData()
      })
    }
  }
</script>

<style lang="scss">
  .t-picker {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgba(0, 0, 0, .3);
    $itemHeight: 4rem;
    $itemNum: 5;
    .text18{
      font-size: 1.8rem;
      color: #1A1A1A;
    }
    .text15{
      font-size: 1.5rem;
      color: #1A1A1A;
    }
    .t-picker-container {
      position: absolute;
      left: .4rem;
      right: .4rem;
      bottom: .4rem;
      background: #fff;
      z-index: 100;
      border-radius: .8rem;
    }
    .t-picker-title {
      text-align: left;
      @extend .text18;
      height: 5.6rem;
      line-height: 5.6rem;
      margin: 0 2.4rem;
      padding: 0;
      font-family: HYQiHei-60S;
      z-index: 102;
    }
    .t-picker-content {
      margin: 0 2.4rem;
      @extend .text15;
      height: $itemHeight * $itemNum;
      display: flex;
      overflow: hidden;
      position: relative;
      transition: transform .5s;
    }
    .t-picker-item {
      flex: 1;
      text-align: center;
      position: relative;
      height: $itemHeight * $itemNum;
    }
    .t-item {
      height: $itemHeight;
      line-height: $itemHeight;
    }
    .t-activeItem {
      font-size: 1.8rem;
      color: #007dff;
    }
    .t-picker-line {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 0;
      &::before,
      &::after {
        position: absolute;
        content: "";
        width: 100%;
        left: 0;
        height: 1px;
        background: rgba(0, 0, 0, 0.2);
        z-index: 99;
        transform: scaleY(.5)
      }
      &::before {
        top: -$itemHeight / 2;
      }
      &::after {
        top: $itemHeight / 2;
      }
    }
    .unit {
      position: absolute;
      left: calc(50% + 1.2rem);
      top: 50%;
      font-size: 1.2rem;
      color: #007dff;
      transform: translateY(-50%);
    }
    .lightColor {
      color: rgba(0, 0, 0, .3)
    }
    .container-root-btn {
      padding: 1.2rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      height: 5.6rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      position: relative;
      font-size: 1.5rem;
      color: #005bba;
    }
    .root-btn-cancel,.root-btn-submit {
      height: 3.2rem;
      line-height: 3.2rem;
      position: relative;
      text-align: center;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
    .root-btn-midBox {
      width: 1.6rem;
      &:after {
        content: "";
        position: absolute;
        height: 2.4rem;
        width: 1px;
        background-color: rgba(0,0,0,.2);
        -webkit-transform: scaleX(.5);
        transform: scaleX(.5);
        left: 50%;
        top: 1.6rem;
      }
    }

  }
  li {
    list-style: none;
  }
</style>
