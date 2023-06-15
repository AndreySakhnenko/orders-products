<template>
  <div class="navigation">
    <b-nav vertical class="navigation_list">
      <b-avatar-group size="5rem" class="navigation_avatar">
        <b-avatar></b-avatar>
      </b-avatar-group>
      <p class="navigation_userName">{{userName}}</p>
      <b-nav-item v-for="(menuItem, idx) in menuItems" :key="idx">
        <NuxtLink :to="menuItem.path" :class="{ active: isActive(menuItem.path) }">
          {{$t(menuItem.key)}}
        </NuxtLink>
      </b-nav-item>
    </b-nav>
      <button @click="logOut" class="navigation_logout">{{$t("btn.logOut")}}</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      menuItems: [
        { key: "navbar.arrival", path: "/orders" },
        { key: "navbar.groups", path: "/products" },
        { key: "navbar.products", path: "/products" },
        { key: "navbar.users", path: "/products" },
        { key: "navbar.settings", path: "/" },
      ],
      currentPath: "",
      userName: ''
    };
  },
  methods: {
    isActive(path:string) {
      return this.currentPath === path;
    },
    async logOut(){
      localStorage.removeItem("oldUser");
      await this.$router.push({ name: "index" });
    }
  },
  mounted() {
     const userData = localStorage.getItem("oldUser") ? JSON.parse(localStorage.getItem("oldUser") as string) : null;
      if (userData){
      this.userName = userData[0].name
      }
    this.currentPath = this.$route.path;
  },
  watch: {
    $route(to, from) {
      this.currentPath = to.path;
    },
  },
});
</script>
<style scoped>
  .nuxt-link-active.active {
    border-bottom: 2px solid #28a745;
    padding: 2px 0;
  }
  .nav-item a {
    color: #333;
    font-weight: 700;
    text-transform: uppercase;
  }
  .nav-item a:hover {
    text-decoration:none;
  }
  .navigation{
    width: 20%;
    text-align: center;
  }
  .navigation_list{
    text-align: center;
    padding: 20px 0;
  }
  .navigation_logout{
    border: none;
    color: #28a745;
    background: transparent;
    font-weight: 600;
  }
  .navigation_userName{
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #28a745;
  }
</style>