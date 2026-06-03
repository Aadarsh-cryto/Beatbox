import { Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UploadMusic from "./pages/UploadMusic";
import CreateAlbum from "./pages/CreateAlbum";
import AlbumDetails from "./pages/AlbumDetails";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="app">
      <Navbar />
      
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadMusic />} />
        <Route path="/create-album" element={<CreateAlbum />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
      </Routes>
    </div>
  );
}

export default App;