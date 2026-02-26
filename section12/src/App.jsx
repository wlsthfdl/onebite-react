import "./App.css";
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

// const mockData = [
//   {
//     id: 1,
//     createDate: new Date("2026-02-24").getTime(),
//     emotionId: 1,
//     content: "1번 일기 내용",
//   },
//   {
//     id: 2,
//     createDate: new Date("2026-02-23").getTime(),
//     emotionId: 2,
//     content: "2번 일기 내용",
//   },
//   {
//     id: 3,
//     createDate: new Date("2026-01-12").getTime(),
//     emotionId: 3,
//     content: "3번 일기 내용",
//   },
// ];

//return이 새로운 참조값이면 리렌더, 같은값이면 리렌더링 안됨
//dispatch : useState의 set함수와 같은 맥락

function reducer(state, action) {
  let nextState;
  // state가 변할때마다 localStorage에 저장해주기 위해 return말고 nextState에 담음
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter(
        (item) => String(item.id) !== String(action.data.id),
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  //새로고침하면 데이터가 없다고 뜨는 현상: 초깃값세팅하는 useEffect가 실행되기 전에 UseDiary가 먼저 읽어올 수 있기 때문에 isLoad 사용
  const [isLoading, setIsLoading] = useState(true);

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  //초깃값 세팅
  useEffect(() => {
    const stragedData = localStorage.getItem("diary");
    if (!stragedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(stragedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    //새로운 일기를 추가할때, 기존의 일기와 id가 겹치지 않게 maxId값 가져온다.
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []); //deps는 빈값(mount될때 1번만 호출)

  //새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  //기존 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };

  //기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      data: {
        id,
      },
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중,..</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/*" element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
