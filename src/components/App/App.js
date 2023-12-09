import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import NotFound from '../elements/NotFound/NotFound';
import Movie from '../Movie/Movie';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:movieId" element={<Movie />} />
          <Route element={<NotFound />} />
          
        </Routes>
      </React.Fragment>
    </Router>
  );
};

export default App;
