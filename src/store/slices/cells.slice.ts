import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell, CellType, Direction } from 'lib/types';
import { nanoid } from 'nanoid';

interface SliceState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: SliceState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    updateCell: (state, action: PayloadAction<UpdateCellAction>) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];

      state.order = state.order.filter((id) => id !== action.payload);
    },
    moveCell: (state, action: PayloadAction<MoveCellAction>) => {
      const { direction } = action.payload;

      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    insertCellBefore: (state, action: PayloadAction<InsertCellAction>) => {
      const newCell: Cell = {
        content: '',
        type: action.payload.type,
        id: nanoid(),
      };

      state.data[newCell.id] = newCell;

      const index = state.order.findIndex((id) => id === action.payload.id);

      if (index < 0) {
        state.order.push(newCell.id);
      } else {
        state.order.splice(index, 0, newCell.id);
      }
    },
  },
});

export const { moveCell, deleteCell, insertCellBefore, updateCell } =
  cellsSlice.actions;

export default cellsSlice.reducer;

interface MoveCellAction {
  id: string;
  direction: Direction;
}

interface InsertCellAction {
  id: string | null;
  type: CellType;
}

interface UpdateCellAction {
  id: string;
  content: string;
}
