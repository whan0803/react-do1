import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import style from "./ListPageComponent.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ListItem from "./ListItem/ListItem";
import { missionList } from "../../../api/missionList";

const ListPageComponent = () => {
  const [filter, setFilter] = useState("all");
  const { data = [] } = useQuery({
    queryKey: ["mission-list"],
    queryFn: missionList,
    staleTime: 1000 * 60 * 5,
  });

  const toggleFilter = (type) => {
    setFilter((prev) => (prev === type ? "all" : type));
  };

  const filterData = useMemo(() => {
    if (filter === "success") return data.filter((item) => item.is_success);
    if (filter === "fail") return data.filter((item) => !item.is_success);
    return data;
  }, [data, filter]);

  return (
    <div className={style.ListPageComponent}>
      <Header />

      <main className={style.Main}>
        <div className={style.ItemWrapper}>
          {filterData.map((item, index) => (
            <ListItem
              key={`${item.mission_content}-${index}`}
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
