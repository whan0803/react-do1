import style from "./ListPageComponent.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ListItem from "./ListItem/ListItem";

import { useState } from "react";

const ListPageComponent = () => {
  // 🔥 임시 데이터 (나중에 DB 연결)
  const data = [
    { id: 1, content: "물 500ml 마시기", success: true },
    { id: 2, content: "물 1000리터 마시기", success: false },
    { id: 3, content: "물 100리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 5, content: "물 1000리터 마시기", success: true },
    { id: 6, content: "물 1000리터 마시기", success: true },
    { id: 7, content: "물 1000리터 마시기", success: true },
    { id: 8, content: "물 1000리터 마시기", success: true },
    { id: 9, content: "물 1000리터 마시기", success: true },
    { id: 10, content: "물 1000리터 마시기", success: true },
    { id: 11, content: "물 1000리터 마시기", success: true },
    { id: 12, content: "물 1000리터 마시기", success: true },
    { id: 13, content: "물 1000리터 마시기", success: true },
    { id: 14, content: "물 1000리터 마시기", success: true },

  ];

  const [filter, setFilter] = useState("all");

  const toggleFilter = (type) => {
    setFilter((prev) => (prev === type ? "all": type))
  }

  const getFilterData = () => {
    if(filter === "success") {
      return data.filter((i) => i.success)
    }else if(filter === "fail") {
      return data.filter((i) => !i.success)
    }
    return data
  }

  const filterData = getFilterData();


  return (
    <div className={style.ListPageComponent}>
      <Header />

      <main className={style.Main}>
        {/* 리스트 */}
        <div className={style.ItemWrapper}>
          {filterData.map((item, index) => (
            <ListItem
              key={item.id}
              index={index}
              content={item.content}
              success={item.success}
            />
          ))}
        </div>

        {/* 하단 버튼 */}
        <div>
          <button onClick={() => toggleFilter("success")}>성공리스트</button>
          <button onClick={() => toggleFilter("fail")}>실패리스트</button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListPageComponent;
