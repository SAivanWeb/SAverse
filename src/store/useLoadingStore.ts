import { defineStore } from 'pinia'
import { ref } from 'vue'
type MessageType = "success" | "error" | "warning" | "info" | "";
interface Message {
  type: MessageType;
  message: string;
}

export const useLoadingStore = defineStore('loadingStore', () => {
  // глобальный флаг
  const loading = ref(false)
  // счётчик параллельных запросов
  const pendingCount = ref(0)
  const message = ref<Message>({
    type: '',
    message: '',
  })
  function startLoading() {
    pendingCount.value += 1
    loading.value = true
  }

  function stopLoading() {
    pendingCount.value = Math.max(0, pendingCount.value - 1)
    if (pendingCount.value === 0) {
      loading.value = false
    }
  }

  function resetLoading() {
    pendingCount.value = 0
    loading.value = false
  }

  const setMessage = (type: MessageType, text: string) => {
    message.value.type = type;
    message.value.message = text;
  }

  const clearMessage = () => {
    message.value.message = '';
    message.value.type = '';
  }

  return {
    loading,
    pendingCount,
    message,
    startLoading,
    stopLoading,
    setMessage,
    clearMessage,
  }
})
