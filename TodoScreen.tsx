// TodoScreen.tsx
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  //   TouchableOpacity,
} from 'react-native';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  let idTask = 0;
  const addTask = () => {
    if (!task) {
      return;
    }
    setTasks([...tasks, {id: idTask.toString(), text: task, completed: false}]);
    setTask('');
    idTask++;
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    idTask--;
  };

  return (
    <View>
      <TextInput
        placeholder="New Task"
        value={task}
        onChangeText={setTask}
        testID="taskInput"
      />
      <Button title="Add Task" onPress={addTask} testID="addButton" />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}
              testID={`taskText-${item.id}`}>
              {item.text}
            </Text>
            <Button
              title="Complete"
              onPress={() => toggleComplete(item.id)}
              testID={`completeButton-${item.id}`}
            />
            <Button
              title="Delete"
              onPress={() => deleteTask(item.id)}
              testID={`deleteButton-${item.id}`}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TodoScreen;
