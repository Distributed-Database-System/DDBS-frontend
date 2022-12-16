<template>
  <el-container class="ArticleList-container">
    <el-header height="120px" v-show="showHeader">
      <DailySearchHeader v-if="this.$route.params.type=='daily'" @search="onSearch"/>
      <WeeklySearchHeader v-if="this.$route.params.type=='weekly'" @search="onSearch"/>
      <MonthlySearchHeader v-if="this.$route.params.type=='monthly'" @search="onSearch"/>
    </el-header>
    <el-main>
      <div class="header-show-switch" @click="showHeader=!showHeader" :style="{top: showHeader? '120px' : '0'}">
        <el-tooltip class="item" effect="dark" :content="showHeader?'隐藏过滤器':'展开过滤器'">
          <i class="el-icon-more" style="position: relative; top: -20px;"/>
        </el-tooltip>
      </div>
      <ArticleList ref="ArticleList" :pageable="false"/>
    </el-main>
  </el-container>
</template>

<script>
import DailySearchHeader from './components/DailySearchHeader.vue'
import WeeklySearchHeader from './components/WeeklySearchHeader.vue'
import MonthlySearchHeader from './components/MonthlySearchHeader.vue'
import ArticleList from './components/ArticleList.vue'
export default {
  components: { DailySearchHeader, WeeklySearchHeader, MonthlySearchHeader, ArticleList },
  data () {
    return {
      showHeader: true
    }
  },
  watch: {
    '$route' () {
      this.$refs.ArticleList.getRank(this.$route.params.type, new Date().getTime())
    }
  },
  mounted () {
    this.$refs.ArticleList.getRank(this.$route.params.type, new Date().getTime())
  },
  methods: {
    onSearch (timestamp) {
      console.log(this.$route.params)
      this.$refs.ArticleList.getRank(this.$route.params.type, timestamp.timestamp)
    }
  }
}
</script>

<style lang="less" scoped>
.ArticleList-container {
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
