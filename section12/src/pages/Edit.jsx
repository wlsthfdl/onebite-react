import { useParams, useNavigate, replace } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../Hooks/useDiary";

const Edit = () => {
  //params url로 전달받은 값
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);

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
