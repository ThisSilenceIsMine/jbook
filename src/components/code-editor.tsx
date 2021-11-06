import MonacoEditor, { OnMount } from '@monaco-editor/react';

export interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
  const onEditorDidMount: OnMount = (editor) => {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    })
  }

  return (
    <MonacoEditor
      value={initialValue}
      onMount={onEditorDidMount}
      height="500px"
      theme="vs-dark"
      language="javascript"
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};
