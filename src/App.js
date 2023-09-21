import './App.css';
import './components/Main';
import Main from './components/Main';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Provider>
    </div>
    
  );
}

export default App;
