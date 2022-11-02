import { render, screen } from '@testing-library/react';
import { CommentListItem } from './CommentListItem';

test('CommentListItem shows the right text', () => {
  const content = 'test document content';

  const comment = {
    cid: 1,
    content: content,
  }

  render(<CommentListItem comment={comment} />);
  const contentElement = screen.getByText(content);
  expect(contentElement).toBeInTheDocument();
});