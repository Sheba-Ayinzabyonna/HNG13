<template>
  <footer :style="footerStyle">
    <div :style="containerStyle">
      <div>&copy; {{ new Date().getFullYear() }} TicketApp. All rights reserved.</div>
      <div :style="subtextStyle">
        Built with accessibility & responsiveness in mind
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  setup() {
    return {
      footerStyle: {
        background: '#1f2937',
        color: 'white',
        padding: '32px 20px',
        marginTop: '60px',
        textAlign: 'center'
      },
      containerStyle: {
        maxWidth: '1440px',
        margin: '0 auto'
      },
      subtextStyle: {
        color: '#9ca3af',
        marginTop: '8px'
      }
    }
  }
}
</script>
