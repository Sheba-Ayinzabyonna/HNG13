<template>
  <div :style="containerStyle">
    <div
      v-for="toast in toastState.toasts"
      :key="toast.id"
      :style="getToastStyle(toast.type)"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import { toastState } from '../services/toastService'

export default {
  setup() {
    const getToastStyle = (type) => ({
      background: type === 'error' ? '#ef4444' : '#10b981',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      minWidth: '250px'
    })

    return {
      toastState,
      getToastStyle,
      containerStyle: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }
    }
  }
}
</script>
