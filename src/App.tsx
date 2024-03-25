// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import SpaPage from './Pages/SpaPage';
import ButtonShapes from './Pages/ButtonShapes';
import Home from './Pages/HomePage';

import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Button' element={<ButtonShapes />} />
          <Route path='/Form' element={<SpaPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
