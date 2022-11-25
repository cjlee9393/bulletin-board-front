import { render, screen } from '@testing-library/react';
import { CommentListItem } from './CommentListItem';
import { renderWithContext } from './test-utils/renderers';
import { writers } from './data';

localStorage.setItem('writer', JSON.stringify(writers[0]));

test('CommentListItem shows the right text', () => {
  const content = 'test document content';

  const comment = {
    cid: 1,
    content: content,
  }

  renderWithContext(<CommentListItem comment={comment} />);
  const contentElement = screen.getByText(content);
  expect(contentElement).toBeInTheDocument();
});