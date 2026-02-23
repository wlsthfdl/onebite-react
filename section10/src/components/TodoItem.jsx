import "./TodoItem.css";
import { memo } from "react";

/** 구조분해 : 객체에서 값을 꺼내서 바로 변수로 만드는 방법
 *  const name = person.name;
 *  const age = person.age;
 *
 *  ==>
 *
 *  const {name, age} = person;
 *
 *
 * ------------------------------------
 * const TodoItem = ({ id, isDone, content, date })
 * const TodoItem = (props) 같은 뜻이다.
 */
const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input
        onChange={onChangeCheckbox}
        checked={isDone}
        type="checkbox"
      ></input>
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// 고차 컴포넌트 (HOC): 컴포넌트에 기능 추가
export default memo(TodoItem, (prevProps, nextProps) => {
  //반환 값에 따라, Props가 바뀌었는지 안 바뀌었는지 판단
  // T --> Props가 바뀌지 않음 --> 리렌더링 X
  // F --> Props가 바뀜 --> 리렌더링 O

  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.content) return false;
  if (prevProps.date !== nextProps.date) return false;

  return true;
});
