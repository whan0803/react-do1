import { useGetMissionStore } from "../../store/useMissionStore";
import { missionResultStore } from "../../store/missionResultStore";
import style from "./Nav.module.css";

const Nav = () => {
  const { remainingTime, day } = useGetMissionStore();
  const { missionResult } = missionResultStore();

  const hours = String(Math.floor(remainingTime / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(
    2,
    "0",
  );

  return (
    <div className={style.Nav}>
      {(missionResult === "success" || missionResult === "fail") && (
        <h3>
          다음 미션까지 {hours}:{minutes}
        </h3>
      )}
      <h2>미션한지 {day}일째</h2>
    </div>
  );
};

export default Nav;
