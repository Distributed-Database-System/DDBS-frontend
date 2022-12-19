<template>
  <div>
    <el-table
      :data="tableData"
      stripe>
      <el-table-column
        prop="aid"
        label="Aid">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        min-width="100px"
        prop="timestamp"
        label="Timestamp">
      </el-table-column>
      <el-table-column
        prop="region"
        label="Region">
      </el-table-column>
      <el-table-column
        prop="category"
        label="Category">
      </el-table-column>
      <el-table-column
        prop="readTimeLength"
        label="readTimeLength">
      </el-table-column>
      <el-table-column
        prop="agreeOrNot"
        label="AgreeOrNot">
      </el-table-column>
      <el-table-column
        prop="shareOrNot"
        label="ShareOrNot">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="Comment">
      </el-table-column>
      <el-table-column
        label="Operation"
        :min-width="160">
       <template slot-scope="scope">
          <el-button @click="seeDetail(scope.row)" type="primary" size="small">See Detail</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Article Detail"
      :visible.sync="dialogVisible"
      width="70%"
      append-to-body>
      <ArticleDetail ref="detail" :detail="detail"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">Close</el-button>
      </span>
    </el-dialog>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
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
  props: ['uid'],
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      title: ''
    }
  },
  watch: {
    '$route' () {
      document.title = 'Article'
      this.tableData = []
      this.pageNo = 1
      this.pageSize = 10
      this.title = ''
      this.totalSize = 0
      this.getReadingList()
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getReadingList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getReadingList()
    },
    seeDetail (val) {
      this.dialogVisible = true
      this.$nextTick(() => {
        console.log(this.$refs.detail)
        this.$refs.detail.getArticleDetail(1, val.aid)
      })
    },
    getReadingList () {
      this.$store.dispatch('getReadingList', {
        uid: this.uid,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(res => {
        console.log()
        this.totalSize = res.data.total
        this.tableData = res.data.data
        for (var i = 0; i < this.tableData.length; i++) {
          console.log(this.tableData[i])
          console.log()
          if (this.tableData[i].commentOrNot === '1') {
            this.tableData[i].comment = res.data.data[i].commentDetail
          }
          if (this.tableData[i].shareOrNot === '1') {
            this.tableData[i].shareOrNot = 'true'
          } else {
            this.tableData[i].shareOrNot = 'false'
          }
          if (this.tableData[i].agreeOrNot === '1') {
            this.tableData[i].agreeOrNot = 'true'
          } else {
            this.tableData[i].agreeOrNot = 'false'
          }
          this.tableData[i].timestamp = this.timestampToTime(this.tableData[i].timestamp)
        }
      })
    },
    timestampToTime (timestamp) {
      var date = new Date(parseInt(timestamp))
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + ' '
      var h = (date.getHours() + 1 < 10 ? '0' + (date.getHours() + 1) : date.getHours() + 1) + ':'
      var m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1) + ':'
      var s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds() + 1) : date.getSeconds() + 1)
      return Y + M + D + h + m + s
    }
  }
}
</script>

<style lang="less">
.pagination {
  margin-top: 20px;
}

</style>
