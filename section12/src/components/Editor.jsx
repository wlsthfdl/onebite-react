import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect, useInsertionEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const nav = useNavigate();

  //기존데이터(수정)일 경우
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createDate: new Date(Number(initData.createDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name; //어떤 요소에 입력이 들어온 건지
    let value = e.target.value; //입력된 값이 무엇인지

    if (name === "createDate") {
      value = new Date(value); //Date객체로 변환
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  // 해당 기능은 New(새일기쓰기)와 Edit(수정하기)에 따라 로직이 달라지기때문에
  // 각 화면에서 onSubmit으로 불러와서 사용한다.
  const onClickSubmitButtion = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createDate"
          type="date"
          onChange={onChangeInput}
          value={getStringedDate(input.createDate)}
        ></input>
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            ></EmotionItem>
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        ></textarea>
      </section>
      <section className="button_section">
        <Button text={"취소하기"} onClick={() => nav(-1)}></Button>
        <Button
          text={"작성완료"}
          type={"POSITIVE"}
          onClick={onClickSubmitButtion}
        ></Button>
      </section>
    </div>
  );
};

export default Editor;
