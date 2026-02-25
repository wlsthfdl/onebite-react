import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState } from "react";

const emotionList = [
  { emotionId: 1, emotionName: "완전좋음" },
  { emotionId: 2, emotionName: "좋음" },
  { emotionId: 3, emotionName: "걍" },
  { emotionId: 4, emotionName: "별로" },
  { emotionId: 5, emotionName: "안좋음" },
];

const getStringedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ onSubmit }) => {
  const [input, setInput] = useState({
    createDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const onChangeInput = (e) => {
    let name = e.target.name; //어떤 요소에 입력이 들어온 건지
    let value = e.target.value; //입력된 값이 무엇인지

    console.log(name, value);
    if (name === "createDate") {
      value = new Date(value); //Date객체로 변환
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

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
        <textarea placeholder="오늘은 어땠나요?"></textarea>
      </section>
      <section className="button_section">
        <Button text={"취소하기"}></Button>
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
