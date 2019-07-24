<template>
  <section class="page-module">
    <div class="module-header">
      <h3>质检标签设置</h3>
    </div>

    <div class="module-content">
      <el-tag
        :key="tag"

        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>

  </section>
</template>

<script>
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
      dynamicTags: ['原因一', '原因二', '原因三'],
      inputVisible: false,
      inputValue: ''
    }
  },

  components: {
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },

  locales: {
    en: {
    },
    zh: {
    }
  }
}
</script>

<style lang="scss">
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
