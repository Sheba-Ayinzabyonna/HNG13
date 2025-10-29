<template>
  <section :style="containerStyle">
    <h2 :style="titleStyle">Dashboard</h2>

    <div :style="statsGridStyle">
      <div :style="statCardStyle('#3b82f6')">
        <div :style="statValueStyle"  >{{ stats.total }}</div>
        <div :style="statLabelStyle">Total Tickets</div>
      </div>

      <div :style="statCardStyle('#10b981')">
        <div :style="statValueStyle">{{ stats.open }}</div>
        <div :style="statLabelStyle">Open</div>
      </div>

      <div :style="statCardStyle('#6b7280')">
        <div :style="statValueStyle">{{ stats.closed }}</div>
        <div :style="statLabelStyle">Resolved</div>
      </div>
    </div>

    <div :style="actionCardStyle">
      <p>
        Go to 
        <router-link to="/tickets" :style="linkStyle">Tickets page</router-link>
        to manage your tickets
      </p>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { loadTickets } from '../services/ticketStore.js'


export default {
  setup() {
    const tickets = ref([])

    onMounted(() => {
      try {
        tickets.value = loadTickets()
      } catch (e) {
        console.error('Failed to load tickets', e)
      }
    })

    const stats = computed(() => ({
      total: tickets.value.length,
      open: tickets.value.filter(t => t.status === 'open').length,
      closed: tickets.value.filter(t => t.status === 'closed').length
    }))

    const statCardStyle = (color) => ({
      background: 'white',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
      color
    })

    return {
      stats,
      statCardStyle,
      containerStyle: {
        maxWidth: '1440px',
        margin: '60px auto',
        padding: '0 20px'
      },
      titleStyle: {
        marginBottom: '32px'
      },
      statsGridStyle: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      },
      statValueStyle: {
        fontSize: '3rem',
        fontWeight: 'bold'
      },
      statLabelStyle: {
        marginTop: '8px',
        color: '#6b7280'
      },
      actionCardStyle: {
        background: 'white',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      },
      linkStyle: {
        color: '#006400',
        fontWeight: '600'
      }
    }
  }
}
</script>
