import { render, screen } from '@testing-library/react';
import { CommentList } from './CommentList';

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

  render(<CommentList comments={comments} />);
  const c1Element = screen.getByText(c1);
  expect(c1Element).toBeInTheDocument();

  const c2Element = screen.getByText(c2);
  expect(c2Element).toBeInTheDocument();
});