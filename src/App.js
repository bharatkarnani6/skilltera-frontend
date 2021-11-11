import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Home from './Pages/Home/home';
import Route from './Route/route';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    </>
  );
}

export default App;
