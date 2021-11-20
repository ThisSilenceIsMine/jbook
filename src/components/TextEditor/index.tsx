import './text-editor.css';

import MDEditor from '@uiw/react-md-editor';
import { useOnClickOutside } from 'hooks';
import { useRef, useState } from 'react';

export const TextEditor = () => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState('# Edit me!');
  const previewRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(previewRef, () => {
    setEditing(false);
  });

  if (editing) {
    return (
      <div className="text-editor" ref={previewRef}>
        <MDEditor value={text} onChange={(value) => setText(value ?? '')} />
      </div>
    );
  }

  return (
    <div className="card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={text} />
      </div>
    </div>
  );
};
