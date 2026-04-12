import style from "./Main.module.css";
import defaultChar from "../../assets/default.png";
import { userChatMessageStore } from "../../store/userChatMessageStore";
import { useNavigate } from "react-router-dom";

import failImg from "../../assets/fail.png";
import successImg from "../../assets/success.png";

import { missionResultStore } from "../../store/missionResultStore";

const Main = () => {
  const navigate = useNavigate();

  const { message, index, nextMessage } = userChatMessageStore();
  const { missionResult } = missionResultStore();

  const getCharacter = () => {
    if (missionResult === "success") return successImg;
    if (missionResult === "fail") return failImg;
    return defaultChar;
  };

  const getMessage = () => {
    if (missionResult === "success")
      return ["미션 성공! 잘했어요 🎉 내일도 함께해요!"];
    if (missionResult === "fail")
      return ["아쉽지만 괜찮아요 😢 내일 다시 도전해봐요!"];
    return message;
  };

  const currentMessage = getMessage();
  const safeIndex = Math.min(index, currentMessage.length - 1);

  const handleClick = () => {
    const isLast = index === currentMessage.length - 1;
    if (isLast) {
      if (missionResult === "success" || missionResult === "fail") return;
      navigate("/missionpage");
    } else {
      nextMessage();
    }
  };

  return (
    <div>
      <div className={style.characterBox}>
        <div className={style.bubble}>
          <h2>{currentMessage[safeIndex]}</h2>
        </div>
        <img
          src={getCharacter()}
          onClick={handleClick}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default Main;
