import { render, screen } from '@testing-library/react';
import { DocumentListItem } from './DocumentListItem';

test('DocumentListItem contains the document name', () => {
  const name = 'test document name';

  render(<DocumentListItem documentName={name} />);
  const nameElement = screen.getByText(name);
  expect(nameElement).toBeInTheDocument();
});