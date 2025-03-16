export class TaskDTO {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: Date;
  userId: string;
  created_at: string;
  updated_at: string;
}

export interface FindAllDTO {
  title: string;
  status: string;
  userId: string;
}
