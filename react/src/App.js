import { BrowserRouter } from 'react-router-dom';
import Layout from './components/appLayout/Layout';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
