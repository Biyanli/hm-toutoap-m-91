<template>
  <div class="container">
    <van-nav-bar left-arrow title="登录" @click-left="$router.back()"></van-nav-bar>
    <!-- 手机号 验证码 登录按钮 -->
    <van-cell-group>
      <van-field label="手机号" placeholder="请输入手机号"></van-field>
      <van-field label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button round block type="info" size="small">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="less" scoped>
.btn {
  padding: 20px;
}
</style>
