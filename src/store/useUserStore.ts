import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { inject, ref } from 'vue';
import type { AuthResponse, AuthData } from '@/api/modules/types/user';
import { apiKey } from '@/plugins/api';
import type { ApiInstance } from '@/api';
import { useLoadingStore } from '@/store/useLoadingStore';

export const useUserStore = defineStore('useUserStore', () => {
  const router = useRouter();

  const api = inject<ApiInstance>(apiKey)!;
  if (!api) {
    throw new Error('Api plugin is not provided');
  }

  const loadingStore = useLoadingStore();

  const isAuth = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  async function register(payload: AuthData) {
    loadingStore.startLoading();
    errorMessage.value = null;

    try {
      const response: AuthResponse = await api.user.register(payload);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      isAuth.value = true;
      return true;
    } catch (error) {
      errorMessage.value =
        typeof error === 'string' ? error : 'Ошибка регистрации';
      throw error;
    } finally {
      loadingStore.stopLoading();
    }
  }

  async function login(payload: AuthData) {
    loadingStore.startLoading();
    errorMessage.value = null;

    try {
      const response: AuthResponse = await api.user.login(payload);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      isAuth.value = true;
      return true;
    } catch (error) {
      errorMessage.value =
        typeof error === 'string' ? error : 'Ошибка авторизации';
      throw error;
    } finally {
      loadingStore.stopLoading();
    }
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    isAuth.value = false;
    router.push('/');
  }

  return {
    isAuth,
    errorMessage,
    register,
    login,
    logout
  };
});
