<template>
  <section class="page-module">
    <div class="module-header">
      <h3>还领卡记录</h3>
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
            <el-table-column prop="employeeName" :label="$t('employeeName')"></el-table-column>
            <el-table-column prop="employeeNo" :label="$t('employeeNo')"></el-table-column>
            <el-table-column prop="collarCardTotal" :label="$t('collarCardTotal')"></el-table-column>
            <el-table-column prop="returnCardTotal" :label="$t('returnCardTotal')"></el-table-column>

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
        @dispatch-data="onUpdateRowData">
      </edit-dialog>
    </div>
  </section>
</template>

<script>
import EditDialog from './EditDialog'
import dayjs from 'dayjs'

export default {
  name: 'ReturnAndCollarRecordList',

  props: {
  },

  data () {
    return {
      form: {
        name: 'ss',
        employeeNo: '',
        date: [dayjs().subtract(1, 'day'), dayjs()]
      },
      isDialogVisible: false, // 控制弹出框状态(必须声明)
      tableData: [
        {
          id: 'ID111',
          employeeNo: '第一剑客',
          employeeName: '葛聂',
          collarCardTotal: '300',
          returnCardTotal: '260'
        },
        {
          id: 'ID222',
          employeeNo: '流沙掌门',
          employeeName: '卫庄',
          collarCardTotal: '300',
          returnCardTotal: '300'
        },
        {
          id: 'ID333',
          employeeNo: '希望之星',
          employeeName: '韩非',
          collarCardTotal: '200',
          returnCardTotal: '70'
        },
        {
          id: 'ID444',
          employeeNo: '素衣公子',
          employeeName: '张良',
          collarCardTotal: '310',
          returnCardTotal: '100'
        },
        {
          id: 'ID555',
          employeeNo: '赤炼红颜',
          employeeName: '红莲',
          collarCardTotal: '300',
          returnCardTotal: '80'
        },
        {
          id: 'ID666',
          employeeNo: '琴棋书画',
          employeeName: '弄玉',
          collarCardTotal: '360',
          returnCardTotal: '200'
        }
      ]
    }
  },

  components: {
    EditDialog
  },

  computed: {
    // collarCardTotal() {
    //   return this.tableData.reduce((accumulator, currentValue) => {
    //     accumulator + currentValue.collarCardTotal
    //   })
    // },
    // returnCardTotal() {
    //   return this.tableData.reduce((accumulator, currentValue) => {
    //     accumulator + currentValue.returnCardTotal
    //   })
    // }
  },

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
      collarCardTotal: 'collar Card Total',
      returnCardTotal: 'return Card Total',
      edit: 'Edit'
    },
    zh: {
      employeeName: '员工姓名',
      employeeNo: '员工编号',
      collarCardTotal: '领卡数量',
      returnCardTotal: '还卡数量',
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
