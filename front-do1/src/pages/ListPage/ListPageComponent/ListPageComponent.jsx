import style from "./ListPageComponent.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ListItem from "./ListItem/ListItem";

const ListPageComponent = () => {
  // 🔥 임시 데이터 (나중에 DB 연결)
  const data = [
    { id: 1, content: "물 500ml 마시기", success: true },
    { id: 2, content: "물 1000리터 마시기", success: false },
    { id: 3, content: "물 100리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },
    { id: 4, content: "물 1000리터 마시기", success: true },

  ];

  return (
    <div className={style.ListPageComponent}>
      <Header />

      <main className={style.Main}>
        {/* 리스트 */}
        <div className={style.ItemWrapper}>
          {data.map((item, index) => (
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
          <button>성공리스트</button>
          <button>실패리스트</button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListPageComponent;
