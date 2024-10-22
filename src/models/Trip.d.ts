type TripRecordType = {
  id: string;
  timeOccurence: string;
  pathOne: string;
  pathSecond: string;
  pathThree: string;
  pathFour: string;
  pathFive: string;
  status: string;
  value: string;
  indicator: string;
  isChecked: boolean;
};

type ExportBody = {
  from?: string;
  to?: string;
  search?: string;
};

type TripParams = ExportBody & PaginateParams;

type TripPaginateType = PaginateType & {
  results: TripRecordType[];
};

type TripCountType = {
  pathSecond: string;
  count: number;
};
