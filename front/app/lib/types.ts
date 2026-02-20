export type ParamsResponse<T>  = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: boolean;
  content: T;
  number: number;
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  numberOfElements: number,
  pageable: {
    pageNumber: number,
    pageSize: number,
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    },
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  empty: boolean;
}