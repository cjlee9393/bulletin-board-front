import { NewDocument } from './NewDocument';
import { render, screen, fireEvent } from '@testing-library/react';
import { writers } from './data';

test('Click on \'저장\' button should run the function', () => {
    const mockFn = jest.fn();

    render(<NewDocument writer={writers[0]} onClickSave={mockFn} onClickCanel={() => {}}/>);

    fireEvent.click(screen.getByText(/저장/i));
  
    expect(mockFn).toHaveBeenCalled();
});

test('Click on \'취소\' button should run the function', () => {
    const mockFn = jest.fn();

    render(<NewDocument writer={writers[0]} onClickSave={() => {}} onClickCancel={mockFn}/>);

    fireEvent.click(screen.getByText(/취소/i));
  
    expect(mockFn).toHaveBeenCalled();
});