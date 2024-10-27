import { client } from './axios';

const login = (body: LoginBody): Promise<LoginResponse> => client.post(`/auth/login`, body);
const fetchUsers = (params?: UserParams): Promise<UserPaginateType> => client.get(`/users`, { params });
const updateUser = ({ id, ...body }: UpdateUserBody): Promise<UserRecordType> => client.put(`/users/${id}`, body);
const createUser = (body: UserPayloadType): Promise<UserRecordType> => client.post(`/users`, body);

const queryDashboard = (): Promise<TripCountType[]> => client.get(`/trips/dashboard`);
const fetchTrips = (params?: TripParams): Promise<TripPaginateType> => client.get(`/trips`, { params });
const getTripsInMonth = (params?: TripParams): Promise<TripRecordType[]> => client.get(`/trips/in-month`, { params });
const importExcel = (body: FormData): Promise<TripRecordType[]> => client.post(`/trips/import`, body);
const exportExcel = (body?: ExportBody): Promise<Blob> => client.post(`/trips/export`, body, { responseType: 'blob' });

const authService = {
  login,
  exportExcel,
  importExcel,
  fetchUsers,
  fetchTrips,
  updateUser,
  createUser,
  queryDashboard,
  getTripsInMonth,
};

export default authService;
