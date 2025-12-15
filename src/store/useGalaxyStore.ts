import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'
import type { ApiInstance } from '@/api'
import type { Galaxy, GalaxyListResponse, GalaxyResponse, GalaxyResponseData } from '@/api/modules/types/galaxy'
import { useLoadingStore } from '@/store/useLoadingStore'

export const useGalaxyStore = defineStore('useGalaxyStore', () => {
  const galaxies = ref<Galaxy[] | null>(null)
  const galaxy = ref<GalaxyResponseData | null>(null)

  const apiInstance: ApiInstance = api
  const loadingStore = useLoadingStore()

  async function fetchGalaxies() {
    loadingStore.startLoading()
    try {
      const response: GalaxyListResponse = await apiInstance.galaxy.fetchGalaxies()
      galaxies.value = response.data
      return true
    } finally {
      loadingStore.stopLoading()
    }
  }

  async function fetchGalaxy(id: number) {
    loadingStore.startLoading()
    try {
      const response: GalaxyResponse = await apiInstance.galaxy.fetchGalaxyById(id)
      galaxy.value = response.data
      return true
    } finally {
      loadingStore.stopLoading()
    }
  }

  return { galaxies, galaxy, fetchGalaxies, fetchGalaxy }
})