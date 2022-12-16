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
        prop="comment"
        label="comment">
      </el-table-column>
      <el-table-column
        prop="AgreeOrNot"
        label="agreeOrNot">
      </el-table-column>
      <el-table-column
        prop="ShareOrNot"
        label="shareOrNot">
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
        :page-sizes="[10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
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
      title: '',
      detail: {}
    }
  },
  created () {
    this.getUserList()
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
      this.$store.dispatch('getArticleDetail', {
        uid: 1,
        aid: val.aid
      }).then(res => {
        this.detail = res.data
      })
      // this.$refs.detail.getArticleDetail(val.aid, 1)
      // this.$router.push({
      //   name: 'ArticleDetail',
      //   params: {
      //     id: val.aid
      //   }
      // })
    },
    getReadingList () {
      this.$store.dispatch('getReadingList', {
        uid: this.uid,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(res => {
        this.tableData = res.data.data
        this.totalSize = res.data.total
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
