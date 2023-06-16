
<template>
  <div class="registration_container">
      <div class="registration_top">
      <h2 class="registration_top__title">{{$t('btn.signIn')}}</h2>
      <a class="registration_top__link" @click="toggleLogin">{{$t('link.newUser')}}</a>
      </div>
  <b-form inline class="form_registration">
    <label class="form_label">
      {{$t('form.email')}}
    <b-form-input
      id="inline-form-input-email"
      class="mb-2 mr-sm-2 mb-sm-0"
      type="email"
      :placeholder="$t('form.email')"
      v-model="email"
      :class="{ 'input-error': emailError }"
    ></b-form-input>
      <p v-if="emailError" class="error-message">
           {{$t('errorText.email')}}
      </p>
      </label>
      <label class="form_label">
        {{$t('form.password')}}
    <b-form-input
      id="inline-form-input-password"
      class="mb-2 mr-sm-2 mb-sm-0"
      type="password"
      :placeholder="$t('form.password')"
      v-model="password"
      :class="{ 'input-error': passwordError }"
    ></b-form-input>
    <p v-if="passwordError" class="error-message">
         {{$t('errorText.password')}}
    </p>
    </label>
    <p v-if='errorLogIn' class="error-message"> {{$t('errorText.newUser')}}</p>
    <b-button class="registration_btn" variant="primary" @click.prevent="submitSignIn()">{{$t("btn.signIn")}}</b-button>
  </b-form>
</div>
</template>

<script lang="ts">
import { DataSignIn, User } from "../types/registration";
import Vue from "vue";

export default Vue.extend({
  data(): DataSignIn {
    return {
      oldUser: [],
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      errorLogIn: false,
    };
  },
  methods: {
    toggleLogin() {
      this.$emit("show-login");
    },
    validateForm() {
      this.emailError = false;
      this.passwordError = false;
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.email)) {
        this.emailError = true;
      }
      if (this.password.length < 8) {
        this.passwordError = true;
      }
      return !this.emailError && !this.passwordError;
    },
    async submitSignIn() {
      if (this.validateForm()) {
        const users = JSON.parse(localStorage.getItem("users") as string) || [];
        const user = users.find(
          (user: User) => user.email === this.email && user.password === this.password
        );

        if (user) {
         const oldUser = {
              name: user.fullname,
              email: user.email,
              password: user.password,
            } as  User;
          this.oldUser.push(oldUser);
          localStorage.setItem("oldUser", JSON.stringify(this.oldUser));
          await this.$router.push("/orders");
          console.log("User found:", user);
        } else {
          this.errorLogIn = true;
          console.log("User not found");
        }

        this.email = "";
        this.password = "";
      }
    },
  },
});
</script>