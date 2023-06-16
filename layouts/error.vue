<template>
  <div class="error_container text-center">
    <h1 class="font-bold text-[9.35rem] leading-none">
      <span>4</span><span class="text-primary">0</span><span>4</span>
    </h1>

    <p class="h3 mt-4">{{ $t('not_found') }}</p>

    <NuxtLink :to="localePath('/')" class="text-primary hover:opacity-70 transition-opacity duration-200 mx-auto block first-capitalize font-semibold mt-14 paragraph-lg">
      {{ $t("back_to_homepage") }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Error",
});
</script>
<style scoped>
.error_container{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>