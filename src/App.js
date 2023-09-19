import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Samples from "./components/pages/Samples";
import EditSongSample from "./components/pages/EditSongSample";
import ShareSample from "./components/pages/ShareSample";
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Samples />} />
        <Route path="/edit-sample" element={<EditSongSample />} />
        <Route path="/share-sample" element={<ShareSample />} />
      </Routes>
    </Router>

  );
}

export default App;
