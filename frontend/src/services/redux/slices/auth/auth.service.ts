import { IAuthResponse, ILoginFormData, IRegisterFormData } from '@/services/redux/slices/auth/auth.types';
import { axiosClassic, instance } from '@/api/axios';

export enum Tokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken'
}

export const authService = {
  async register(data: IRegisterFormData) {
    return await axiosClassic.post<IAuthResponse>(
      `/api/auth/register`,
      data
    )
  },

  async login(data: ILoginFormData) {
    return await axiosClassic.post<IAuthResponse>(
      `/api/auth/login`,
      data
    )
  },

  async getNewTokens(){
    return await axiosClassic.post<IAuthResponse>(
      `/api/auth/login/access-token`
    )
  },

  async logout() {
    return await axiosClassic.post<boolean>(
      '/api/auth/logout',
    )
  },

  async user(){
    return instance.get('/api/auth/user')
  }
}