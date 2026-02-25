import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-img";

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""}`}
      // isSelected가 true면 className = "EmotionItem EmotionItem_on_1"
      // isSelected가 false면 className = "EmotionItem"
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)}></img>
      <div>{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
