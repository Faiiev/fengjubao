<template>
  <section class="page-module">
    <div class="module-header">
      <h3>员工管理</h3>
    </div>
    <div class="module-content">
      <div class="panel panel-default">
        <div class="panel-body">
          <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
             <el-form-item label="员工ID">
              <el-input v-model="form.id" placeholder="输入员工ID"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名">
              <el-input v-model="form.name" placeholder="输入员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="员工编号">
              <el-input v-model="form.no" placeholder="输入员工编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <h6>总计：{{total}}</h6>
          <el-table :data="tableData" border stripe highlight-current-row>
            <el-table-column prop="employeeID" :label="$t('employeeID')"></el-table-column>
            <el-table-column prop="employeeName" :label="$t('employeeName')">
              <template slot-scope="scope">
                <a :href="'employee/'+scope.row.name"
                  target="_blank" rel="noreferrer noopener">
                  {{ scope.row.name }}
                </a>
              </template>
            </el-table-column>
            <el-table-column prop="employeeNo" :label="$t('employeeNo')">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.employeeNo" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
                <span>{{scope.row.employeeNo}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('edit')">
              <template slot-scope="scope">
                <div class="operation-area">
                  <el-button type="primary" size="medium" @click="onEditClick(scope.row, scope.$index)">
                    {{ $t('edit') }}
                  </el-button>

                  <div v-if="scope.row.isEnable">
                    <el-button type="danger" size="medium" @click="onDisableClick(scope.row, scope.$index)">
                      {{ $t('disable') }}
                    </el-button>
                  </div>
                  <div v-else>
                    <el-button type="warning" size="medium" @click="onDisableClick(scope.row, scope.$index)">
                      {{ $t('enable') }}
                    </el-button>
                  </div>
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

export default {
  name: 'EmployeeList',

  props: {
  },

  data () {
    return {
      form: {
        id: '',
        name: '',
        no: '',
        employeeNo: '',
        date: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      tableData: [{
        employeeID: 'ID111',
        name: '倾城之链',
        employeeNo: '111',
        entryTotal: '22',
        category: '11',
        subCategory: '11',
        unqualifiedTotal: '1',
        isEnable: true
      },
      {
        employeeID: 'ID222',
        name: '晚晴幽草轩',
        employeeNo: '222',
        entryTotal: '44',
        category: '22',
        subCategory: '22',
        unqualifiedTotal: '2',
        isEnable: false
      },
      {
        employeeID: 'ID333',
        name: '静晴轩别苑',
        employeeNo: '333',
        entryTotal: '44',
        category: '33',
        subCategory: '11',
        unqualifiedTotal: '3',
        isEnable: false
      },
      {
        employeeID: 'ID333',
        name: '天意人间舫',
        employeeNo: '444',
        entryTotal: '88',
        category: '44',
        subCategory: '44',
        unqualifiedTotal: '4',
        isEnable: false
      },
      {
        employeeID: 'ID444',
        name: 'Vue-Cli3 实践参考',
        employeeNo: '555',
        entryTotal: '110',
        category: '55',
        subCategory: '55',
        unqualifiedTotal: '5',
        isEnable: false
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

    // 更改页幅回调函数
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },

    // 弹出框编辑完成回调函数
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
    onDisableClick(rowData, index) {
      console.log(rowData)
    },

    // 搜索
    onSubmit() {
      console.log('submit!')
    },

    // 编辑行
    handleEdit(index, row) {
      console.log(index, row)
    }
  },

  locales: {
    en: {
      employeeID: 'Employee ID',
      employeeName: 'Employee Name',
      employeeNo: 'Employee No',
      entryTotal: 'Entry Total',
      category: 'Category',
      subCategory: 'Sub Category',
      unqualifiedTotal: 'Unqualified Total',
      edit: 'Edit',
      disable: 'disable',
      enable: 'enable'
    },
    zh: {
      employeeID: '员工ID',
      employeeName: '员工姓名',
      employeeNo: '员工编号',
      entryTotal: '录入数量',
      category: '品类',
      subCategory: '种类',
      unqualifiedTotal: '不合格数量',
      edit: '编辑',
      disable: '禁用帐号',
      enable: '启用帐号'
    }
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.module-content {
  .table-operate {
    margin-top: 15px;
  }
  .operation-area {
    @include flex-box-center(row);
  }

  .el-table {
    .el-input {
      display: none
    }

    .current-row {
      .el-input {
        display: block
      }
      .el-input + span {
        display: none
      }
    }

    .operation-area {
      button:first-child + div {
        margin-left: 10px
      }
    }
  }
}
</style>
