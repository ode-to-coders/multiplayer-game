export type SignInRequestBody = {
  login: string;
  password: string;
};

export type SignUpRequestBody = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponse = {
  id: number;
};

export type UserInfoResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type ServiceIdResponse = {
  service_id: string;
};

export type ServiceIdParams = {
  redirect_uri: string;
};

export type SignInYandexRequestBody = {
  code: string;
  redirect_uri: string;
};
