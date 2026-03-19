import style from "../ListPageComponent.module.css";

const ListItem = ({ index, content, success }) => {
  return (
    <div className={style.ListItem}>
      <p>
        {index + 1}. {content}
      </p>

      <div className={success ? style.Success : style.Fail}>
        {success ? "성공" : "실패"}
      </div>
    </div>
  );
};

export default ListItem;
