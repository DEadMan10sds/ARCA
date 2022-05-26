import 'normalize.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {

  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path= "/" element={<Home/>}/>
      </Routes>
    <Footer />
    </Router>
  );
}

export default App;
