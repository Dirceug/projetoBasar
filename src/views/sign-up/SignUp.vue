<style scoped></style>

<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <form @submit.prevent="submit" class="card">
      <div class="card-header text-center">
        <h1>Sign Up</h1>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label" for="username">Username</label>
          <input
            class="form-control"
            id="username"
            placeholder="Escolha um apelido"
            v-model="formState.username"
          />
        </div>
        {{ username }}
        <div class="mb-3">
          <label class="form-label" for="email">E-mail</label>
          <input
            class="form-control"
            id="email"
            placeholder="Digite aqui seu e-mail"
            v-model="formState.email"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            placeholder="Coloque aqui a senha"
            v-model="formState.password"
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="passwordRepeat">Password Repeat</label>
          <input
            class="form-control"
            id="passwordRepeat"
            type="password"
            placeholder="Coloque aqui a senha novamente"
            v-model="formState.passwordRepeat"
          />
        </div>
        <div class="text-center">
          <button :disabled="isDisabled || apiProgress" class="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<!-- <script setup>
import { ref, reactive, computed } from 'vue'
import axios from 'axios'
const formState = reactive({
  username: '',
  email: '',
  password: '',
  passwordRepeat: ''
})

const apiProgress = ref(false)

const submit = () => {
  apiProgress.value = true
  const { passwordRepeat, ...body } = formState
  axios.post(
    '/api/v1/users',
    body
  )
}

const isDisabled = computed(() => {
  return formState.password || formState.passwordRepeat
    ? formState.password !== formState.passwordRepeat
    : true
})
</script> -->

<script>
import axios from 'axios'
export default {
  data() {
    return {
      formState: {
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
      },
      apiProgress: false
    }
  },
  methods: {
    submit() {
      this.apiProgress = true
      const { passwordRepeat, ...body } = this.formState
      axios.post('api/v1/users', body)
    }
  },
  computed: {
    isDisabled() {
      return this.formState.password || this.formState.passwordRepeat
        ? this.formState.password !== this.formState.passwordRepeat
        : true
    }
  }
}
</script>
