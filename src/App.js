import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header";
import Samples from "./components/pages/samples/SamplesPage.jsx";
import EditSongSample from "./components/pages/edit-sample/EditSamplePage.jsx";
import ShareSample from "./components/pages/sharing/ShareSamplePage.jsx";
import './App.css';

/**
 * Create router to display distinct pages with routing.
 * @returns React router DOM with header, footer and pages.
 */
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <Samples />} />
        <Route path="/edit-sample"
          element={<EditSongSample />} />
        <Route path="/share-sample" element={<ShareSample />} />
      </Routes>
      <Footer />
    </Router>
  );
}

