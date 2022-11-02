import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentListItem } from './DocumentListItem';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import { renderWithRouter } from './test-utils/renderers';

const name = 'test document name';
const content = 'some content';
const did = 2;

const document = {
  did: did,
  documentname: name,
  content: content
}

test('DocumentListItem contains the document name', () => {
  renderWithRouter(<DocumentListItem document={document} />);

  const nameElement = screen.getByText(name);
  expect(nameElement).toBeInTheDocument();
});

test('DocumentListItem navigates to url \'documents/:did\' on click', () => {
  const fakeHistory = createMemoryHistory();

  renderWithRouter(<DocumentListItem document={document} />, fakeHistory);

  fireEvent.click(screen.getByText(name));

  expect(fakeHistory.location.pathname).toEqual(`/documents/${did}`);
});