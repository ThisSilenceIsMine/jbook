import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { AddBlock } from 'components/AddBlock';
import { CodeCell } from 'components/CodeCell';
import { TextEditor } from 'components/TextEditor';
import { useState } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

const App = () => {
  const [cells, setCells] = useState([<TextEditor />]);
  const addCodeCell = () => {
    setCells((c) => [...c, <CodeCell />]);
  };
  const addTextCell = () => {
    setCells((c) => [...c, <TextEditor />]);
  };

  return (
    <Provider store={store}>
      {cells}
      <AddBlock onAddCodeBlock={addCodeCell} onAddTextBlock={addTextCell} />
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));
