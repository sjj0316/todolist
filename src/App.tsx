import { useState } from "react";
import { ChangeEvent, useEffect, KeyboardEvent } from "react";
import "./App.css";

import { Button, Container, RowBox, Input, List, Todo } from "./App.style";
// import * as S from './App.style';

interface Todo {
  id: number;
  name: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState<string>('');
  const [editedId, setEditId] = useState<number | undefined>();

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setTodoName(value);
  };

  const handlePressEnter = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") addTodo();
  };
  const addTodo = () => {
    if (!todoName.trim()) return;
    const count = Number(localStorage.getItem('count')) + 1;
    localStorage.setItem('count', `${count}`);
    setTodos((prevState) => [
      ...prevState,
      { id: prevState.length, name: todoName },
    ]);
    setTodoName("");
  };

  const resetTodos = () => {
    setTodos([]);
    localStorage.setItem('count', '0');
  }
  
  useEffect(() => {
    try {
      const parseData = JSON.parse(localStorage.getItem("todos") || "");
      setTodos(parseData);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    console.log("mount");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <RowBox>
        <Input
          placeholder="Todo를 입력해주세요"
          value={todoName}
          onChange={handleInputChange}
          onKeyUp={handlePressEnter}
        />
        <Button onClick={addTodo}>추가</Button>
        <Button onClick={resetTodos}>초기화</Button>
      </RowBox>
        <List>
          {todos.map(({ id, name }) => {
            const isEdit: boolean = editedId === id;
            const deleteTodo = () => {
              setTodos(prevState => prevState.filter(v => v.id != id));
            };

            const editTodo = () => {
              setEditId(id);
            };

            const cancelEdit = () => setEditId(undefined);

            return (
            <Todo key={id}>{isEdit ? <Input defaultValue={name}/>: name}
            <Button onClick={deleteTodo}>삭제</Button>
            {isEdit ? (
              <>
                <Button onClick={cancelEdit}>취소</Button>
                <Button>저장</Button>
              </>
            ) : (
            <Button onClick={editTodo}>수정</Button>
            )}
            </Todo>
            );
          })}
        </List>
    </Container>
  );
}

export default App;
