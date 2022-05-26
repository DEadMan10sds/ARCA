import 'normalize.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './pages/Home';


function App() {

  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path= "/Home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
