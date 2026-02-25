import { useParams, useNavigate, replace } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
  //params url로 전달받은 값
  const params = useParams();
  const nav = useNavigate();
  const { onDelete } = useContext(DiaryDispatchContext);
  const { onUpdate } = useContext(DiaryDispatchContext);
  //App컴포넌트로부터 전달받은 값
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  //컴포넌트가 호출될때(렌더될때마다 무조건) nav("/", { replace: true });를 실행하기 때문에
  //렌더 후 실행하는 useEffect를 사용해야함
  useEffect(() => {
    //현재일기 읽어오기
    const currentDiaryItem = data.find(
      //app에서 넘어온 id와 url id값이 같은 item을 찾음
      (item) => String(item.id) === String(params.id),
    );

    //url에 이상하게 입력해서 들어왔을 때
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

  //일기 삭제 로직
  const onClickDelete = () => {
    if (window.confirm("일기를 삭제하시겠습니까? 다시 복구되지 않아요!")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  //일기 수정 로직
  const onSubmit = (input) => {
    if (window.confirm("일기를 수정하시겠습니까?")) {
      onUpdate(
        params.id, //id값은 onChange(input)에 없기 때문에 params를 가져온다.
        input.createDate.getTime(),
        input.emotionId,
        input.content,
      );
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"뒤로가기"} onClick={() => nav(-1)}></Button>}
        rightChild={
          <Button
            text={"삭제하기"}
            type={"NEGATIVE"}
            onClick={onClickDelete}
          ></Button>
        }
      ></Header>
      <Editor initData={curDiaryItem} onSubmit={onSubmit}></Editor>
    </div>
  );
};

export default Edit;
