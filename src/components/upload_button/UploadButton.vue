<template>
  <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
    <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">导入</Button>
  </Upload>
</template>

<script>
import excel from '@/libs/excel'
export default {
  name: 'UploadButton',
  // props: {
  //   loading: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data () {
    return {
      file: null,
      uploadLoading: false
    }
  },
  methods: {
    handleBeforeUpload (file) {
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
    handleUploadFile () {
      this.file = null
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
      }
      reader.onerror = e => {
        this.$Message.error('文件读取出错')
      }
      reader.onload = async e => {
        const data = e.target.result
        try {
          console.log('excel', excel)
          await this.$emit('onload', excel.read(data, 'array'))
        } catch (error) {
          console.log('UploadButton', error)
        } finally {
          this.uploadLoading = false
        }
      }
    }
  }
}
</script>
