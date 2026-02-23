import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";

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

/** Context는 부모-자식 관계를 넘어 컴포넌트 트리의 깊숙한 곳까지 데이터를 편리하게 전달하는 데 사용됩니다.
 * '프롭 드릴링' 문제를 해결하는 데 유용
 */
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

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
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  // 컴포넌트가 리렌더링될 때마다 계속 실행되는 걸 막기 위해서 memo에 저장
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header></Header>
      {/** TodoContext가 제공하는 { todos, onCreate, onUpdate, onDelete }를 언제든지 꺼내와서 direct로 사용 가능 */}
      {/** TodoContext를 props가 바뀔때마다, App에서 객체를 다시 생성해서 넘겨주기 때문에
       * 불필요한 리렌더링이 발생한다. 따라서 TodoDispatchContext와 TodoStateContext로 분리해서 사용한다.
       *
       * TodoContext
       * TodoStateContext : 변경될 수 있는 값 (todos)
       * TodoDispatcherContext: 변경되지 않는 값(onCreate, onUpdate, onDelete...)
       *  */}
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor></Editor>
          <List></List>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
