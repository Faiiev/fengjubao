<template>
  <section class="page-module">
    <div class="module-header">
      <h3>计件统计</h3>
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
          <h6>总计：{{this.entities.total}}</h6>

        <employee-record-list
          :pdata="entities"
          @dispatch-data="onUpunqualifiedTotalRowData"></employee-record-list>

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
        @dispatch-data="onUpdateRowData">
      </edit-dialog>
    </div>
  </section>
</template>

<script>
import EditDialog from './EditDialog'
import EmployeeRecordList from './EmployeeRecordList'
import dayjs from 'dayjs'

export default {
  name: 'StatisticsList',

  props: {
  },

  data () {
    return {
      form: {
        name: 'ss',
        employeeNo: '',
        date: [dayjs().subtract(1, 'day'), dayjs()]
      },
      entities: {
        employees: {
          byId: {
            1: {
              id: 1,
              name: '倾城之链',
              employeeNo: '111'
            },
            2: {
              id: 2,
              name: '晚晴幽草轩',
              employeeNo: '222'
            }
          },
          allIds: [1, 2]
        },
        records: {
          byId: {
            '编号1': {
              no: '编号1',
              epc: 'epc1',
              category: '品类1',
              subCategory: '种类1',
              isQualified: true,
              isRemove: true,
              reason: '',
              date: ''
            },
            '编号2': {
              no: '编号2',
              epc: 'epc2',
              category: '品类1',
              subCategory: '种类1',
              isQualified: true,
              isRemove: true,
              reason: '',
              date: ''
            },
            '编号3': {
              no: '编号3',
              epc: 'epc3',
              category: '品类2',
              subCategory: '种类1',
              isQualified: true,
              isRemove: true,
              reason: '',
              date: ''
            },
            '编号4': {
              no: '编号4',
              epc: 'epc4',
              category: '品类1',
              subCategory: '种类2',
              isQualified: true,
              isRemove: true,
              reason: '原因1',
              date: ''
            },
            '编号5': {
              no: '编号5',
              epc: 'epc4',
              category: '品类2',
              subCategory: '种类2',
              isQualified: false,
              isRemove: true,
              reason: '',
              date: ''
            }
          },
          allIds: ['编号1', '编号2', '编号3', '编号4']
        },
        employeeRecord: {
          byId: {
            '1-编号1': {
              id: '1-编号1',
              employeesId: 1,
              recordId: '编号1'
            },
            '1-编号2': {
              id: '1-编号2',
              employeesId: 1,
              recordId: '编号2'
            },
            '1-编号3': {
              id: '1-编号3',
              employeesId: 1,
              recordId: '编号3'
            },
            '2-编号4': {
              id: '2-编号4',
              employeesId: 2,
              recordId: '编号4'
            },
            '2-编号5': {
              id: '2-编号4',
              employeesId: 2,
              recordId: '编号5'
            }
          },
          allIds: ['1-编号1', '1-编号2', '1-编号3', '2-编号4', '2-编号5']
        },
        total: 100,
        currentPage: 1,
        pageSize: 3
      }
    }
  },

  components: {
    EditDialog,
    EmployeeRecordList
  },

  computed: {
    recordTotal() {
      return this.entities.records.allIds.length
    }
  },

  watch: {},

  created () {},

  mounted () {},

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

    onUpdateRowData (data) {
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
