<template>
  <!-- 消息模块 -->
    <div class="messages border-top">
      <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
@include b(messages) {
  height: rem(282);
}
</style>
