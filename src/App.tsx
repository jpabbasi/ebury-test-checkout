import React from 'react';
import './App.css';
import CardForm from './components/CardForm';
import { handleFormSubmit } from './services/submitHandlers';

const App: React.FC = () => {
  return (
    <div className="App">
      <CardForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
