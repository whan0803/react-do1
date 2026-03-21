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

import { useModal } from "../../../store/useModal";

const GetMission = () => {
const {
  selectedEmotion,
  setSelectedEmotion,
  failForm,
  setFailForm,
  modalType,
  setModalType,
} = useModal();

  const closeModal = () => {
    setModalType(null);
  };


  const onChangeFailForm = (e) => {
      const {name, value} = e.target;
      setFailForm(name, value);
  }


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


      {modalType === "fail" && (
        <div className={style.ModalOverlay}>
          <div className={style.FailModal}>
            <button className={style.BackBtn} onClick={closeModal}>
              돌아가기
            </button>

            <div className={style.FaceWrapper}>
              <img
                src={emotion1}
                alt="happy"
                onClick={() => setSelectedEmotion("happy")}
                className={
                  selectedEmotion === "happy"
                    ? style.ActiveEmotion
                    : style.Emotion
                }
              />

              <img
                src={emotion2}
                alt="pleasure"
                onClick={() => setSelectedEmotion("pleasure")}
                className={
                  selectedEmotion === "pleasure"
                    ? style.ActiveEmotion
                    : style.Emotion
                }
              />

              <img
                src={emotion3}
                alt="neutral"
                onClick={() => setSelectedEmotion("neutral")}
                className={
                  selectedEmotion === "neutral"
                    ? style.ActiveEmotion
                    : style.Emotion
                }
              />

              <img
                src={emotion4}
                alt="tired"
                onClick={() => setSelectedEmotion("tired")}
                className={
                  selectedEmotion === "tired"
                    ? style.ActiveEmotion
                    : style.Emotion
                }
              />

              <img
                src={emotion5}
                alt="angry"
                onClick={() => setSelectedEmotion("angry")}
                className={
                  selectedEmotion === "angry"
                    ? style.ActiveEmotion
                    : style.Emotion
                }
              />
            </div>

            <div className={style.Label}>이유</div>

            <input
              className={style.Input}
              placeholder="미션을 실패한 이유를 적어주세요"
              onChange={onChangeFailForm}
              name="failure_emotion"
              value={failForm.failure_reason}
            />

            <button className={style.FailBtn}>실패</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetMission;
