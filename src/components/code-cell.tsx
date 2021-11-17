import { useEffect, useState } from 'react';

import { CodeEditor } from 'components/code-editor';
import { Preview } from 'components/preview';
import { Resizable } from 'components/resizable';

import { bundle } from 'bundler';
import { useDebounce } from 'hooks';

export const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const debouncedInput = useDebounce(input, 1000);

  useEffect(() => {
    if (debouncedInput) {
      (async () => {
        try {
          const result = await bundle(debouncedInput);
          setCode(result.code);
          setError(result.error);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [debouncedInput]);

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
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};
