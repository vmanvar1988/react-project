import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import Movie from './components/Movie';
import MovieDetail from './components/MovieDetail';

import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

function App() {
  return (
   <Router>
    <div>
      <header>
		<Routes>
			<Route exact path='/movie/' element={< Movie />}></Route>
			<Route exact path='/detail/:id' element={< MovieDetail />}></Route>
		</Routes>
      </header>
    </div>
	</Router>
  );
}

export default App;
