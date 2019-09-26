<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <Modal
      v-model="modalVisible"
      title="快速注册"
      footer-hide
      :mask-closable="false"
    >
      <Form ref="registForm" :model="registForm" :rules="rules" @keydown.enter.native="handleRegist">
        <FormItem prop="nickName">
          <Input v-model="registForm.nickName" placeholder="请输入昵称">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="userName">
          <Input v-model="registForm.userName" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="registForm.password" placeholder="请输入密码">
            <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem>
          <Button @click="handleRegist" type="primary" long :loading="registLoading">注册</Button>
        </FormItem>
      </Form>
    </Modal>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <a class="to-rigist" @click="toRegist">快速注册</a>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      modalVisible: false,
      registLoading: false,
      registForm: {
        userName: '',
        password: '',
        nickName: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        nickName: [
          { required: true, message: '昵称不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'regist'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.$Message.success('登陆成功!')
        this.$router.push({
          name: this.$config.homeName
        })
      })
    },
    // 快速注册
    toRegist () {
      this.modalVisible = true
      this.$refs['registForm'].resetFields()
    },
    // 注册账号
    async handleRegist () {
      this.registLoading = true
      const isValid = await this.$refs['registForm'].validate()
      if (!isValid) return
      this.regist({
        ...this.registForm,
        role: 'user'
      }).then(res => {
        this.$Message.success('注册成功!')
        this.modalVisible = false
        this.registLoading = false
      }).catch(() => {
        this.registLoading = false
      })
    }
  }
}
</script>

<style>

</style>
