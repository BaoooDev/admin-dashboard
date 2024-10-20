type LoginResponse = {
  user: UserType;
  tokens: {
    access: { token: string };
    refresh: { token: string };
  };
};

type LoginBody = {
  email: string;
  password: string;
};

type ExportBody = {
  from?: string;
  to?: string;
};
