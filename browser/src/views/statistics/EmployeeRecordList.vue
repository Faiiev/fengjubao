<template>
  <div>
    <ul id="example-1">
      <li v-for="(employeeId, index) in pdata.employees.allIds" :key="`employeeId-${index}`">
        <div>
          <span>姓名 {{ name(employeeId) }}</span>
          <span>编号 {{ employeeNo(employeeId) }}</span>
          <span>录入数量 {{ recordTotalByEmployeeId(employeeId) }}</span>
          <hr>
        </div>
        <div v-for="(records, recordsIndex) in recordGroupByCategrory(employeeId)" :key="`records-${recordsIndex}`">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>品类 {{ records[0].category }}</span>
              <span>种类 {{ records[0].subCategory }}</span>
              <span>合格数量 {{ qualifiedNum(records).qualifiedNum }}</span>
              <span>不合格数量 {{ qualifiedNum(records).unqualifiedNum }}</span>
            </div>
            <el-table :data="records" border stripe highlight-current-row>
              <el-table-column prop="no" :label="$t('no')"></el-table-column>
              <el-table-column prop="epc" :label="$t('epc')"></el-table-column>
              <el-table-column :label="$t('status')">
                <template slot-scope="scope">
                <span :class="{red: !scope.row.isQualified }">
                  {{ scope.row.isQualified ? '合格' : '不合格' }}
                </span>
                </template>
              </el-table-column>
              <el-table-column prop="reason" :label="$t('reason')">
                <template slot-scope="scope">
                  <el-select
                    v-show="!scope.row.isQualified"
                    v-model="scope.row.reason"
                    @change="changeReason(scope.row)"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请输入原因标签">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column :label="编辑">
                <template slot-scope="scope">
                  <div class="operation-area">
                     <el-button type="danger" size="medium" @click="onDeleteClick(employeeId, scope.row, scope.$index)">
                      {{ $t('delete') }}
                    </el-button>
                    <el-button type="primary" size="medium" @click="onQualifiedClick(scope.row, scope.$index)">
                      {{ scope.row.isQualified ? $t('changeToUnqualified') : $t('changeToQualified')}}
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </li>
    </ul>
    <el-divider></el-divider>

  </div>
</template>

<script>
import { $utils } from '@helper'
// import CategorRecordList.vue from './CategorRecordList.vue'
export default {
  data () {
    return {
      entities: {},

      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      value: []
    }
  },

  props: {
    pdata: {
      type: Object,
      default: {}
    }
  },

  computed: {
    name() {
      return function(employeeId) {
        return this.pdata.employees.byId[employeeId].name
      }
    },
    employeeNo() {
      return function(employeeId) {
        return this.pdata.employees.byId[employeeId].employeeNo
      }
    },
    recordTotalByEmployeeId() {
      return function(employeeId) {
        return this.findRecordByEmployeeId(employeeId).length
      }
    },
    qualifiedNum() {
      return function(records) {
        var checkNum = {
          qualifiedNum: 0,
          unqualifiedNum: 0
        }

        records.forEach(record => {
          if (record.isQualified) {
            checkNum.qualifiedNum += 1
          } else {
            checkNum.unqualifiedNum += 1
          }
        })
        return checkNum
      }
    }
  },

  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    }
    // qualifiedNum() {
    //   console.log('合格数变化了')
    // }

  },

  methods: {
    findRecordByEmployeeId(employeeId) {
      var employeeRecordIds = []
      this.pdata.employeeRecord.allIds.forEach(id => {
        if (employeeId === this.pdata.employeeRecord.byId[id].employeesId) {
          employeeRecordIds.push(this.pdata.employeeRecord.byId[id].recordId)
        }
      })

      var records = []
      employeeRecordIds.forEach(id => {
        records.push(this.pdata.records.byId[id])
      })
      return records
    },
    recordGroupByCategrory(employeeId) {
      var records = this.findRecordByEmployeeId(employeeId)
      var groupByCategrory = $utils.groupBy(records, function(rd) {
        return [rd.category, rd.subCategory]
      })

      return groupByCategrory
    },

    onDeleteClick(employeeId, row, index) {
      var recordIdsIndex = this.pdata.records.allIds.indexOf(row.no)
      if (recordIdsIndex > -1) {
        this.pdata.records.allIds.splice(recordIdsIndex, 1)
      }
      var employeeRecordIdsIndex = this.pdata.employeeRecord.allIds.indexOf(`${employeeId}-${row.no}`)
      if (employeeRecordIdsIndex > -1) {
        this.pdata.employeeRecord.allIds.splice(employeeRecordIdsIndex, 1)
      }
      this.$delete(this.pdata.employeeRecord.byId, `${employeeId}-${row.no}`)
    },
    onQualifiedClick(row, index) {
      this.pdata.records.byId[row.no].isQualified = !this.pdata.records.byId[row.no].isQualified
    },
    changeReason(row) {
      console.log(row)
    }
  },
  locales: {
    en: {
      no: 'NO',
      epc: 'ECP',
      status: 'status',
      reason: 'reason',
      delete: 'delete',
      changeToQualified: 'Change to qualified',
      changeToUnqualified: 'Changed to unqualified'
    },
    zh: {
      no: '编号',
      epc: 'ECP',
      status: '状态',
      reason: '原因',
      delete: '删除',
      changeToQualified: '改为合格',
      changeToUnqualified: '改为不合格'
    }
  }
}
</script>

<style lang="scss">
  @import './../../assets/scss/variables.scss';
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-bottom: 20px;
  }

  .red {
    color: $red
  }
</style>
