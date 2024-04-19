import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/redux/slices/auth/auth.service';
import { removeAccessToken, saveAccessToken } from '@/services/redux/slices/auth/auth.helpers';
import { IAuthResponse, ILoginFormData, IRegisterFormData } from '@/services/redux/slices/auth/auth.types';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: IRegisterFormData, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(data);
      const response = await authService.register(data);

      if (response) saveAccessToken(response.data.accessToken);

      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
)
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: ILoginFormData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authService.login(data);

      if (response.data.accessToken) {
        saveAccessToken(response.data.accessToken)
      }

      return fulfillWithValue(response)
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authService.logout();

      if (response.data) removeAccessToken()

      return fulfillWithValue(response)
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authService.user();

      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)
const initialState: IAuthResponse = {
  user: {
    id: null,
    email: '',
    name: '',
    password: ''
  },
  accessToken: '',
  isLoading: false,
  error: ''
}

interface IAuthActionPayload {
  data: {
    user: {
      id: string | null;
      email: string;
      name: string;
      password: string;
    };
    accessToken: string;
    response?: {
      data: {
        message: string;
      };
    };
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          user: action.payload.data.user,
          accessToken: action.payload.data.accessToken,
          error: ''
        }
      })
      .addCase(loginUser.rejected, (state, action:  PayloadAction<IAuthActionPayload | any>) => {
        return {
          ...state,
          isLoading: false,
          user: initialState.user,
          accessToken: '',
          error: action.payload.response.data.message,
        }
      })
      .addCase(registerUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          user: action.payload.data.user,
          accessToken: action.payload.data.accessToken,
          error: ''
        }
      })
      .addCase(registerUser.rejected, (state, action:  PayloadAction<IAuthActionPayload | any>) => {
        return {
          ...state,
          isLoading: false,
          user: initialState.user,
          accessToken: '',
          error: action.payload.response.data.message,
        }
      })
      .addCase(logout.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        }
      })
      .addCase(logout.fulfilled, (state) => {
        return {
          ...state,
          isLoading: false,
          user: initialState.user,
          accessToken: '',
        }
      })
      .addCase(logout.rejected, (state, action:  PayloadAction<IAuthActionPayload | any>) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload.response.data.message,
        }
      })
      .addCase(getCurrentUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          user: action.payload.data.user,
          error: ''
        }
      })
      .addCase(getCurrentUser.rejected, (state, action:  PayloadAction<IAuthActionPayload | any>) => {
        return {
          ...state,
          isLoading: false,
          user: initialState.user,
          error: action.payload.response.data.message,
        }
      })
  }
})

export const authReducer = authSlice.reducer;