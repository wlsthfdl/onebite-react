import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();
  return <div>{params.id}번 일기 수정 페이지</div>;
};

export default Edit;
