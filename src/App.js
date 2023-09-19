import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header";
import Samples from "./components/pages/samples/SamplesPage.jsx";
import EditSongSample from "./components/pages/edit-sample/EditSamplePage.jsx";
import ShareSample from "./components/pages/ShareSamplePage.jsx";
import './App.css';

function App() { 
  return (
    <> 
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Samples />} />
          <Route path="/edit-sample" element={<EditSongSample />} />
          <Route path="/share-sample" element={<ShareSample />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
