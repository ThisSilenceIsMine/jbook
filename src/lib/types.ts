export enum CellType {
  CODE = 'code',
  TEXT = 'text',
}

export type Direction = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}
