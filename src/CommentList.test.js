import { render, screen } from '@testing-library/react';
import { CommentList } from './CommentList';
import { renderWithContext } from './test-utils/renderers'
import { useContext } from 'react';
import { WriterContext } from './contexts/WriterContext';
import { writers } from './data';

localStorage.setItem('writer', JSON.stringify(writers[0]));

test('CommentList shows the right texts', () => {
  const c1 = 'test comment1';
  const c2 = 'test comment2';

  const comments = [{
    cid: 1,
    content: c1,
  }, {
    cid: 2,
    content: c2,
  }];

  renderWithContext(<CommentList comments={comments} />);
  const c1Element = screen.getByText(c1);
  expect(c1Element).toBeInTheDocument();

  const c2Element = screen.getByText(c2);
  expect(c2Element).toBeInTheDocument();
});