<template>
  <el-dialog title="编辑列表" :visible.sync="isVisible" @close="onClose" class="edit-dialog">
    <el-form :model="fillForm" :rules="rules" ref="fillForm">
      <div class="form-group col-sm-12">
        <el-form-item :label="$t('employeeName')" prop="employeeName">
          <el-input v-model="fillForm.name"></el-input>
        </el-form-item>
      </div>

      <div class="form-group col-sm-12">
        <el-form-item :label="$t('employeeNo')" prop="employeeNo">
          <el-input v-model="fillForm.employeeNo"></el-input>
        </el-form-item>
      </div>

      <div class="form-group col-sm-12">
        <el-form-item :label="$t('entryTotal')" prop="entryTotal">
          <el-input v-model="fillForm.entryTotal"></el-input>
        </el-form-item>
      </div>

      <div class="form-group col-sm-12">
        <el-form-item :label="$t('category')" prop="category">
          <el-input v-model="fillForm.category"></el-input>
        </el-form-item>
      </div>

      <div class="form-group col-sm-12">
        <el-form-item :label="$t('subCategory')" prop="subCategory">
          <el-input v-model="fillForm.subCategory"></el-input>
        </el-form-item>
      </div>

      <div class="form-group col-sm-12">
        <el-form-item :label="$t('unqualifiedTotal')" prop="unqualifiedTotal">
          <el-input v-model="fillForm.unqualifiedTotal"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false"> {{$t('cancel')}}</el-button>
      <el-button type="primary" @click="onSureClick"> {{$t('confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default{
  name: 'EditDialog',

  data () {
    return {
      isVisible: false,
      fillForm: {
        name: '',
        employeeNo: '',
        entryTotal: '',
        category: '',
        subCategory: '',
        unqualifiedTotal: ''
      },
      rules: {}
    }
  },

  computed: {},

  created () {},

  mounted () {},

  props: {
    value: {
      type: Boolean,
      required: true
    },
    pdata: {
      type: Object,
      default: {}
    }
  },

  watch: {
    value (newVal) {
      this.isVisible = newVal
      this.fillForm = JSON.parse(JSON.stringify(this.pdata))
    }
  },

  methods: {
    onClose () {
      this.isVisible = false
      this.$emit('input', this.isVisible)
    },

    /* ----------------------------On Click Event---------------------------- */
    onSureClick () {
      this.$refs.fillForm.validate(valid => {
        if (!valid) return
        this.$emit('dispatch-data', JSON.parse(JSON.stringify(this.fillForm)))
        this.isVisible = false
      })
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

<style type="text/css" lang="scss">
.edit-dialog{
  .el-form-item__label, .el-form-item__content{
    display: inline-block;
  }
  .el-form-item__label{
    width: 30%;
  }
  .el-input{
    width: 100%;
    min-width: 260px;
  }
  .el-dialog--tiny{
    min-width: 300px;
  }
}
</style>
