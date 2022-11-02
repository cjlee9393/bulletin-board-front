import { render, screen } from '@testing-library/react';
import { DocumentList } from './DocumentList';

test('Document list shows the right texts', () => {
  const d1 = 'document name 1';
  const d2 = 'document name 2';

  render(<DocumentList documents={[d1, d2]} />);
  
  const d1Element = screen.getByText(d1);
  expect(d1Element).toBeInTheDocument();

  const d2Element = screen.getByText(d2);
  expect(d2Element).toBeInTheDocument();
});