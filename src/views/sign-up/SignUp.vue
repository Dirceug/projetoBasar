<template>
  <div>
    <h1>Sign Up</h1>
    <div>
      <label for="username">Username</label>
      <input id="username" placeholder="Escolha um apelido" />
    </div>
    {{ username }}
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
        v-model="password" 
      />
    </div>
    <div>
      <label for="passwordRepeat">Password Repeat</label>
      <input
        id="passwordRepeat"
        type="password"
        placeholder="Coloque aqui a senha novamente"
        v-model="passwordRepeat"
      />
    </div>
    <button :disabled="isDisabled">Sign Up</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const password = ref('')
const passwordRepeat = ref('')
const username = ref('')

const isDisabled = computed(() => {
  return password.value || passwordRepeat.value ? password.value !== passwordRepeat.value : true
})

</script>

<!-- <script>
  export default{
    data() {
      return {
        password: '',
        passwordRepeat: '',
      }
    }, computed: {
      isDisabled(){
        return (this.password || this.passwordRepeat) ? this.password !== this.passwordRepeat: true 
      }
    }
  }
</script> -->
