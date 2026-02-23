import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { useState, useRef, useReducer, useCallback } from "react";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "눕기",
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item,
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });

    // const newTodo = {
    //   id: idRef.current++,
    //   isDone: false,
    //   content: content,
    //   date: new Date().getTime(),
    // };

    // setTodos([newTodo, ...todos]);
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });

    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone변경

    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    // setTodos(
    //   todos.map((todo) => {
    //     if (todo.id === targetId) {
    //       return {
    //         ...todo,
    //         isDone: !todo.isDone,
    //       };
    //     }
    //     //todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo;
    //     return todo;
    //   }),
    // );
  }, []);

  // useCallback에 의해 마운트 되었을 때, 한 번만 생성됨
  /** 최적화. 함수의 재생성 막기 불필요한 리렌더링을 막음
   * useMemo vs. useCallback 차이
   *  useMemo : 값 저장. 계산된 결과값을 기억함
   *  useCallback: 함수 저장. 함수를 기억함.
   */
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
    // 인수: todos배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    //setTodos(todos.filter((todo) => todo.id !== targetId));
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Editor onCreate={onCreate}></Editor>
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}></List>
    </div>
  );
}

export default App;
