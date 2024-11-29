// __tests__/TodoScreen.test.tsx
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TodoScreen from '../TodoScreen.tsx'; // Ajusta la ruta según tu estructura

describe('TodoScreen Component', () => {
  test('should add a new task to the list', () => {
    const {getByTestId, getByText} = render(<TodoScreen />);

    // Obtener el input y el botón
    const taskInput = getByTestId('taskInput');
    const addButton = getByTestId('addButton');

    // Simular ingreso de texto y agregar tarea
    fireEvent.changeText(taskInput, 'Buy groceries');
    fireEvent.press(addButton);

    // Verificar que la nueva tarea aparece en la lista
    expect(getByText('Buy groceries')).toBeTruthy();
  });

  test('should mark a task as completed', () => {
    const {getByTestId, getByText} = render(<TodoScreen />);

    // Agregar una tarea
    const taskInput = getByTestId('taskInput');
    const addButton = getByTestId('addButton');
    fireEvent.changeText(taskInput, 'Walk the dog');
    fireEvent.press(addButton);

    // Completar la tarea
    const completeButton = getByTestId(/completeButton-/);
    fireEvent.press(completeButton);

    // Verificar que la tarea está marcada como completada
    const taskText = getByText('Walk the dog');
    expect(taskText.props.style).toMatchObject({
      textDecorationLine: 'line-through',
    });
  });

  test('should delete a task from the list', () => {
    const {getByTestId, queryByText} = render(<TodoScreen />);

    // Agregar una tarea
    const taskInput = getByTestId('taskInput');
    const addButton = getByTestId('addButton');
    fireEvent.changeText(taskInput, 'Read a book');
    fireEvent.press(addButton);

    // Eliminar la tarea
    const deleteButton = getByTestId(/deleteButton-/);
    fireEvent.press(deleteButton);

    // Verificar que la tarea ya no está en la lista
    expect(queryByText('Read a book')).toBeNull();
  });

  test('should not add an empty task', () => {
    const {getByTestId, queryByText} = render(<TodoScreen />);

    // Obtener el botón y simular presionarlo sin ingresar texto
    const addButton = getByTestId('addButton');
    fireEvent.press(addButton);

    // Verificar que ninguna tarea fue agregada
    expect(queryByText('')).toBeNull();
  });
});

describe('Deleting a task', () => {
  it('should remove the task from the list', () => {
    // Given: Una lista con una tarea
    const {getByTestId, getByText, queryByText} = render(<TodoScreen />);
    const taskInput = getByTestId('taskInput');
    const addButton = getByTestId('addButton');

    // Agregar una tarea
    fireEvent.changeText(taskInput, 'Write tests');
    fireEvent.press(addButton);

    // Verificar que la tarea existe
    const taskText = getByText('Write tests');
    expect(taskText).toBeTruthy();

    // When: El usuario presiona el botón "Delete"
    const deleteButton = getByTestId(/deleteButton-/); // Encuentra el botón "Delete" de la tarea
    fireEvent.press(deleteButton);

    // Then: La tarea ya no debería aparecer en la lista
    expect(queryByText('Write tests')).toBeNull();
  });
});
