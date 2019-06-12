<template>
  <v-content>
    <v-container fluid>
      <v-layout justify-center>
        <v-flex xs12 sm8 md6 lg4 xl3>
          <v-card class="elevation-2">
            <v-toolbar dark class="elevation-2 blue darken-4">
              <v-toolbar-title class="title font-weight-thin text-capitalize">
                <img src="~/assets/images/numen-logo.svg" alt="Home" />
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="credentials.username"
                  :rules="usernameRequired"
                  prepend-icon="person"
                  label="Email Address"
                />
                <v-text-field
                  v-model="credentials.password"
                  :rules="passwordRequired"
                  prepend-icon="lock"
                  label="Password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <p v-if="loginError" class="pl-4 red--text font-weight-medium">
                Invalid Email and/or Password
              </p>
              <v-spacer />
              <v-btn color="primary" :loading="loading" @click="submit">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    credentials: {
      username: '',
      password: ''
    },
    usernameRequired: [v => v.length > 0 || 'Please enter your email address'],
    passwordRequired: [v => v.length > 0 || 'Please enter your password'],
    loading: false,
    loginError: false
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loginError = false
        this.loading = true
        if (!(await this.$store.dispatch('user/login', this.credentials))) {
          this.loginError = true
        }
        this.loading = false
      }
    }
  }
}
</script>
