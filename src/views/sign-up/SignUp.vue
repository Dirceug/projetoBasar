<template>
  <div>
    <h1>Sign Up</h1>
    <div>
      <label for="username">Username</label>
      <input id="username" placeholder="Escolha um apelido" />
    </div>
    <div>
      <label for="email">E-mail</label>
      <input id="email" placeholder="Digite aqui seu e-mail" />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Coloque aqui a senha"
        v-on:input="onChangePassword"
      />
    </div>
    <div>
      <label for="passwordRepeat">Password Repeat</label>
      <input
        id="passwordRepeat"
        type="password"
        placeholder="Coloque aqui a senha novamente"
        v-on:input="onChangePasswordRepeat"
      />
    </div>
    <button :disabled="disabled">Sign Up</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// let disabled = ref(true)
// setTimeout(() => {
//   console.log('button must be enabled')
//   disabled.value = false
// }, 1000)

const disabled = ref(true)
const password = ref('')
const passwordRepeat = ref('')

const onChangePassword = (event) => {
  password.value = event.target.value
  disabled.value = password.value !== passwordRepeat.value
}

const onChangePasswordRepeat = (event) => {
  passwordRepeat.value = event.target.value
  disabled.value = password.value !== passwordRepeat.value
}
</script>
