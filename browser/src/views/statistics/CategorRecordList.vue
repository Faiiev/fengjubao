<template>
  <el-table :data="tableData" border stripe highlight-current-row>
    <el-table-column prop="employeeName" :label="$t('employeeName')">
      <template slot-scope="scope">
        <a :href="'employee/'+scope.row.name"
          target="_blank" rel="noreferrer noopener">
          {{ scope.row.name }}
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
</template>


<script>
export default {
  name: 'CategoryCheckList',

  props: {
    value: {
      type: Boolean,
      required: true
    },
    pdata: {
      type: Object,
      default: {}
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
