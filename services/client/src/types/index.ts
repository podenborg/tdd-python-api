export type User = {
  id: number;
  username: string;
  email: string;
  created_date?: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export interface AddUserFormData {
  username: string;
  email: string;
  password: string;
}

export type RegisterFormData = AddUserFormData;

export type LoginFormData = Omit<AddUserFormData, "username">;

export type LoginFormResponse = Tokens;
