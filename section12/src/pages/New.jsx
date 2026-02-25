import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const nav = useNavigate();

  const onSubmit = (input) => {};

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로가기"}></Button>
        }
      ></Header>
      <Editor></Editor>
    </div>
  );
};

export default New;
