<template>
  <div class="slide">
    <div class="slide-bcg">
      <div class="slide-progress" :style="{width: progress + 'px'}"></div>
      <div class="click-slide" @click="clickThumb($event)"></div>
      <div class="thumb" :style="{'transition': isMove?'none':'transform 1s', left: progress + 'px'}"></div>
      <div class="thumb-touch" :style="{left: progress + 'px'}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></div>
    </div>
    <div class="gear-container" v-for="g in gearNum" :key="g" :style="{left: (g - 1)*gearDistance + 'px'}" @click="clickGear(g - 1)">
      <div class="gear-dot"></div>
      <div class="gear-text"> {{g}}档</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['gearNum', 'selectGear'],
    data() {
      return {
        bcgWidth: 0,
        gearDistance: 0,
        progress: 0,
        startX: 0,
        endX: 0,
        isMove: false
      }
    },
    watch: {
      selectGear(val) {
        this.progress = (val - 1) * this.gearDistance
      }
    },
    methods: {
      touchStart(e) {
        console.log('touchStart---', e)
        this.isMove = true
        this.startX = e.touches[0].clientX
      },
      touchMove(e) {
        let transDistanceX =  e.touches[0].clientX - this.startX
        this.startX = e.touches[0].clientX
        console.log('transDistanceX=', transDistanceX)
        if (this.progress + transDistanceX < 0) {
          this.progress = 0
        } else if (this.progress + transDistanceX > this.bcgWidth) {
          this.progress = this.bcgWidth
        } else {
          this.progress += transDistanceX
        }
      },
      touchEnd(e) {
        this.isMove = false
        this.progress = Math.round(this.progress / this.gearDistance) * this.gearDistance
        console.log('progress=', this.progress)
      },
      clickThumb(e) {
        console.log('clickThumb---e=', e)
        // offsetX 距离父元素X方向的距离
        let offsetX = e.offsetX
        console.log('offsetX=', offsetX)
        this.progress = Math.round(offsetX / this.gearDistance) * this.gearDistance
      },
      clickGear(index) {
        this.progress = index * this.gearDistance
      }
    },
    mounted() {
      this.$nextTick(function(){
        let bcgEle = document.querySelector('.slide-bcg')
        this.bcgWidth = window.getComputedStyle(bcgEle).width.split('px')[0]
        console.log('bcgWidth==', this.bcgWidth)
        console.log('gearNum==', this.gearNum)
        this.gearDistance = Number.parseFloat(this.bcgWidth) / (this.gearNum - 1)
        console.log('gearDistance==', this.gearDistance)
        this.progress = (this.selectGear - 1) * this.gearDistance
      })
    }
  }
</script>
<style lang="scss">
  .slide{
    position: relative;
    $gearHeight: 3px;
    $thumbHeight: 10px;
    &::after{
      clear: both;
      height: 0;
      width: 0;
      content: '';
      overflow: hidden;
      display: block;
    }
    .slide-bcg{
      height: $gearHeight;
      border-radius: $gearHeight / 2;
      background: rgba(0, 0, 0, 0.1);
      position: relative;
      &::after{
        clear: both;
        height: 0;
        width: 0;
        content: '';
        overflow: hidden;
        display: block;
      }
    }
    .click-slide{
      width: 100%;
      height: $gearHeight;
      padding: 10px 0;
      position: absolute;
      background: transparent;
      top: -10px;
      z-index: 5;
    }
    .slide-progress{
      height: $gearHeight;
      background: #007DFF;
    }
    .thumb{
      position: absolute;
      z-index: 9;
      top: 50%;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #f7f7f7;
      border: 1px solid rgba(0, 0, 0, 0.3);
      transform: translate(-50%, -50%);
    }
    .thumb-touch{
      position: absolute;
      z-index: 11;
      top: 50%;
      width: 20px;
      height: 20px;
      background: transparent;
      transform: translate(-50%, -50%);
    }
    .gear-container{
      position: absolute;
      transform: translateX(-50%);
      top: 0;
      text-align: center;
      z-index: 10;
      &::after{
        clear: both;
        height: 0;
        width: 0;
        content: '';
        overflow: hidden;
        display: block;
      }
      .gear-dot{
        border-radius: $gearHeight / 2;
        width: $gearHeight;
        height: $gearHeight;
        background: #666;
        margin: 0 auto;
        // position: relative;
      }
      .gear-text{
        // display: inline-block;
        margin-top: 8px;
        white-space: nowrap;
        // min-width: 20px;
        // position: relative
      }
      /*&:after{*/
        /*width: 0;*/
        /*height: 0;*/
        /*content: '';*/
        /*overflow: hidden;*/
        /*clear: both;*/
        /*display: block;*/
      /*}*/
    }
  }
</style>
