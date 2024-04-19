import axios, { CreateAxiosDefaults } from 'axios';
import { errorCatch, getContentType } from './api.helper';
import { getTokenFromStorage, removeAccessToken, saveAccessToken } from '@/services/redux/slices/auth/auth.helpers';
import { API_URL } from '@/utils/constants';
import { authService } from '@/services/redux/slices/auth/auth.service';

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true
}

export const axiosClassic = axios.create(axiosOptions);

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use(config => {
  const accessToken = getTokenFromStorage()
  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 ||
          errorCatch(error) === 'jwt expired' ||
          errorCatch(error) === 'jwt must be provided') &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true
        try {
          const response = await authService.getNewTokens()
          saveAccessToken(response.data.accessToken)
          return instance.request(originalRequest)
        } catch (error){
          if (errorCatch(error) === 'jwt expired') removeAccessToken()
        }
    }
    throw error
    }
)