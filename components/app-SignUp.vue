<template>
  <div class="registration">
    <transition name="login" mode="out-in">
      <div v-if="isActive" class="registration_container">
        <div class="registration_top">
          <h2 class="registration_top__title">{{ $t("btn.signUp") }}</h2>
          <a class="registration_top__link" @click="toggleLogin">{{
            $t("link.oldUser")
          }}</a>
        </div>

        <b-form inline class="form_registration">
          <label class="form_label">
            {{ $t("form.login") }}
            <b-form-input
              class="mb-2 mr-sm-2 mb-sm-0"
              type="login"
              :placeholder="$t('form.login')"
              v-model="fullname"
              :class="{ 'input-error': fullnameError }"
            ></b-form-input>
            <p v-if="fullnameError" class="error-message">
              {{ $t("errorText.login") }}
            </p>
          </label>
          <p>{{ fullname }}</p>
          <label class="form_label">
            {{ $t("form.email") }}
            <b-form-input
              id="inline-form-input-email"
              class="mb-2 mr-sm-2 mb-sm-0"
              type="email"
              :placeholder="$t('form.email')"
              v-model="email"
              :class="{ 'input-error': emailError }"
            ></b-form-input>
            <p v-if="emailError" class="error-message">
              {{ $t("errorText.email") }}
            </p>
          </label>
          <label class="form_label">
            {{ $t("form.password") }}
            <b-form-input
              id="inline-form-input-password"
              class="mb-2 mr-sm-2 mb-sm-0"
              type="password"
              :placeholder="$t('form.password')"
              v-model="password"
              :class="{ 'input-error': passwordError }"
            ></b-form-input>
            <p v-if="passwordError" class="error-message">
              {{ $t("errorText.password") }}
            </p>
          </label>
          <p v-if="newUserError" class="error-message">
            {{ $t("errorText.oldUser") }}
          </p>
          <b-button
            class="registration_btn"
            variant="primary"
            @click.prevent="handleClick()"
            >{{ $t("btn.signUp") }}</b-button
          >
        </b-form>
      </div>

      <SignIn v-else @show-login="toggleLogin" />
    </transition>
  </div>
</template>

<script lang="ts">
import { DataSignUp, User } from "../types/registration";
import SignIn from "@/components/app-SignIn.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    SignIn,
  },
  data(): DataSignUp {
    return {
      oldUser: [],
      users: [],
      fullname: "",
      email: "",
      password: "",
      fullnameError: false,
      emailError: false,
      passwordError: false,
      isActive: true,
      newUserError: false,
    } ;
  },
  methods: {
    toggleLogin() {
      this.isActive = !this.isActive;
    },
    validateForm() {
      this.fullnameError = false;
      this.emailError = false;
      this.passwordError = false;
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.email)) {
        this.emailError = true;
      }
      if (this.password.length < 8) {
        this.passwordError = true;
      }
      if (this.fullname.trim() === "") {
        this.fullnameError = true;
      }
      return !this.emailError && !this.passwordError;
    },
    async handleClick() {
      if (this.validateForm()) {
        const users = JSON.parse(localStorage.getItem("users") as string) || [];
        const user = users.find(
          (user: User) => user.email === this.email && user.password === this.password
        );
        if (!user) {
          const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name: this.fullname,
            email: this.email,
            password: this.password,
          } as User;

          const oldUser = {
            name: this.fullname,
            email: this.email,
            password: this.password,
          } as User;

          users.push(newUser);
          this.oldUser.push(oldUser);
          this.fullname = "";
          this.email = "";
          this.password = "";
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("oldUser", JSON.stringify(this.oldUser));
          await this.$router.push("/orders");
        } else {
          this.newUserError = true;
        }
      }
    },
  },
});
</script>
