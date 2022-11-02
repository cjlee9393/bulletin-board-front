import { render, screen } from '@testing-library/react';
import { CommentListItem } from './CommentListItem';

test('CommentListItem shows the right text', () => {
  const content = 'test document content';

  render(<CommentListItem commentContent={content} />);
  const contentElement = screen.getByText(content);
  expect(contentElement).toBeInTheDocument();
});