import { useState, useEffect } from "react";
import style from "./ListPageComponent.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ListItem from "./ListItem/ListItem";
import { missionList } from "../../../api/missionList";

const ListPageComponent = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const result = await missionList();
      setData(result);
    };
    fetchData();
  }, []);

  const toggleFilter = (type) => {
    setFilter((prev) => (prev === type ? "all" : type));
  };

  const filterData =
    filter === "success"
      ? data.filter((i) => i.is_success)
      : filter === "fail"
        ? data.filter((i) => !i.is_success)
        : data;

  return (
    <div className={style.ListPageComponent}>
      <Header />

      <main className={style.Main}>
        <div className={style.ItemWrapper}>
          {filterData.map((item, index) => (
            <ListItem
              key={item.id}
              index={index}
              content={item.mission_content}
              success={item.is_success}
            />
          ))}
        </div>

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
