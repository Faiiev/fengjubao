<template>
  <section class="page-module">
    <div class="module-header">
      <h3>帐号管理</h3>
    </div>
    <div class="module-content">
      <!-- 发卡app帐号设置 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发卡app帐号</span>
        </div>
        <el-form :model="issueAppAcountForm" :rules="rules" ref="issueAppAcountForm" label-width="100px" class="account-editForm">
          <h6></h6>
          <el-form-item label="帐号" prop="name">
            <el-input v-model="issueAppAcount.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="issueAppAcount.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('issueAppAcountForm')">修改</el-button>
            <!-- <el-button @click="resetForm('issueAppAcountForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 读卡app帐号设置 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>读卡app帐号设置</span>
        </div>
        <el-form :model="readAppAcountForm" :rules="rules" ref="readAppAcountForm" label-width="100px" class="account-editForm">
          <h6></h6>
          <el-form-item label="帐号" prop="name">
            <el-input v-model="readAppAcount.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="readAppAcount.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('readAppAcountForm')">修改</el-button>
            <!-- <el-button @click="resetForm('readAppAcountForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 质检App帐号设置 -->  
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>质检App帐号设置</span>
        </div>
        <el-form :model="inspectionAppAcountForm" :rules="rules" ref="inspectionAppAcountForm" label-width="100px" class="account-editForm">
          <h6></h6>
          <el-form-item label="帐号" prop="name">
            <el-input v-model="inspectionAppAcount.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="inspectionAppAcount.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('inspectionAppAcountForm')">修改</el-button>
            <!-- <el-button @click="resetForm('inspectionAppAcountForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </section>
</template>

<script>

export default {
  name: 'AccountList',

  props: {
  },

  data () {
    return {
      issueAppAcount: {
        name: '',
        passowrd: ''
      },
      readAppAcount: {
        name: '',
        password: ''
      },
      inspectionAppAcount: {
        name: '',
        password: ''
      },

      rules: {
        // name: [
        //   { required: true, message: '请输入帐号', trigger: 'blur' },
        //   { min: 3, message: '长度最小 6 个字符', trigger: 'blur' }
        // ],
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { min: 6, message: '长度最小 6 个字符', trigger: 'blur' }
        // ]
      }
    }
  },

  components: {
  },

  computed: {},

  watch: {},

  created () {
  },

  mounted () {
  },

  filters: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },

  locales: {
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';
.box-card {
 margin-bottom: 20px;
}
</style>
