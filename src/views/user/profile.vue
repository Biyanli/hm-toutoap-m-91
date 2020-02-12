<template>
  <div class="container">
    <van-nav-bar left-arrow @click-right="saveUserInfo"  @click-left="$router.back()" title="编辑资料" right-text="保存"></van-nav-bar>
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
          :src="user.photo"
        />
      </van-cell>
      <!-- 用户昵称 -->
      <van-cell is-link title="名称" @click="showName = true" :value="user.name" />
      <!-- 性别 -->
      <van-cell is-link title="性别" @click="showGender = true" :value="user.gender === 0 ? '男':'女'" />
      <!-- 生日 -->
      <van-cell is-link title="生日" @click="showDate" :value="user.birthday" />
    </van-cell-group>
    <!-- 弹层组件 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 内容 -->
      <!-- 1.本地相册选择图片 -->
      <!-- 2.拍照 -->
      <van-cell @click="openChangeFile" is-link title="本地相册选择图片"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 弹层昵称 关闭点击弹层 关闭功能 round 和:round="true"的效果是一样的 -->
    <van-popup round :close-on-click-overlay ="false" v-model="showName" style="width:80%">
      <!-- 编辑用户昵称 双向绑定用户的昵称 -->
      <van-field :error-message="nameMsg" v-model.trim="user.name" type="textarea" rows="4"></van-field>
    <!-- 关闭按钮组件 -->
    <van-button type="info" size="large" block @click="btnName">确定</van-button>
    </van-popup>
    <!-- 性别选择上拉菜单 性别数据通过actions属性设置 -->
    <van-action-sheet @select="selectItem" :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>
    <!-- 生日弹层 -->
    <van-popup v-model="showBirthday" position="bottom">
      <!-- 选择出生日期 出生日期应该小于现在时间 -->
      <!-- type 表示当前的日期类型 年月日 -->
      <!-- v-model 表示当前的时间 取消时讲弹层关闭 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthday = false"
        @confirm="confirmDate"
      />
    </van-popup>
    <!-- 设置一个文件上传控件 但是不能让人看到 -->
    <!-- input:file 当选择文件之后就会触发onchange -->
    <input @change="upload" ref="myfile" type="file" name="" id="" style="display:none">
  </div>
</template>

<script>
import dayjs from 'dayjs' // 引入dayjs插件
import { getUserProfile, updateImg, saveUserInfo } from '@/api/user' // 引入获取资料的方法
import { mapMutations } from 'vuex' // 引入辅助函数
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
        name: '', // 用户昵称
        gender: 1, // 男 0 女 1
        birthday: '' // 默认生日
      },
      actions: [{ name: '男' }, { name: '女' }],
      nameMsg: '' // 专门用来控制显示的错误信息
    }
  },
  methods: {
    ...mapMutations(['updatePhoto']), // 在编辑资料页面引入公共的mutations方法
    // 绑定按钮点击事件
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        // 如果长度小于1或者大于7，表示昵称不合规范
        this.nameMsg = '您的用户名长度不符合1-7的要求'
        return false // 不会继续往下执行
      }
      // 如果满足的话就会继续执行
      this.nameMsg = '' // 先把提示消息清空
      this.showName = false // 关闭弹层
    },
    // 当点击菜单项时，会触发该方法
    selectItem (item) {
      // console.log(item) // item就是选择的对象
      this.user.gender = item.name === '男' ? 0 : 1 // 根据判断得到当前的性别
      this.showGender = false // 关闭当前的弹层
    },
    // 点击生日时触发
    showDate () {
      // 要将字符串 2019-08-08 转化成日期类型
      this.currentDate = new Date(this.user.birthday) // 将当前用户的生日赋值给绑定当前时间的数据
      this.showBirthday = true // 显示生日弹层
    },
    // 点击生日弹层的确定时 触发的方法
    confirmDate (date) {
      // console.log(date)
      this.user.birthday = dayjs(date).format('YYYY-MM-DD') // 将转化后的结果赋值给user中的生日
      this.showBirthday = false // 关闭弹层
    },
    // 获取用户资料的方法
    async  getUserProfile () {
      let data = await getUserProfile()
      // 将头像地址更新设置给公共的state
      this.updatePhoto({ photo: data.photo }) // 载荷
      // console.log(data)
      // 将数据赋值给user
      this.user = data
    },
    // 点击选择图片时触发
    openChangeFile () {
      // 上传本地文件
      // 触发文件上传组件的点击事件
      // 需要先获取文件上传的dom对象再触发
      this.$refs.myfile.click() // 触发文件上传组件的方法
    },
    // 当选择图片之后就会触发
    async  upload () {
      // console.log('选择了图片')
      // 上传头像 获取选择的图片
      // console.log(this.$refs.myfile.files[0])
      // 首先 应该把这个图片上传到服务器
      // 调用编辑头像的方法
      let data = new FormData()
      data.append('photo', this.$refs.myfile.files[0]) // 往Formdata中添加参数
      let result = await updateImg(data)
      // console.log(result) // 上传头像成功之后返回的结果
      // 应该把地址同步设置给当前页面的数据
      this.user.photo = result.photo // 将上传成功的头像设置给当前头像
      this.showPhoto = false // 关闭弹层
      // 当头像上传成功之后 把上传成功的头像的地址 设置给state
      this.updatePhoto({
        photo: result.photo
      })// 调用mutations方法，将数据设置给公共状态
    },
    // 保存方法 调用保存接口 这里是不需要传photo数据的
    // 1.我们通过别的方法更新了头像
    // 2.photo base64字符串
    async  saveUserInfo () {
      try {
        await saveUserInfo({ ...this.user, photo: null })
        this.$gnotify({ type: 'success', message: '保存成功' })
      } catch (error) {
        this.$gnotify({ type: 'danger', message: '保存失败' })
      }
    }
  },
  created () {
    this.getUserProfile() // 调用获取用户资料的方法
  }
}
</script>

<style lang="less" scoped>
</style>
