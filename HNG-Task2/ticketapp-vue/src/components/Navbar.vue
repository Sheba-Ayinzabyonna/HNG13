<template>
  <header :style="headerStyle">
    <div :style="containerStyle">
      <router-link to="/" :style="brandStyle">TicketApp</router-link>
      
      <nav :style="navStyle">
        <router-link to="/" :style="linkStyle">Home</router-link>
        <template v-if="session">
          <router-link to="/dashboard" :style="linkStyle">Dashboard</router-link>
          <router-link to="/tickets" :style="linkStyle">Tickets</router-link>
        </template>
      </nav>

      <div>
        <router-link v-if="!session" to="/auth/login" :style="loginBtnStyle">
          Login
        </router-link>
        <button v-else @click="handleLogout" :style="logoutBtnStyle">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSession, clearSession } from '../services/authService'
import { showToast } from '../services/toastService'

export default {
  setup() {
    const router = useRouter()
    const session = ref(null)

    const updateSession = () => {
      session.value = getSession()
    }

    const handleLogout = () => {
      clearSession()
      showToast("Logged out successfully")
      router.push('/')
      updateSession()
    }

    onMounted(updateSession)
    router.afterEach(updateSession)

    return {
      session,
      handleLogout,
      headerStyle: {
        background: '#006400',
        color: 'white',
        padding: '16px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      },
      containerStyle: {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      },
      brandStyle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none'
      },
      navStyle: {
        display: 'flex',
        gap: '24px'
      },
      linkStyle: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px'
      },
      loginBtnStyle: {
        background: '#ff6347',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '20px',
        textDecoration: 'none',
        fontWeight: '600'
      },
      logoutBtnStyle: {
        background: '#ff6347',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '600'
      }
    }
  }
}
</script>
