import { NewComment } from './NewComment';
import { render, screen, fireEvent } from '@testing-library/react';
import { writers, comments } from './data';

test('open NewComment with actionName and onAction generate corresponding buttons', () => {
    const mockFn1 = jest.fn();
    const mockFnName1 = '저장';

    const mockFn2 = jest.fn();
    const mockFnName2 = '취소';

    const actions = [
        {actionName: mockFnName1, onAction: mockFn1},
        {actionName: mockFnName2, onAction: mockFn2},
    ]

    render(<NewComment writer={writers[0]} actions={actions} />);

    fireEvent.click(screen.getByText(/저장/i));
    fireEvent.click(screen.getByText(/취소/i));

    expect(mockFn1).toHaveBeenCalled();
    expect(mockFn2).toHaveBeenCalled();
})

test('open NewComment with initialEntry has initialEntry in the text box', () => {
    const comment = comments[0];
    const content = comments[0].content;
    
    render(<NewComment writer={writers[0]} comment={comment} />);

    expect(screen.getByText(content)).toBeInTheDocument();
})