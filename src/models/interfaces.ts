export interface IRecord {
  id: number;
  name: string;
  address: string;
  amount: number;
  role: string;
  status: string;
}

export interface IParams {
  name: string;
  status: string;
  role: string;
}

export interface IModalProps {
  id?: number;
  isOpen: boolean;
  handleOpenModal: () => void;
}
