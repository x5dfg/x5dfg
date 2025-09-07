import { HashRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Header from "./components/header/Header";

import Home from "./pages/Home/Home";
import Astrocreate from "./pages/Astrocreate/Astrocreate";
import Hasher from "./pages/Hasher/Hasher";
import Palettron from "./pages/Palettron/Palettron";

function NotFound() {
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <>
      <Header/>
      <Router>
        <Routes>
          <Route path="/hasher" element={<Hasher />} />
          <Route path="/palettron" element={<Palettron />} />
          <Route path="/astrocreate" element={<Astrocreate />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;