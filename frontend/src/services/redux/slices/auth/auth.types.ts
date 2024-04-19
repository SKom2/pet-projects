import { IUser } from '@/utils/types';

export interface IAuthResponse {
  accessToken: string,
  user: IUser,
  isLoading: boolean,
  error: string,
}

export interface ILoginFormData {
  email: string,
  password: string,
}

export interface IRegisterFormData {
  name: string,
  email: string,
  password: string,
}
