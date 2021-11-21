import 'bulmaswatch/superhero/bulmaswatch.min.css';
// import { CodeCell } from 'components/CodeCell';
import { TextEditor } from 'components/TextEditor';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

const App = () => {
  return (
    <Provider store={store}>
      <TextEditor />
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));
