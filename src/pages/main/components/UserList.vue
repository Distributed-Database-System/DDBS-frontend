<template>
  <div>
    <el-table
      :data="tableData"
      stripe>
      <el-table-column
        prop="uid"
        label="Uid">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="Gender">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="Dept">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="Grade">
      </el-table-column>
      <el-table-column
        prop="region"
        label="Region">
      </el-table-column>
      <el-table-column
        prop="role"
        label="Role">
      </el-table-column>
      <el-table-column
        prop="preferTags"
        label="PreferTags">
      </el-table-column>
      <el-table-column
        label="Operation"
        :min-width="240">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.row)" type="primary" size="small">See Detail</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="ReadingList"
      :visible.sync="dialogVisible"
      width="80%"
      @open="loadReadingList">
      <ReadingList ref="readingList" :uid="selectUid"/>
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
import ReadingList from './ReadingList.vue'
export default {
  components: { ReadingList },
  props: {
    status: {
      default: 'PUBLIC'
    }
  },
  data () {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      uid: '',
      name: '',
      selectUid: 0,
      totalSize: 0,
      dialogVisible: false
    }
  },
  created () {
    this.getUserList()
  },
  watch: {
    '$route' () {
      document.title = 'User'
      this.tableData = []
      this.pageNo = 1
      this.pageSize = 10
      this.uid = ''
      this.name = ''
      this.totalSize = 0
      this.getUserList()
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getUserList()
    },
    seeDetail (val) {
      this.dialogVisible = true
      this.selectUid = val.uid
    },
    search (params) {
      this.uid = params.uid
      this.name = params.name
      this.getUserList()
    },
    loadReadingList () {
      this.$nextTick(() => {
        console.log(this.$refs.readingList)
        this.$refs.readingList.getReadingList()
      })
    },
    getUserList () {
      this.$store.dispatch('getUserList', {
        uid: this.uid,
        name: this.name,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        withBody: false
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
