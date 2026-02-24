import "./DiaryItem.css";
import Button from "./Button";
import { getEmotionImage } from "../util/get-emotion-img.js";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotionId, createDate, content }) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)}></img>
      </div>
      <div onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"}></Button>
      </div>
    </div>
  );
};

export default DiaryItem;
