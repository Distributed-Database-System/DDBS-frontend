<template>
  <el-container class="UserList-container">
    <el-header height="120px" v-show="showHeader">
      <UserSearchHeader @search="onSearch"/>
    </el-header>

    <el-main>
      <div class="header-show-switch" @click="showHeader=!showHeader" :style="{top: showHeader? '120px' : '0'}">
        <el-tooltip class="item" effect="dark" :content="showHeader?'隐藏过滤器':'展开过滤器'">
          <i class="el-icon-more" style="position: relative; top: -20px;"/>
        </el-tooltip>
      </div>
      <UserList ref="UserList"/>
    </el-main>

  </el-container>
</template>

<script>
import UserSearchHeader from './components/UserSearchHeader.vue'
import UserList from './components/UserList.vue'
export default {
  components: { UserSearchHeader, UserList },
  data () {
    return {
      showHeader: true
    }
  },
  methods: {
    onSearch (params) {
      this.$refs.UserList.search(params)
    }
  }
}
</script>

<style lang="less" scoped>
.UserList-container {
  height: 100%;
  flex: 1 0 900px;
  background-color: #dddddd;
  position: relative;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

.header-show-switch {
  left: calc(50% - 30px);
  position: absolute;
  margin-top: 0;
  border-width: 15px;
  border-style: solid;
  cursor: pointer;
  border-color: #00000015 transparent transparent transparent;
  &:hover {
    border-color: #00000025 transparent transparent transparent;
  }
}
</style>
