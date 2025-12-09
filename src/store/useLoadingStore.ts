import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loadingStore', () => {
  // глобальный флаг
  const loading = ref(false)
  // счётчик параллельных запросов
  const pendingCount = ref(0)

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

  return {
    loading,
    pendingCount,
    startLoading,
    stopLoading,
    resetLoading
  }
})
