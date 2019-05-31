<template>
  <!-- 会员模块 -->
    <div class="wx-members border-top">
      <i-cell title="会员卡尊享"
              icon="diamond"
              is-link
              @click.native="$router.push({ name: 'memberBenefits' })"></i-cell>
      <i-cell title="会员卡说明"
              icon="intro"
              is-link
              @click.native="$router.push({ name: 'memberCardIntro' })"></i-cell>
      <i-cell title="绑定实体会员卡"
              icon="card"
              is-link
              @click.native="$router.push({ name: 'memberBindingCard' })"></i-cell>
      <i-cell title="完善资料享更多特权"
              icon="writer"
              is-link
              @click.native="$router.push({ name: 'memberPerfectInfo' })"></i-cell>
    </div>
</template>

<script>
export default {
  name: 'Member',
}
</script>

<style lang="scss" scoped>
@include b(member) {
  height: rem(420);
}
</style>


