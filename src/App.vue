<template>
  <div id="app">
    <keep-alive>
      <!-- 一级路由容器 将所有的一级路由组件都进行了缓存-->
      <!-- $route.meta.isAlive
      如果为true  需要用keep-alive来包裹router-view
      如果为false 就必须把router-view放置在keep-alive之外
      v-if 条件渲染 -->
      <!-- 如果为true 就包在里面 -->
      <!-- 可以保证只有layout组件进行缓存 -->
      <router-view v-if="$route.meta.isAlive"/>
    </keep-alive>
    <!-- 如果为false 就放在外面 -->
      <router-view v-if="!$route.meta.isAlive"/>
  </div>
</template>

<style lang="less">
</style>
