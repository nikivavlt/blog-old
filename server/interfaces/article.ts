import type { RowDataPacket } from 'mysql2';

interface IArticle extends RowDataPacket {
  id: number
  title: string
  description: string
  image: string
  url: string
  categoryId: number
  authorId: number
  createdAt: Date
  updatedAt: Date
};

export default IArticle;
