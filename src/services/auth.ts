import { client } from './axios';

const login = (body: any): Promise<any> => client.post(`/login`, body);
const getPendingWorkers = (): Promise<any> => client.get(`/pendingWorkers`);
const reviewWorker = ({ id, ...body }: any): Promise<any> => client.put(`/reviewWorker/${id}`, body);
const cancelJob = ({ id, ...body }: any): Promise<any> => client.delete(`/jobs/${id}/cancel`,body);
const getServices = (): Promise<any> => client.get(`/services`);
const updateService = ({ id, ...body }: any): Promise<any> => client.put(`/service/${id}`, body);
const getMonthlyRevenue = (): Promise<any> => client.get(`/stats/monthly-revenue`);
const getTotalRevenue = (): Promise<any> => client.get(`/stats/total-revenue`);
const getServiceRevenue = (): Promise<any> => client.get(`/stats/service-revenue`);
const getMostBookedService = (): Promise<any> => client.get(`/stats/most-booked-service`);
const getWorkerRankings = (): Promise<any> => client.get(`/stats/worker-rankings`);
const getTopClients = (): Promise<any> => client.get(`/stats/top-clients`);
const getWorkerReviews = (): Promise<any> => client.get(`/reviews/workers`);
const getJobReviews = (): Promise<any> => client.get(`/reviews/jobs`);

const getAllJobs = (params: {
  page: number;
  limit: number;
  service?: string;
  status?: string;
  payment_status?: string;
  worker?: string;
  client?: string;
  sortBy?: string;
  order?: string;
}): Promise<any> => client.get(`/stats/jobs`, { params });

const getAllWorkers = (): Promise<any> => client.get(`/stats/workers`);

const authService = {
  login,
  getPendingWorkers,
  reviewWorker,
  getServices,
  updateService,
  getMonthlyRevenue,
  getTotalRevenue,
  getServiceRevenue,
  getMostBookedService,
  getWorkerRankings,
  getTopClients,
  getAllJobs,
  getAllWorkers,
  cancelJob,
  getWorkerReviews,
  getJobReviews
};

export default authService;
