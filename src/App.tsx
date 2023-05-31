import { useState } from "react";
import { ChangeEvent, useEffect, KeyboardEvent } from "react";
import "./App.css";

import { Button, Container, RowBox, Input, List, Todo, Header  } from "./App.style";
// import * as S from './App.style';

interface Todo {
  id: number;
  name: string;
}

function App() {
  // todolist data를 저장하는 state
  const [todos, setTodos] = useState<Todo[]>([]);

  // todo를 추가하기 위해 적는 내용을 적는
  const [todoName, setTodoName] = useState<string>("");

  // 현재 수정중인 todo의 id를 담는 state
  const [editedId, setEditId] = useState<number | undefined>();

  // 수정 버튼을 누른 뒤 나온 input의 값을 수정하는데 써야하기 때문에 state에 담아 놓는다.
  const [editName, setEditName] = useState<string>("");

  // todoName state를 input의 onCange에서 setState 해주는 함수
  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setTodoName(value);
  };

  // todo를 만드는 input에서 enter를 눌렀을 때 todo를 추가해주는 함수
  const handlePressEnter = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") addTodo();
  };

  // todo를 추가해주는 함수
  const addTodo = () => {
    // todoName이 빈값이면 추가하지 않음 (이후 코드 실행 x)
    if (!todoName.trim()) return;

    // localStorage에서 count를 +1 해줌 (id로 사용하기 위해)
    const count = Number(localStorage.getItem("count")) + 1;
    localStorage.setItem("count", `${count}`);

    // todos에 새로운 todo 추가
    setTodos((prevState) => [
      ...prevState,
      { id: prevState.length, name: todoName },
    ]);

    // todoName 비워줌 (굳이 안비워도 됨)
    setTodoName("");
  };

  // todos를 초기화 해주는 함수
  const resetTodos = () => {
    setTodos([]);
    localStorage.setItem("count", "0");
  };

  // 수정할 todo의 내용을 input에서 설정해주는 함수
  const handleEditName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setEditName(value);
  };

  // 컴포넌트(페이지)가 "처음" 렌더리 ㅇ됐을 때 localStorage의 todos를 state에 넣어줌
  useEffect(() => {
    // JSON.~ 함수는 에러가 나면 그냥 터져버리기 때문에 try/catch 로 감싸줌
    try {
      const parseData = JSON.parse(localStorage.getItem("todos") || "");
      setTodos(parseData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // state todos가 변화 될 때 (추가, 삭제) localStorage에도 저장해줌
  useEffect(() => {
    console.log("mount");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container>
      <Header>TodoList</Header>
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
            setTodos((prevState) => prevState.filter((v) => v.id != id));
          };

          const toggleEditTodo = () => {
            setEditId(isEdit ? undefined : id);
          };

          const editTodo = () => {
            setTodos((prevState) =>
              prevState.map((todo) =>
                todo.id === id ? { ...todo, name: editName } : todo
              )
            );
            toggleEditTodo();
          };

          return (
            <Todo key={id}>
              {isEdit ? (
                <Input defaultValue={name} onChange={handleEditName} />
              ) : (
                name
              )}

              <Button onClick={deleteTodo}>삭제</Button>

              {/* 1번째 방법 */}
              <Button onClick={toggleEditTodo}>
                {isEdit ? "취소" : "수정"}
              </Button>
              {isEdit && <Button onClick={editTodo}>저장</Button>}

              {/* 2번째 방법 */}
              {/* {isEdit ? (
              <>
                <Button onClick={toggleEditTodo} backgroundColor="skyblue">취소</Button>
                <Button>저장</Button>
              </>
            ) : (
            <Button onClick={toggleEditTodo}>수정</Button>
            )}
             */}
            </Todo>
          );
        })}
      </List>
    </Container>
  );
}

export default App;
