let toastId = 0;

export const toastEmitter = {
  listeners: [],
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  },
  emit(message, type = 'info') {
    this.listeners.forEach(fn => fn({ id: toastId++, message, type }));
  }
};
