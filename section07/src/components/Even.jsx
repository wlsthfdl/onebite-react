import { useEffect } from "react";

const Even = () => {
  useEffect(() => {
    //클린업, 정리함수: 언마운트될때 호출됨(App에서 Even함수가 사라졌을 때, 홀수로 바뀌었을 때 실행)
    return () => {
      console.log("unMount");
    };
  }, []);
  return <div>짝수입니다.</div>;
};

export default Even;
