import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { inject, ref } from 'vue';
import type {AuthResponse, AuthData, currentUserResponse} from '@/api/modules/types/user';
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

  const errorMessage = ref<string | null>(null);
  const currentUser = ref<string>('');

  async function register(payload: AuthData) {
    loadingStore.startLoading();
    errorMessage.value = null;

    try {
      const response: AuthResponse = await api.user.register(payload);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      return true;
    } catch (error) {
      if (error === 'Email already taken') {
        loadingStore.setMessage('error', 'Пользователь с таким Email уже существует');
      } else {
        loadingStore.setMessage('error', 'Непредвиденная ошибка регистрации')
      }
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
      return true;
    } catch (error) {
      if (error === 'Invalid credentials') {
        loadingStore.setMessage('error', 'Неверный логин или пароль');
      } else {
        loadingStore.setMessage('error', 'Непредвиденная ошибка авторизации')
      }
    } finally {
      loadingStore.stopLoading();
    }
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/');
    currentUser.value = '';
  }

  async function initUser() {
    loadingStore.startLoading();
    errorMessage.value = null;

    try {
      const response: currentUserResponse = await api.user.currentUser();
      currentUser.value = response.data.email;
      return true;
    } catch (error) {
      errorMessage.value =
        typeof error === 'string' ? error : 'Ошибка получения пользователя';
      throw error;
    } finally {
      loadingStore.stopLoading();
    }
  }

  return {
    currentUser,
    errorMessage,
    register,
    login,
    logout,
    initUser
  };
});
