<template>
  <section :style="containerStyle">
    <div :style="cardStyle">
      <h2 :style="titleStyle">Sign Up</h2>
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

        <button type="submit" :style="buttonStyle">Create Account</button>
      </form>

      <p :style="linkTextStyle">
        Already have an account? 
        <router-link to="/auth/login" :style="linkStyle">Login</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signup } from '../services/authService'
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
      if (!password.value || password.value.length < 6) 
        return errors.value.password = 'Password must be at least 6 characters'

      try {
        signup({ email: email.value, password: password.value })
        showToast('Account created successfully!')
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
      linkTextStyle: {
        marginTop: '20px',
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
