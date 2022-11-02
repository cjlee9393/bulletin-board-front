import { render, screen } from '@testing-library/react';
import { DocumentList } from './DocumentList';
import { renderWithRouter } from './test-utils/renderers';

test('Document list shows the right texts', () => {
  const d1 = 'document name 1';
  const d2 = 'document name 2';

  const documents = [
    {
      did: 1,
      documentname: d1,
      content: ''
    },
    {
      did: 2,
      documentname: d2,
      content: ''
    }
  ]

  renderWithRouter(<DocumentList documents={documents} />);
  
  const d1Element = screen.getByText(d1);
  expect(d1Element).toBeInTheDocument();

  const d2Element = screen.getByText(d2);
  expect(d2Element).toBeInTheDocument();
});