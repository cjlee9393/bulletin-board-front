import './App.css';
import { DocumentListHeader } from './DocumentListHeader';
import { DocumentListItem } from './DocumentListItem';
import { documents } from './data';
import { DocumentListPage } from './DocumentListPage';
import { DocumentPage } from './DocumentPage';

import { MemoryRouter, Routes, Route } from 'react-router-dom';

function App() {
  const name = 'test document name';
  const content = 'some content';
  const did = 2;

  const document = {
    did: did,
    documentName: name,
    content: content
  }

  return (
    <>
      <MemoryRouter initialEntries={['/documents/1']}>
            <Routes>
                <Route path={'/documents/:did'} element={<DocumentPage />} />
            </Routes>
      </MemoryRouter>
    </>
  );
}

export default App;
