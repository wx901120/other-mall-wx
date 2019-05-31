<template>
  <div class="input-search-wrap">
    <input type="text"
           class="input-search"
           :class="{'icon-glass': searchText === ''}"
           placeholder="搜索"
           v-model="searchText"
           @input="onSearch(searchText)">
  </div>
</template>

<script>
export default {
  
}
</script>


<style lang="scss" scoped>

</style>
