<template>
  <div class="container">
    <van-nav-bar left-arrow title="登录" @click-left="$router.back()"></van-nav-bar>
    <!-- 手机号 验证码 登录按钮 -->
    <van-cell-group>
      <van-field
        :error-message="errMsg.mobile"
        @blur="checkMobile"
        v-model="LoginForm.mobile"
        label="手机号"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        :error-message="errMsg.code"
        @blur="checkCode"
        v-model="LoginForm.code"
        label="验证码"
        placeholder="请输入验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button @click="login" round block type="info" size="small">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      LoginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 专门提示错误信息
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 判断为空
      if (!this.LoginForm.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断格式
      if (!/^1[3-9]\d{9}$/.test(this.LoginForm.mobile)) {
        this.errMsg.mobile = '手机号格式不正确'
        return false
      }
      this.errMsg.mobile = '' // 清空信息
      return true
    },
    checkCode () {
      // 判断为空
      if (!this.LoginForm.code) {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      // 判断格式
      if (!/^\d{6}$/.test(this.LoginForm.code)) {
        this.errMsg.code = '验证码必须为6位数字'
        return false
      }
      this.errMsg.code = '' // 清空信息
      return true
    },
    login () {
      if (this.checkMobile() && this.checkCode()) {
        // 都通过了，表示前端验证通过 还需要调用接口
        // 提示消息，表示登陆成功
        console.log('校验通过')
      }
    }

  }
}
</script>

<style lang="less" scoped>
.btn {
  padding: 20px;
}
</style>
