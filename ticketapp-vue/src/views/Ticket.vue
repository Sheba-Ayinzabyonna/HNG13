<template>
  <section :style="containerStyle">
    <h2 :style="titleStyle">Ticket Management</h2>

    <!-- CREATE/EDIT FORM -->
    <div :style="cardStyle">
      <h3 :style="formTitleStyle">{{ editingId ? 'Edit Ticket' : 'Create New Ticket' }}</h3>
      
      <form @submit.prevent="handleSubmit">
        <!-- TITLE FIELD -->
        <div :style="formRowStyle">
          <label :style="labelStyle">Title *</label>
          <input
            type="text"
            v-model="form.title"
            :style="inputStyle"
            placeholder="Enter ticket title"
          />
          <small v-if="errors.title" :style="errorStyle">{{ errors.title }}</small>
        </div>

        <!-- STATUS FIELD -->
        <div :style="formRowStyle">
          <label :style="labelStyle">Status *</label>
          <select v-model="form.status" :style="inputStyle">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <small v-if="errors.status" :style="errorStyle">{{ errors.status }}</small>
        </div>

        <!-- DESCRIPTION FIELD -->
        <div :style="formRowStyle">
          <label :style="labelStyle">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            :style="textareaStyle"
            placeholder="Enter ticket description (optional)"
          ></textarea>
          <small v-if="errors.description" :style="errorStyle">{{ errors.description }}</small>
        </div>

        <!-- FORM BUTTONS -->
        <div :style="btnGroupStyle">
          <button type="submit" :style="btnPrimaryStyle">
            {{ editingId ? 'Update Ticket' : 'Create Ticket' }}
          </button>
          <button
            v-if="editingId"
            type="button"
            @click="cancelEdit"
            :style="btnSecondaryStyle"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- TICKETS LIST -->
    <div :style="{ marginTop: '32px' }">
      <h3 :style="listTitleStyle">All Tickets ({{ tickets.length }})</h3>
      
      <!-- NO TICKETS MESSAGE -->
      <p v-if="tickets.length === 0" :style="noTicketsStyle">
        No tickets yet. Create your first ticket above!
      </p>

      <!-- TICKETS GRID -->
      <div :style="ticketsGridStyle">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          :style="ticketCardStyle"
        >
          <!-- TICKET CONTENT -->
          <div :style="ticketContentStyle">
            <h4 :style="ticketTitleStyle">{{ ticket.title }}</h4>
            <span :style="getStatusBadgeStyle(ticket.status)">
              {{ formatStatus(ticket.status) }}
            </span>
            <p v-if="ticket.description" :style="ticketDescStyle">
              {{ ticket.description }}
            </p>
            <small :style="ticketDateStyle">
              Created: {{ formatDate(ticket.createdAt) }}
            </small>
          </div>

          <!-- TICKET ACTIONS -->
          <div :style="ticketActionsStyle">
            <button @click="handleEdit(ticket)" :style="btnEditStyle">
              Edit
            </button>
            <button @click="handleDelete(ticket.id)" :style="btnDeleteStyle">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import {
  loadTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from '../services/ticketStore'
import { showToast } from '../services/toastService'

export default {
  name: 'Tickets',
  setup() {
    const tickets = ref([])
    const form = ref({ 
      title: '', 
      status: 'open', 
      description: '' 
    })
    const editingId = ref(null)
    const errors = ref({})

    // Load tickets on mount
    onMounted(() => {
      tickets.value = loadTickets()
    })

    // Validation function
    const validate = (values) => {
      const errs = {}
      
      if (!values.title || values.title.trim() === '') {
        errs.title = 'Title is required'
      }
      
      if (!['open', 'in_progress', 'closed'].includes(values.status)) {
        errs.status = 'Status must be open, in_progress, or closed'
      }
      
      if (values.description && values.description.length > 1000) {
        errs.description = 'Description is too long (max 1000 characters)'
      }
      
      return errs
    }

    // Handle form submission (create or update)
    const handleSubmit = () => {
      const errs = validate(form.value)
      errors.value = errs
      
      if (Object.keys(errs).length > 0) return

      try {
        if (editingId.value) {
          updateTicket(editingId.value, form.value)
          showToast('Ticket updated successfully')
        } else {
          createTicket(form.value)
          showToast('Ticket created successfully')
        }
        
        // Reload tickets and reset form
        tickets.value = loadTickets()
        form.value = { title: '', status: 'open', description: '' }
        editingId.value = null
        errors.value = {}
      } catch (err) {
        showToast(err.message, 'error')
      }
    }

    // Handle edit button click
    const handleEdit = (ticket) => {
      editingId.value = ticket.id
      form.value = {
        title: ticket.title,
        status: ticket.status,
        description: ticket.description || ''
      }
      // Scroll to top to show form
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Handle delete button click
    const handleDelete = (id) => {
      if (!confirm('Are you sure you want to delete this ticket?')) return
      
      try {
        deleteTicket(id)
        tickets.value = loadTickets()
        showToast('Ticket deleted successfully')
      } catch (e) {
        showToast('Failed to delete ticket', 'error')
      }
    }

    // Cancel edit mode
    const cancelEdit = () => {
      editingId.value = null
      form.value = { title: '', status: 'open', description: '' }
      errors.value = {}
    }

    // Get status badge style based on status
    const getStatusBadgeStyle = (status) => {
      const colors = {
        open: '#10b981',
        in_progress: '#f59e0b',
        closed: '#6b7280'
      }
      return {
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        background: colors[status],
        color: 'white',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'capitalize',
        marginTop: '8px'
      }
    }

    // Format status text (replace underscore with space)
    const formatStatus = (status) => {
      return status.replace('_', ' ')
    }

    // Format date for display
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString()
    }

    // Inline styles
    const containerStyle = {
      maxWidth: '1440px',
      margin: '60px auto',
      padding: '0 20px'
    }

    const titleStyle = {
      marginBottom: '32px',
      color: '#1f2937'
    }

    const cardStyle = {
      background: 'white',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      marginBottom: '32px'
    }

    const formTitleStyle = {
      marginBottom: '20px',
      color: '#1f2937'
    }

    const formRowStyle = {
      marginBottom: '16px'
    }

    const labelStyle = {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      color: '#374151'
    }

    const inputStyle = {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      boxSizing: 'border-box'
    }

    const textareaStyle = {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      resize: 'vertical'
    }

    const errorStyle = {
      color: '#ef4444',
      fontSize: '14px',
      display: 'block',
      marginTop: '4px'
    }

    const btnGroupStyle = {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }

    const btnPrimaryStyle = {
      padding: '12px 24px',
      background: '#006400',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px'
    }

    const btnSecondaryStyle = {
      padding: '12px 24px',
      background: '#6b7280',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px'
    }

    const listTitleStyle = {
      marginBottom: '20px',
      color: '#1f2937'
    }

    const noTicketsStyle = {
      textAlign: 'center',
      color: '#6b7280',
      padding: '40px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }

    const ticketsGridStyle = {
      display: 'grid',
      gap: '16px'
    }

    const ticketCardStyle = {
      background: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '20px',
      flexWrap: 'wrap'
    }

    const ticketContentStyle = {
      flex: 1,
      minWidth: '250px'
    }

    const ticketTitleStyle = {
      marginBottom: '8px',
      fontSize: '1.2rem',
      color: '#1f2937'
    }

    const ticketDescStyle = {
      marginTop: '12px',
      color: '#6b7280',
      lineHeight: '1.6'
    }

    const ticketDateStyle = {
      display: 'block',
      marginTop: '12px',
      color: '#9ca3af',
      fontSize: '14px'
    }

    const ticketActionsStyle = {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }

    const btnEditStyle = {
      padding: '8px 16px',
      background: '#f59e0b',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px'
    }

    const btnDeleteStyle = {
      padding: '8px 16px',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px'
    }

    return {
      tickets,
      form,
      editingId,
      errors,
      handleSubmit,
      handleEdit,
      handleDelete,
      cancelEdit,
      getStatusBadgeStyle,
      formatStatus,
      formatDate,
      // Styles
      containerStyle,
      titleStyle,
      cardStyle,
      formTitleStyle,
      formRowStyle,
      labelStyle,
      inputStyle,
      textareaStyle,
      errorStyle,
      btnGroupStyle,
      btnPrimaryStyle,
      btnSecondaryStyle,
      listTitleStyle,
      noTicketsStyle,
      ticketsGridStyle,
      ticketCardStyle,
      ticketContentStyle,
      ticketTitleStyle,
      ticketDescStyle,
      ticketDateStyle,
      ticketActionsStyle,
      btnEditStyle,
      btnDeleteStyle
    }
  }
}
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  .ticket-card {
    flex-direction: column;
  }
}
</style>