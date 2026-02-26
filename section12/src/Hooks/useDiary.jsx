import { DiaryStateContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  const nav = useNavigate();

  //현재일기 읽어오기
  useEffect(() => {
    /**컴포넌트가 호출될때(렌더될때마다 무조건) nav("/", { replace: true });를 실행하기 때문에
    렌더 후 실행하는 useEffect를 사용해야함 */
    const currentDiaryItem = data.find(
      //app에서 넘어온 id와 url id값이 같은 item을 찾음
      (item) => String(item.id) === String(id),
    );

    //url에 이상하게 입력해서 들어왔을 때
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id]);

  return curDiaryItem;
};

export default useDiary;
