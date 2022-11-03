import { render, screen } from '@testing-library/react';
import { Document } from './Document';
import { documents } from './data';

test('Document shows the right texts', () => {
  const document = documents[0];
  const name = document.documentname;
  const content = document.content;

  render(<Document document={document} />);
  const nameElement = screen.getByText(name);
  expect(nameElement).toBeInTheDocument();

  const contentElement = screen.getByText(content);
  expect(contentElement).toBeInTheDocument();
});