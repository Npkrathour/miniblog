import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router";
import About from "./Pages/About";
import AddEditBlog from "./Pages/AddEditBlog";
import Authentication from "./Pages/Authentication";
import Details from "./Pages/Details";
import NotFound from "./Pages/NotFound";
import Header from "./Components/Header";
// import Auth from "./Pages/Auth";

function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<AddEditBlog />} />
        <Route path="/update/:id" element={<AddEditBlog />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
