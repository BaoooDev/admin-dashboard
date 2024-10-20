type PaginateParams = {
  search?: string;
  page?: number;
  size?: number;
  orderBy?: string;
  desc?: string | number | boolean;
  populate?: string;
};

type PaginateType = {
  page: number;
  limit: number;
  totalResults: number;
  totalPages: number;
};

type PopupController = {
  onSuccess?: () => void;
  onClose: () => void;
};

type CommonSearch = {
  page?: number;
  limit?: number;
  [key: string]: Object;
};

type SearchController = {
  onChange: (search: CommonSearch) => void;
};

type CommonRecordType = {
  id: number;
  createdAt: string;
  updatedAt: string;
};
