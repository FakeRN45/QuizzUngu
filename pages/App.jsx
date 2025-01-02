import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from "./components/Room";
import QuizPage from "./components/QuizPage";
import { QuizProvider } from "./components/QuizContext";

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Room />} />
          <Route path="/quiz/:category" element={<QuizPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;