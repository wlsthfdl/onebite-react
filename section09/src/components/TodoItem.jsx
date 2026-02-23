import "./TodoItem.css";

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

export default TodoItem;
