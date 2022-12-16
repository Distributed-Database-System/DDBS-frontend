<template>
  <div class="search-header">
    <div class="search-header-row">
    <div class="search-header-item"><el-input v-model="aid" placeholder="Aid"></el-input></div>
    <div class="search-header-item"><el-input v-model="title" placeholder="Title"></el-input></div>
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
      aid: '',
      title: ''
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
        aid: this.aid,
        title: this.title
      })
    },
    clear () {
      this.aid = ''
      this.title = ''
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
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-item {
    width: 30%;
    &--bigger {
      width: 65%;
      .el-date-editor {
        width: 100%;
      }
    }
  }
}
</style>
