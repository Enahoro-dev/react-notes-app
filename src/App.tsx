import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import NotesListPage from './pages/notesListPage';
import NotesPage from './pages/notesPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<NotesListPage/>}/>
      <Route path='/note/:id' element={<NotesPage/>}/>
    </Routes>
    
  );
}

export default App;
