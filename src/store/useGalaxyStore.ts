import { defineStore } from 'pinia'
import {inject, ref} from 'vue'
import {Galaxy, GalaxyListResponse, type GalaxyResponse, GalaxyResponseData} from "@/api/modules/types/galaxy";
import { apiKey } from '@/plugins/api';
import type { ApiInstance } from '@/api';
import { useLoadingStore } from '@/store/useLoadingStore';

export const useGalaxyStore = defineStore('useGalaxyStore', () => {
  const galaxies = ref<Galaxy[] | null>();
  const galaxy = ref<GalaxyResponseData | null>();

  const api = inject<ApiInstance>(apiKey)!;
  if (!api) {
    throw new Error('Api plugin is not provided');
  }

  const loadingStore = useLoadingStore();

  async function fetchGalaxies() {
    loadingStore.startLoading();
    try {
      const response: GalaxyListResponse = await api.galaxy.fetchGalaxies();
      galaxies.value = response.data
      return true;
    } catch (error) {
      throw error;
    } finally {
      loadingStore.stopLoading();
    }
  }

  async function fetchGalaxy(id: number) {
    loadingStore.startLoading();
    try {
      const response: GalaxyResponse = await api.galaxy.fetchGalaxyById(id);
      galaxy.value = response.data
      return true;
    } catch (error) {
      throw error;
    } finally {
      loadingStore.stopLoading();
    }
  }





  return {
    galaxies,
    galaxy,
    fetchGalaxies,
    fetchGalaxy,

  }
})