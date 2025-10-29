<template>
  <section :style="containerStyle">
    <div :style="cardStyle">
      <h2 :style="titleStyle">Login</h2>
      <form @submit.prevent="handleSubmit">
        <div :style="formRowStyle">
          <label :style="labelStyle">Email</label>
          <input
            type="email"
            v-model="email"
            :style="inputStyle"
          />
          <small v-if="errors.email" :style="errorStyle">{{ errors.email }}</small>
        </div>

        <div :style="formRowStyle">
          <label :style="labelStyle">Password</label>
          <input
            type="password"
            v-model="password"
            :style="inputStyle"
          />
          <small v-if="errors.password" :style="errorStyle">{{ errors.password }}</small>
        </div>

        <div v-if="errors.form" :style="formErrorStyle">{{ errors.form }}</div>

        <button type="submit" :style="buttonStyle">Login</button>
      </form>

      <p :style="testCredsStyle">
        Test credentials: <strong>test@user.com / password123</strong>
      </p>
      <p :style="linkTextStyle">
        Don't have an account? 
        <router-link to="/auth/signup" :style="linkStyle">Sign up</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'
import { showToast } from '../services/toastService'

export default {
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errors = ref({})

    const handleSubmit = () => {
      errors.value = {}
      if (!email.value) return errors.value.email = 'Email is required'
      if (!password.value) return errors.value.password = 'Password is required'

      try {
        login({ email: email.value, password: password.value })
        showToast('Login successful!')
        router.push('/dashboard')
      } catch (err) {
        errors.value.form = err.message
        showToast(err.message, 'error')
      }
    }

    return {
      email,
      password,
      errors,
      handleSubmit,
      containerStyle: {
        maxWidth: '500px',
        margin: '60px auto',
        padding: '0 20px'
      },
      cardStyle: {
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      },
      titleStyle: {
        marginBottom: '24px',
        textAlign: 'center'
      },
      formRowStyle: {
        marginBottom: '16px'
      },
      labelStyle: {
        display: 'block',
        marginBottom: '6px',
        fontWeight: '600'
      },
      inputStyle: {
        width: '100%',
        padding: '12px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '16px',
        boxSizing: 'border-box'
      },
      errorStyle: {
        color: 'red',
        display: 'block',
        marginTop: '4px'
      },
      formErrorStyle: {
        color: 'red',
        marginBottom: '16px',
        textAlign: 'center'
      },
      buttonStyle: {
        width: '100%',
        padding: '14px',
        background: '#006400',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer'
      },
      testCredsStyle: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#6b7280'
      },
      linkTextStyle: {
        marginTop: '12px',
        textAlign: 'center'
      },
      linkStyle: {
        color: '#006400',
        fontWeight: '600'
      }
    }
  }
}
</script>

