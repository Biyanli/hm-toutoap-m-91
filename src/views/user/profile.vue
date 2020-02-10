<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存"></van-nav-bar>
    <van-cell-group>
      <!-- 头像 -->
      <!-- 点击图片 显示选择图片的弹层 -->
      <van-cell is-link title="头像" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          @click="showPhoto = true"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <!-- 用户昵称 -->
      <van-cell is-link title="名称" @click="showName = true" :value="user.name" />
      <!-- 性别 -->
      <van-cell is-link title="性别" @click="showGender = true" :value="user.gender === 0 ? '男':'女'" />
      <!-- 生日 -->
      <van-cell is-link title="生日" @click="showBirthday = true" :value="user.birthday" />
    </van-cell-group>
    <!-- 弹层组件 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 内容 -->
      <!-- 1.本地相册选择图片 -->
      <!-- 2.拍照 -->
      <van-cell is-link title="本地相册选择图片"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 弹层昵称 -->
    <van-popup v-model="showName" style="width:80%">
      <!-- 编辑用户昵称 双向绑定用户的昵称 -->
      <van-field v-model="user.name" type="textarea" rows="4"></van-field>
    </van-popup>
    <!-- 性别选择上拉菜单 性别数据通过actions属性设置 -->
    <van-action-sheet :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>
    <!-- 生日弹层 -->
    <van-popup v-model="showBirthday" position="bottom">
      <!-- 选择出生日期 出生日期应该小于现在时间 -->
      <!-- type 表示当前的日期类型 年月日 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      minDate: new Date(1900, 1, 1), // 最小时间
      maxDate: new Date(), // 生日最大时间 永远小于等于当前时间
      currentDate: new Date(), // 当前时间
      showBirthday: false, // 是否显示生日弹层
      showPhoto: false, // 是否显示选择头像弹层
      showName: false, // 是否显示编辑昵称的弹层
      showGender: false, // 是否显示性别选择的弹层
      // 定义数据
      user: {
        name: '张三', // 用户昵称
        gender: 1, // 男 0 女 1
        birthday: '2019-08-08' // 默认生日
      },
      actions: [{ name: '男' }, { name: '女' }]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
