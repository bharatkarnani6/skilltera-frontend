import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Route from "./Route/route";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
