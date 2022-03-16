import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/home";
import Route from "./Route/route";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  console.log(process.env);
  return (
    <>
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    </>
  );
}

export default App;
