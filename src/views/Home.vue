<template>
  <div class="home">
    <v-progress :gearNum="7" :selectGear="3" style="margin: 30px"></v-progress>
    <div>
      <div style="margin-top: 50px;padding: 10px;font-size: 1.2rem" @click="showEndTimePicker=true">{{timeText}}</div>
    </div>
    <time-pick v-show="showEndTimePicker" title="开始时间" @cancel="showEndTimePicker=false"
                  @submit="submitEndTimePick" :default-item="startTime" :param-data="timerParam"></time-pick>
  </div>
</template>

<script>
// @ is an alias to /src
import VProgress from '@/components/Progress.vue'
import TimePick from '@/components/TimePick.vue'

export default {
  name: 'home',
  components: {
    VProgress, TimePick
  },
  data() {
      return {
        showEndTimePicker: false,
        timeText: '选择时间组件',
        startTime: [0, 0],
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
    submitEndTimePick(param) {
        console.log('param=', param)
    }
  }
}
</script>
