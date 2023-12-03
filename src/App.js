import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Frontpage from './pages/Frontpage';
import About from './pages/About';
import EducationCert from './pages/EducationCert';
import ProjectExp from './pages/Project_exp';
import Skills from './pages/Skills';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';




const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Frontpage />
              <About />
              <ProjectExp />
              <Footer />
            </>
          }
        />
        <Route
          exact
          path="/education_and_certifications"
          element={
            <>
              <EducationCert /> <Footer />
            </>
          }
        />
        <Route
          exact
          path="/tech"
          element={
            <>
              <Skills />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
