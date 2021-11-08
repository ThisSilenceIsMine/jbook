import { useState } from 'react';

import { CodeEditor } from 'components/code-editor';
import { Preview } from 'components/preview';

import { bundle } from 'bundler';

export const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const result = await bundle(input);

    setCode(result.outputFiles[0].text);
  };

  return (
    <>
      <CodeEditor
        initialValue="Hello"
        onChange={(value) => {
          setInput(value);
        }}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </>
  );
};
