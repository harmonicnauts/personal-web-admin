import { Item } from "./Item";

export interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Item) => void;
  item: Item | null;
  type: string;
}
