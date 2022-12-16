<template>
  <div class="search-header">
    <div class="search-header-row">
    <div class="search-header-item">
      <el-date-picker
        v-model="selectTime"
        align="right"
        type="week"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div class="search-header-item">
      <el-button type="primary" @click="onSubmit">Query</el-button>
      <el-button type="primary" @click="clear">Clear</el-button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchHeader',
  data () {
    return {
      selectTime: new Date('2017/9/25 00:00:00'),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: 'Today',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: 'History',
          onClick (picker) {
            const date = new Date('2017/9/25 00:00:00')
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  watch: {
    '$route' () {
      this.aid = ''
      this.title = ''
    }
  },
  methods: {
    onSubmit () {
      this.$emit('search', {
        timestamp: this.selectTime.getTime()
      })
    },
    clear () {
      this.onSubmit()
    }
  }
}
</script>

<style lang="less" scoped>
.search-header {
  background-color: #B3C0D1;
  color: #333;
  width: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: column;
  height: 100%;
  &-row {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-item {
    width: 100%;
    &--bigger {
      width: 65%;
      .el-date-editor {
        width: 100%;
      }
    }
  }
}
</style>
