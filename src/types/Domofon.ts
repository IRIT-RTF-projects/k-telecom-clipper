export interface Domofon {
  id: string;
  address: string;
  entrance: string;
  isOnline: boolean;
  lastActive?: string;
}

export interface DomofonListResponse {
  domofons: Domofon[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}