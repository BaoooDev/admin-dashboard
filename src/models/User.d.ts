type ProfileRecordType = UserRecordType & {
  isLoggedIn: boolean;
};

type UserRecordType = {
  id?: number;
  name?: string;
  role?: string;
  email?: string;
  isEmailVerified?: boolean;
};
