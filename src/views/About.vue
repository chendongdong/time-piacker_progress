<template>
  <div class="home">
    <div style="padding: 10px;font-size: 1.6rem" @click="showTimePicker=true">{{timeText}}</div>
    <time-pick v-show="showTimePicker" title="开始时间" @cancel="showTimePicker=false"
               @submit="submitTimePicker" :default-item="startTime" :param-data="timerParam"></time-pick>
  </div>
</template>

<script>
  // @ is an alias to /src
  import TimePick from '@/components/TimePick.vue'

  export default {
    name: 'home',
    components: {
      TimePick
    },
    data() {
      return {
        showTimePicker: false,
        timeText: '选择时间组件',
        startTime: [6, 30],
        timerParam: [
          {
            step: 1,
            unit: '时',
            rangeStart: 0,
            rangeEnd: 24,
            len: '',
          },
          {
            step: 1,
            unit: '分',
            rangeStart: 0,
            rangeEnd: 60,
            len: 2
          }
        ]
      }
    },
    methods: {
      submitTimePicker(param) {
        console.log('param=', param)
        this.showTimePicker = false
        this.timeText = '选择时间：' + param[0] + ':' + param[1]
      }
    }
  }
</script>
