import style from "./GetMission.module.css";
import { useState } from "react";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import MissionImg from "../../../assets/MissionImg.png";

import emotion1 from '../../../assets/emotion1 2.png'
import emotion2 from '../../../assets/emotion2 2.png'
import emotion3 from '../../../assets/emotion3 2.png'
import emotion4 from '../../../assets/emotion4 2.png'
import emotion5 from '../../../assets/emotion5 2.png'

const GetMission = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className={style.GetMission}>
      <Header />

      <main className={style.Main}>
        <div className={style.MissionWrapper}>
          <div className={style.Mission}></div>

          <div className={style.ButtonWrapper}>
            <button onClick={() => setModalType("success")}>성공</button>
            <button onClick={() => setModalType("fail")}>실패</button>
          </div>
        </div>

        <img className={style.MissionImg} src={MissionImg} alt="미션 캐릭터" />
      </main>

      <Footer />

      {/* ✅ 성공 모달 */}
      {modalType === "success" && (
        <div className={style.ModalOverlay}>
          <div className={style.SuccessModal}>
            <button className={style.BackBtn} onClick={closeModal}>
              돌아가기
            </button>

            <div className={style.SuccessText}>진짜로 미션을 수행하셨나요?</div>

            <button className={style.SuccessBtn}>성공</button>
          </div>
        </div>
      )}

      {/* ✅ 실패 모달 */}
      {modalType === "fail" && (
        <div className={style.ModalOverlay}>
          <div className={style.FailModal}>
            <button className={style.BackBtn} onClick={closeModal}>
              돌아가기
            </button>

            {/* 👉 이미지 자리 */}
            <div className={style.FaceWrapper}>
              {[emotion1, emotion2, emotion3, emotion4, emotion5].map(
                (emotion, index) => (
                  <img
                    key={index}
                    src={emotion}
                    alt={`emotion${index}`}
                    onClick={() => setSelectedEmotion(index)}
                    className={
                      selectedEmotion === index
                        ? style.ActiveEmotion
                        : style.Emotion
                    }
                  />
                ),
              )}
            </div>

            <div className={style.Label}>이유</div>

            <input
              className={style.Input}
              placeholder="미션을 실패한 이유를 적어주세요"
            />

            <button className={style.FailBtn}>실패</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetMission;
