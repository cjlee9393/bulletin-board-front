import { render, screen } from '@testing-library/react';
import { Document } from './Document';

test('Document shows the right texts', () => {
  const name = 'test document name';
  const content = 'test document content';

  render(<Document documentName={name} documentContent={content} />);
  const nameElement = screen.getByText(name);
  expect(nameElement).toBeInTheDocument();

  const contentElement = screen.getByText(content);
  expect(contentElement).toBeInTheDocument();
});