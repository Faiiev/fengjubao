<template>
  <section class="page-module">
    <div class="module-header">
      <h3>数据分析</h3>
    </div>
    <div class="module-content">
      <div class="panel panel-default">
        <div class="panel-body">
          <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="form.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="员工编号">
              <el-input v-model="form.employeeNo" placeholder="输入员工编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <h6>总计：{{total}}</h6>
          <el-table :data="tableData" border stripe highlight-current-row>
            <el-table-column prop="employeeName" :label="$t('employeeName')">
              <template slot-scope="scope">
                <a :href="'employee/'+scope.row.employeeName"
                  target="_blank" rel="noreferrer noopener">
                  {{ scope.row.employeeName }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="employeeNo" :label="$t('employeeNo')"></el-table-column>
            <el-table-column prop="entryTotal" :label="$t('entryTotal')"></el-table-column>
            <el-table-column prop="category" :label="$t('category')" sortable></el-table-column>
            <el-table-column prop="subCategory" :label="$t('subCategory')" sortable></el-table-column>
            <el-table-column prop="unqualifiedTotal" :label="$t('unqualifiedTotal')"></el-table-column>
            <el-table-column :label="$t('edit')">
              <template slot-scope="scope">
                <div class="operation-area">
                  <el-button type="primary" size="medium" @click="onEditClick(scope.row, scope.$index)">
                    {{ $t('edit') }}
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-operate">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 50, 100]"
              :page-size="20" layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <edit-dialog
        :pdata="currentRowData"
        v-model="isDialogVisible"
        @dispatch-data="onUpunqualifiedTotalRowData">
      </edit-dialog>
    </div>
  </section>
</template>

<script>
import EditDialog from './EditDialog'
import dayjs from 'dayjs'

export default {
  name: 'AnalysisList',

  props: {
  },

  data () {
    return {
      form: {
        employeeName: 'ss',
        employeeNo: '',
        date: [dayjs().subtract(1, 'day'), dayjs()]
      },
      tableData: [{
        employeeName: '倾城之链',
        employeeNo: '111',
        entryTotal: '22',
        category: '11',
        subCategory: '11',
        unqualifiedTotal: '1'
      },
      {
        employeeName: '晚晴幽草轩',
        employeeNo: '222',
        entryTotal: '44',
        category: '22',
        subCategory: '22',
        unqualifiedTotal: '2'
      },
      {
        employeeName: '静晴轩别苑',
        employeeNo: '333',
        entryTotal: '44',
        category: '33',
        subCategory: '11',
        unqualifiedTotal: '3'
      },
      {
        employeeName: '天意人间舫',
        employeeNo: '444',
        entryTotal: '88',
        category: '44',
        subCategory: '44',
        unqualifiedTotal: '4'
      },
      {
        employeeName: 'Vue-Cli3 实践参考',
        employeeNo: '555',
        entryTotal: '110',
        category: '55',
        subCategory: '55',
        unqualifiedTotal: '5'
      }],
      isDialogVisible: false,
      currentPage: 1,
      pageSize: 20,
      currentRowData: {},
      currentRowIndex: -1,
      total: 40
    }
  },

  components: {
    EditDialog
  },

  computed: {},

  watch: {},

  created () {
  },

  mounted () {
  },

  filters: {},

  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$set('pageSize', val)
    },

    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },

    onUpunqualifiedTotalRowData (data) {
      this.currentRowData = data
      this.$set(this.tableData, this.currentRowIndex, data)
    },

    /* ----------------------------On Click Event---------------------------- */
    onEditClick (rowData, index) {
      this.currentRowData = rowData
      this.currentRowIndex = index
      this.isDialogVisible = true
    },
    onSubmit() {
      console.log('submit!')
    }
  },

  locales: {
    en: {
      employeeName: 'Employee Name',
      employeeNo: 'Employee No',
      entryTotal: 'Entry Total',
      category: 'Category',
      subCategory: 'Sub Category',
      unqualifiedTotal: 'Unqualified Total',
      edit: 'Edit'
    },
    zh: {
      employeeName: '员工姓名',
      employeeNo: '员工编号',
      entryTotal: '录入数量',
      category: '品类',
      subCategory: '种类',
      unqualifiedTotal: '不合格数量',
      edit: '编辑'
    }
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.module-content{
  .table-operate{
    margin-top: 15px;
  }
  .operation-area{
    @include flex-box-center(row);
  }

  .heart {
    content: "";
    display: block;
    width: 20px;
    min-height: 16px;
    position: relative;
    transform-origin: 50% 50% 0;
  }
  .heart:before {
    content: "";
    display: block;
    width: 10px;
    height: 16px;
    position: absolute;
    top: 0;
    left: 10px;
    border-radius: 10px 10px 0 0;
    background: #f05b72;
    transform: rotateZ(-45deg);
    transform-origin: 0 100% 0;
  }
  .heart:after {
    content: "";
    display: block;
    width: 10px;
    height: 16px;
    position: absolute;
    top: 0; left: 0;
    border-radius: 10px 10px 0 0;
    background: #f05b72;
    transform: rotateZ(45deg);
    transform-origin: 100% 100% 0;
  }
  .heart-link{
    display: inline-block;
    margin-left: 15px;
    padding: 10px 20px;
    border-radius: 4px;
    background-color: $brand;
    vertical-align: top;
  }
}
</style>
