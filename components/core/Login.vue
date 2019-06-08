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
              <v-form>
                <v-text-field
                  v-model="username"
                  prepend-icon="person"
                  name="username"
                  label="Username"
                  type="text"
                  :error-messages="usernameErrors"
                  required
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                />
                <v-text-field
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  :error-messages="passwordErrors"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="submit">
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
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (this.$v.username === undefined || !this.$v.username.$dirty) {
        return errors
      }
      !this.$v.username.required && errors.push('Username is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (this.$v.password === undefined || !this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },
  methods: {
    async submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        await this.$store.dispatch('user/login', {
          username: this.username,
          password: this.password
        })
      }
    }
  }
}
</script>
