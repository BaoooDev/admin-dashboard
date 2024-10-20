type ProfileRecordType = UserRecordType & {
  accessToken?: string;
  refreshToken?: string;
  isLoggedIn: boolean;
};

type UserRecordType = {
  id?: number;
  name?: string;
  role?: string;
  email?: string;
  isEmailVerified?: boolean;
};
