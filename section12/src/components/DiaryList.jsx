import { useState } from "react";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState("lastest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        //오래된순 - 오름차순
        return Number(a.createDate) - Number(b.createDate);
      } else {
        //최신순 - 내림차순
        return Number(b.createDate) - Number(a.createDate);
      }
    }); //toSorted()는 원본배열은 두고, 새로운 배열만 반환해줌
  };

  const sortedData = getSortedDate();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"lastst"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 일기 쓰기"}
          type={"POSITIVE"}
        ></Button>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item}></DiaryItem>
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
