import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import { NavBar } from './components/NavBar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';



function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}>
              </Route>

              <Route exact path="/users" >
              </Route>

              <Route exact path="/about" element={<About />}>
              </Route>

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
