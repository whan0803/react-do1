import style from './Main.module.css'
import defaultChar from "../../assets/default.png";
import { userChatMessageStore } from '../../store/userChatMessageStore';
import {useNavigate} from 'react-router-dom'


const Main = () => {
    const navigate = useNavigate();

    const {message, index, nextMessage} = userChatMessageStore();



    const handleClick = () => {
        const isLast = index === message.length -1;

        if (isLast) {
          navigate("/missionpage");
        } else {
          nextMessage();
        }
    }

    return (
      <div>
        <div className={style.characterBox}>
          <div className={style.bubble}>
            <h2>{message[index]}</h2>
          </div>
          <img src={defaultChar} onClick={handleClick} alt="" />
        </div>
      </div>
    );
}

export default Main