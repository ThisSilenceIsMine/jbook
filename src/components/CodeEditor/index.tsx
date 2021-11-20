import './code-editor.css';
import './syntax.css';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';

const babelParse = (code: string) =>
  parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

export interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });

    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      babelParse,
      traverse,
      editor
    );

    monacoJSXHighlighter.highLightOnDidChangeModelContent(
      100,
      () => {},
      () => {},
      undefined,
      () => {}
    );

    monacoJSXHighlighter.addJSXCommentCommand();
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        // useTabs: false,
        singleQuote: true,
        tabWidth: 2,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        onMount={onEditorDidMount}
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
    </div>
  );
};
