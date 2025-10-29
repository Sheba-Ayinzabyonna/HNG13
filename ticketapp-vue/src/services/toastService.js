import { reactive } from 'vue'

export const toastState = reactive({ toasts: [] })
let toastId = 0

export function showToast(message, type = 'info') {
  const id = toastId++
  toastState.toasts.push({ id, message, type })
  setTimeout(() => {
    const index = toastState.toasts.findIndex(t => t.id === id)
    if (index > -1) toastState.toasts.splice(index, 1)
  }, 3000)
}