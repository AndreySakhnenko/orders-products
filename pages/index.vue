<template>
<div class="app_container">
<nuxt-child />
  <SignUp/>
</div>
</template>

<script lang="ts">
import SignUp from '@/components/app-SignUp.vue'
import Vue from "vue";
export default Vue.extend({
  name: "IndexPage",
  components:{
    SignUp
  },
  mounted(){
    const oldUserData = localStorage.getItem("oldUser") ? JSON.parse(localStorage.getItem("oldUser") as string) : null;
      if (oldUserData){
        this.$router.push('/orders');
      }
  }
});
</script>
<style scoped>
.app_container{
  position: relative;
  height: 100vh;
}
</style>