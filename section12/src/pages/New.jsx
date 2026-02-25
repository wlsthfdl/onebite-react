import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  const onSubmit = (input) => {
    onCreate(
      // getTime() 날짜 객체를 타임스탬프로 바꾸기 위함
      //sort나 비교연산, 서버 localStorage에 저장할 때 숫자로 다루면 편하기 때문
      input.createDate.getTime(),
      input.emotionId,
      input.content,
    );
    nav("/", { replace: true }); //뒤로가기를 방지하면서 페이지 이동(replace)
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로가기"}></Button>
        }
      ></Header>
      <Editor onSubmit={onSubmit}></Editor>
    </div>
  );
};

export default New;
