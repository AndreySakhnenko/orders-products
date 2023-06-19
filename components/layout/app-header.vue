<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark" class="navbar-container">
      <div class="navbar_logo">
        <div class="navbar_logo__img">
          <img src="../../assets/images/logo.svg" />
        </div>
        <b-navbar-brand class="navbar_logo__link text-success"
          >Inventory</b-navbar-brand
        >
      </div>

      <b-nav-form>
        <b-form-input
          size="sm"
          class="mr-sm-2 header_input__search"
          :placeholder="$t('form.search')"
        ></b-form-input>
      </b-nav-form>
      <ul class="locales_list">
        <li v-for="(locale, index) in locales" :key="index">
          <a
            class="locales_link"
            :class="{ active: locale.lang === activeLocale }"
            @click="switchLocale(locale.lang)"
          >
            {{ $t(locale.name) }}
          </a>
        </li>
      </ul>
      <div class="header_data d-flex">
        <p class="header_data__day">{{ currentDayOfWeek }}</p>
        <div class="header_data__block">
          <p>{{ currentDay }} {{ currentMonth }}, {{ currentYear }}</p>
          <p class="header_data__time">
            <img src="../../assets/images/time.svg" />
            {{ currentTime }}
          </p>
        </div>
      </div>
    </b-navbar>
  </div>
</template>
<script lang="ts">
import { Header } from "../../types/header";
import Vue from "vue";
export default Vue.extend({
  data(): Header {
    return {
      locales: [
        { name: "locales.en", lang: "en" },
        { name: "locales.ua", lang: "ua" },
        { name: "locales.ru", lang: "ru" },
      ],
      activeLocale: "ru",
      currentMonth: "",
      currentDay: "",
      currentYear: "",
      currentTime: "",
      currentDayOfWeek: "",
    };
  },
  mounted() {
    if (process.client) {
      const selectedLanguage = localStorage.getItem("selectedLanguage");
      if (selectedLanguage) {
        this.$i18n.locale = selectedLanguage;
        this.activeLocale = selectedLanguage;
      }
    }
    this.updateDateTime();
  },
  methods: {
    switchLocale(locale: string) {
      document.body.classList.add("lang-changing");
      this.$i18n.locale = locale;
      setTimeout(() => {
        document.body.classList.remove("lang-changing");
      }, 1000);
      this.activeLocale = locale;
      localStorage.setItem("selectedLanguage", locale);
    },
    updateDateTime() {
      const now = new Date();
      this.currentDayOfWeek = now.toLocaleString("default", {
        weekday: "long",
      });
      this.currentMonth = now.toLocaleString("default", { month: "long" });
      this.currentDay = now.getDate();
      this.currentYear = now.getFullYear();
      this.currentTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
});
</script>
<style>
.lang-changing {
  transition: all 1s ease;
  opacity: 1;
}

.lang-changing:not(.active) {
  opacity: 0;
}
.header {
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(196, 196, 196, 0.25);
}
.navbar-container {
  justify-content: space-between;
  padding-left: 15%;
  padding-right: 20px;
  width: 100%;
}
.navbar_logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.navbar_logo__link {
  font-weight: 500;
}
.header_input__search {
  background: #e3e3e3;
  font-weight: 600;
  max-width: 250px;
  width: 100%;
  color: #000;
}
.header_input__search::placeholder {
  font-weight: 600;
  color: #000;
}
.header_lang {
  list-style-type: none;
}

.locales_list {
  display: flex;
  align-items: center;
}
.locales_list > *:not(:last-child)::after {
  content: "/";
  display: inline-block;
  color: #111111;
  margin: 0 5px;
}

.locales_link {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #111111;
  cursor: pointer;
  transition: all 0.3s ease-in;
}
.locales_link.active {
  color: #2e6fce;
  font-weight: 500;
}
.header_data {
  font-size: 12px;
  display: flex;
  flex-direction: column;
}
.header_data__day {
  text-transform: capitalize;
}
.header_data__block {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
}
.header_data__time {
  display: flex;
  align-items: center;
  gap: 5px;
}
@media screen and (max-width: 989px) {
  .navbar-container {
    padding-left: 20%;
  }
}
</style>
