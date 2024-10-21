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
