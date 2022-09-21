import './add-block.css';
type Props = {
  onAddTextBlock: () => void;
  onAddCodeBlock: () => void;
};

export const AddBlock = ({ onAddTextBlock, onAddCodeBlock }: Props) => {
  return (
    <div className="container">
      <span className="add-cell" onClick={onAddCodeBlock}>
        New Code Block
      </span>
      <span className="add-cell" onClick={onAddTextBlock}>
        New Text Block
      </span>
    </div>
  );
};
