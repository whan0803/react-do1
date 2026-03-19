import style from "./ListPage.module.css";
import ListPageComponent from "./ListPageComponent/ListPageComponent";

const ListPage = () => {
  return (
    <div className={style.ListPage}>
      <ListPageComponent />
    </div>
  );
};

export default ListPage;
