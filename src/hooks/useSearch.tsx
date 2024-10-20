import { useCallback, useState } from 'react';

const useSearch = (search?: CommonSearch) => {
  const [dataSearch, setDataSearch] = useState({ page: 1, limit: 10, ...search });

  const onSearchChange = useCallback((search: CommonSearch) => {
    setDataSearch((current) => ({
      ...current,
      page: 0,
      ...search,
    }));
  }, []);

  return [dataSearch, onSearchChange] as [CommonSearch, (search: CommonSearch) => void];
};

export default useSearch;
