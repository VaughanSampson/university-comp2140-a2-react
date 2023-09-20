import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState} from "react";

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header";
import Samples from "./components/pages/samples/SamplesPage.jsx";
import EditSongSample from "./components/pages/edit-sample/EditSamplePage.jsx";
import ShareSample from "./components/pages/sharing/ShareSamplePage.jsx";
import './App.css';

function App() { 
  const [samplesList, setSamplesList] = useState([]);
  
  function updateSamplesList(newSample){
    const alteredSamplesList = samplesList;
    const index = samplesList.findIndex(sample => sample.title === newSample.title);
    if (index >= 0)
    {
      alteredSamplesList[index] = newSample;
    }
    else
    {
      alteredSamplesList.push(newSample); 
    }
    setSamplesList([...alteredSamplesList]); 
  }

  return (
    <> 
    <p>{samplesList.length}</p>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Samples sampleList={samplesList}/>} />
            <Route path="/edit-sample" element={<EditSongSample samples={samplesList} callbackOnSave={updateSamplesList}/>} />
            <Route path="/share-sample" element={<ShareSample samples={samplesList}/>} />
          </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
