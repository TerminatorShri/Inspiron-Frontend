import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MetadataPage from "./pages/MetadataPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metadata" element={<MetadataPage />} />
      </Routes>
    </Router>
  );
}
