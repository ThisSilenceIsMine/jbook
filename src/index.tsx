import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { CodeCell } from 'components/code-cell';
import ReactDom from 'react-dom';

const App = () => {
  return (
    <>
      <CodeCell />
    </>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));
