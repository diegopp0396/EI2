import React from 'react';
//import logo from './logo.svg';
import './AppClass6.css';
import Landing from './Components/layout/Landing';
import {BrowserRouter as Router,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
      </div>
    </Router>
  );
}

export default App;
