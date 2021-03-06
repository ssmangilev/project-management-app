import { FileInterface } from '../../types';
export default interface BoardCardProps {
  id: string;
  title: string;
  description: string;
  columnsCount?: number;
  tasksCount?: number;
  files?: FileInterface[];
}
