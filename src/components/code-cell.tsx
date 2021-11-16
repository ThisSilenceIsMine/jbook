import { useState } from 'react';

import { CodeEditor } from 'components/code-editor';
import { Preview } from 'components/preview';
import { Resizable } from 'components/resizable';

import { bundle } from 'bundler';

export const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const result = await bundle(input);

    setCode(result.outputFiles[0].text);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue=""
            onChange={(value) => {
              setInput(value);
            }}
          />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
