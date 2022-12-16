<template>
  <div>
    <el-table
      :data="tableData"
      stripe>
      <el-table-column
        width="200px"
        v-if="rank"
        type="index"
        label="Rank">
      </el-table-column>
      <el-table-column
        prop="aid"
        label="Aid">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        prop="category"
        label="Category">
      </el-table-column>
      <el-table-column
        prop="articleAbstract"
        label="ArticleAbstract">
      </el-table-column>
      <el-table-column
        prop="authors"
        label="Authors">
      </el-table-column>
      <el-table-column
        label="Detail"
        :min-width="160">
       <template slot-scope="scope">
          <el-button @click="seeDetail(scope.row)" type="primary" size="small">Check</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Article Detail"
      :visible.sync="dialogVisible"
      width="70%">
      <ArticleDetail ref="detail"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">Close</el-button>
      </span>
    </el-dialog>

    <div v-if="!rank" class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-sizes="[10]"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleDetail from '../ArticleDetail.vue'
export default {
  components: { ArticleDetail },
  props: {
    rank: {
      default: false
    }
  },
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      aid: '',
      title: ''
      // totalSize: 0
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNo = val
      this.getArticleList()
    },
    seeDetail (val) {
      this.dialogVisible = true
      this.$nextTick(() => {
        console.log(this.$refs.detail)
        this.$refs.detail.getArticleDetail(1, val.aid)
      })
      // this.$store.dispatch('getArticleDetail', {
      //   uid: 1,
      //   aid: val.aid
      // }).then(res => {
      //   this.detail = res.data
      // })
    },
    search (params) {
      this.aid = params.aid
      this.title = params.title
      this.getArticleList()
    },
    getArticleList () {
      this.$store.dispatch('getArticleList', {
        aid: this.aid,
        title: this.title,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        withBody: false
      }).then(res => {
        this.tableData = res.data.data
        this.totalSize = res.data.total
      })
    },
    getRank (type, timestamp) {
      this.$store.dispatch('getRank', {
        type: type,
        timestamp: timestamp
      }).then(res => {
        console.log(res)
        this.tableData = res.data
        this.totalSize = res.data.length
      })
    }
  }
}
</script>

<style lang="less">
.pagination {
  margin-top: 20px;
}

</style>
