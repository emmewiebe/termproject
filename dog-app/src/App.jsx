import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home.jsx";
import DogDetails from "./components/DogDetails.jsx";
import Favourites from "./components/Favourites.jsx";
import './styles.css'; 


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dog/:id" element={<DogDetails/>} />
    <Route path="/favourites" element={<Favourites /> } />

    </Routes>
    </BrowserRouter>
  )
}

export default App
