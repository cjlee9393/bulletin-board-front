import './App.css';
import { NavBar } from './NavBar';
import { DocumentListPage } from './DocumentListPage';
import { DocumentPage } from './DocumentPage';
import { DocumentsProvider } from './DocumentsProvider';

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { boards } from './data';
import { useEffect, useState } from 'react';
import { Login } from './Login';
import { useWriter } from './hook-utils/hooks';
import { MainPage } from './MainPage';

function App() {
  const {writer, setWriter} = useWriter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    console.log('useEffect hook is run');
    const currentState = writer !== null;
    setIsLoggedIn(currentState);
  }, [writer])

  if (!isLoggedIn) return (
    <Login setIsLoggedIn={setIsLoggedIn} />
  )

  return (
    <>
      <MemoryRouter initialEntries={['/']}>
        <NavBar isLoggedIn={false} setIsLoggedIn={setIsLoggedIn} boards={boards} />
        <DocumentsProvider>
          <Routes>
              <Route path={'/'} element={<MainPage />}/>
              <Route exact path={'/boards/:bid'} element={<DocumentListPage 
                  writer={writer}
                />} 
              />
              <Route exact path={'/documents/:did'} element={<DocumentPage 
                  writer={writer} 
                  documents={documents}
                  setDocuments={setDocuments}
                />} 
              />
          </Routes>
        </DocumentsProvider>
      </MemoryRouter>
    </>
  );
}

export default App;
