import 'bulmaswatch/superhero/bulmaswatch.min.css';
// import { CodeCell } from 'components/CodeCell';
import { TextEditor } from 'components/TextEditor';
import ReactDom from 'react-dom';

const App = () => {
  return (
    <>
      <TextEditor />
    </>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));
