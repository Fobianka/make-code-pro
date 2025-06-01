import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type UserType = {
  name: string;
  login: string;
  password?: string;
  phone?: string;
  id?: number;
};

const getUsers = async (): Promise<UserType[]> => {
  const usersResult = await fetch(`http://localhost:5000/users`);
  return await usersResult.json();
};

export const login = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: { message: string } }
>('user/login', async (userForm, { rejectWithValue }) => {
  const users: UserType[] = await getUsers();

  const checkUserLogin = users.find(
    (user) =>
      user.login === userForm.login && user.password === userForm.password
  );

  if (checkUserLogin) {
    return checkUserLogin;
  } else {
    return rejectWithValue({ message: 'Неверный логин или пароль' });
  }
});

export const registration = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: { message: string } }
>('user/registration', async (userForm, { rejectWithValue }) => {
  const users: UserType[] = await getUsers();

  const checkUser = users.some(
    (user) => user.login === userForm.login || user.phone === userForm.phone
  );

  if (checkUser) {
    return rejectWithValue({ message: 'Такой польователь уже существует' });
  }

  const result = await fetch(`http://localhost:5000/users`, {
    method: 'POST',
    body: JSON.stringify(userForm),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const user: UserType = await result.json();

  return user;
});

type InitialStateType = {
  user: UserType | null;
  error: null | string;
};

const initialState: InitialStateType = {
  user: null,
  error: null,
};

const registrationSlice = createSlice({
  name: 'userSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.error = action.payload ? action.payload.message : null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload?.message === 'Неверный логин или пароль') {
        state.error = action.payload ? action.payload.message : null;
      }
    });
  },
  reducers: {},
});

export default registrationSlice.reducer;
