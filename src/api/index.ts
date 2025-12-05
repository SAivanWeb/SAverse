import user from './modules/user';

export class ApiModules {
  user = user;
}

const apiModules = new ApiModules();

export type ApiInstance = ApiModules;

export default apiModules;
