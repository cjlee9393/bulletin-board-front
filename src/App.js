import './App.css';
import { DocumentListHeader } from './DocumentListHeader';
import { DocumentListItem } from './DocumentListItem';
import { documents } from './data';

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
    <DocumentListItem document={documents[0]} />
    </>
  );
}

export default App;
