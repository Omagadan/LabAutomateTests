import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TodoScreen from '../TodoScreen';

describe('Marking a task as complete', () => {
  it('should update the UI to show the task with a strikethrough', () => {
    const {getByTestId, getByText} = render(<TodoScreen />);
    const taskInput = getByTestId('taskInput');
    const addButton = getByTestId('addButton');

    fireEvent.changeText(taskInput, 'Learn BDD');
    fireEvent.press(addButton);

    const taskText = getByText('Learn BDD');
    expect(taskText).toBeTruthy();
    expect(taskText.props.style).not.toMatchObject({
      textDecorationLine: 'line-through',
    });

    const completeButton = getByTestId(/completeButton-/);
    fireEvent.press(completeButton);

    expect(taskText.props.style).toMatchObject({
      textDecorationLine: 'line-through',
    });
  });
});
