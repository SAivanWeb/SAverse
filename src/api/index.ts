import user from './modules/user';
import galaxy from "./modules/galaxy"; 

export class ApiModules {
  user = user;
  galaxy = galaxy
}

const apiModules = new ApiModules();

export type ApiInstance = ApiModules;

export default apiModules;
