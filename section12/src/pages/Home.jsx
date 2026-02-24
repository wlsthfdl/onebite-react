import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";

//해당 월에 속하는 데이터 filtering
const getMonthlyData = (pivotDate, data) => {
  //필터링 시작 시간(pivot데이터의 연/월,1일,시간,분,초)
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0,
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0, //전 달의 마지막날로 설정됨
    23,
    59,
    59,
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createDate && item.createDate <= endTime,
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext); //일기 데이터 App컴포넌트에서 공급받음
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth}></Button>}
        rightChild={<Button text={">"} onClick={onIncreaseMonth}></Button>}
      ></Header>
      <DiaryList data={monthlyData}></DiaryList>
    </div>
  );
};

export default Home;
