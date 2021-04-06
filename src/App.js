import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from './redux/store';
import Memestream from './components/Memestream';
const store = Store()

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Memestream />
          </div>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
