import {BrowserRouter} from "react-router-dom"
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Layout } from "./layouts/Layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
    <App />  
    </Layout>
  </BrowserRouter>
);
