import type { App, InjectionKey } from 'vue';
import api, { type ApiInstance } from '@/api';

export const apiKey: InjectionKey<ApiInstance> = Symbol('api');

export default {
  install(app: App) {
    app.config.globalProperties.$api = api;
    app.provide(apiKey, api);
  }
};
