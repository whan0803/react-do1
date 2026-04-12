import style from "./GetMission.module.css";
import { useState } from "react";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import MissionImg from "../../../assets/MissionImg.png";

import emotion1 from "../../../assets/emotion1 2.png";
import emotion2 from "../../../assets/emotion2 2.png";
import emotion3 from "../../../assets/emotion3 2.png";
import emotion4 from "../../../assets/emotion4 2.png";
import emotion5 from "../../../assets/emotion5 2.png";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useModal } from "../../../store/useModal";
import { useGetMissionStore } from "../../../store/useMissionStore";
import { missionResultStore } from "../../../store/missionResultStore";

import { useGetMission } from "../../../hooks/useGetMission";
import { successMission, failMission } from "../../../api/getMission";
import {
  getNextResetAt,
  isLegacyNoonResetAt,
} from "../../../utils/missionReset";
import { getSessionUserId } from "../../../utils/sessionUser";

const GetMission = () => {
  const navigate = useNavigate();

  const {
    selectedEmotion,
    setSelectedEmotion,
    failForm,
    setFailForm,
    modalType,
    setModalType,
  } = useModal();

  const { data, isLoading } = useGetMission();
  const { mission, setMission, setMissionId, setStatus, missionId } =
    useGetMissionStore();
  const { setMissionResult, missionResult } = missionResultStore();

  const closeModal = () => setModalType(null);

  const onChangeFailForm = (e) => {
    const { name, value } = e.target;
    setFailForm(name, value);
  };

  useEffect(() => {
    const userId = getSessionUserId();
    if (!userId) return;
    const key = `mission_${userId}`;
    const saved = JSON.parse(sessionStorage.getItem(key) || "null");
    const now = Date.now();

    const isValidResetAt =
      saved?.resetAt &&
      now < saved.resetAt &&
      !isLegacyNoonResetAt(saved.resetAt);

    if (saved && isValidResetAt) {
      setMission(saved.mission);
      setMissionId(saved.missionId);
      setStatus("in_progress");
      return;
    }

    if (data) {
      setMission(data.mission_content);
      setMissionId(data.mission_id);
      setStatus("in_progress");

      sessionStorage.setItem(
        key,
        JSON.stringify({
          mission: data.mission_content,
          missionId: data.mission_id,
          resetAt: getNextResetAt(),
        }),
      );
    }
  }, [data, setMission, setMissionId, setStatus]);

  const handleSuccess = async () => {
    try {
      if (missionResult === "fail" || missionResult === "success") {
        alert("오늘의 미션을 완료했습니다");
        return;
      }

      const userId = getSessionUserId();
      await successMission({ user_id: userId, mission_id: missionId });

      const key = `mission_${userId}`;
      sessionStorage.removeItem(key);
      setMissionResult("success");
      alert("미션을 성공했습니다");
      setStatus("success");
      setModalType(null);
      navigate("/mainpage");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFail = async () => {
    try {
      if (missionResult === "fail" || missionResult === "success") {
        alert("오늘의 미션을 완료했습니다");
        return;
      }

      const userId = getSessionUserId();

      await failMission({
        user_id: userId,
        mission_id: missionId,
        failure_reason: failForm.failure_reason,
        failure_emotion: selectedEmotion,
      });

      const key = `mission_${userId}`;
      sessionStorage.removeItem(key);
      setMissionResult("fail");
      alert("미션 등록 성공");
      setStatus("fail");
      setModalType(null);
      navigate("/mainpage");
    } catch (err) {
      console.error(err);
      alert("미션등록을 실패");
    }
  };

  let missionStatus;
  if (missionResult === "fail" || missionResult === "success") {
    missionStatus = "오늘의 미션을 완료했습니다";
  } else if (isLoading) {
    missionStatus = "...로딩중";
  } else {
    missionStatus = mission;
  }

  return (
    <div className={style.GetMission}>
      <Header />

      <main className={style.Main}>
        <div className={style.MissionWrapper}>
          <div className={style.Mission}>{missionStatus}</div>

          <div className={style.ButtonWrapper}>
            <button onClick={() => setModalType("success")}>성공</button>
            <button onClick={() => setModalType("fail")}>실패</button>
          </div>
        </div>

        <img
          className={style.MissionImg}
          src={MissionImg}
          alt="미션 캐릭터"
          loading="eager"
          decoding="async"
        />
      </main>

      <Footer />

      {modalType === "success" && (
        <div className={style.ModalOverlay}>
          <div className={style.SuccessModal}>
            <button className={style.BackBtn} onClick={closeModal}>
              돌아가기
            </button>
            <div className={style.SuccessText}>진짜로 미션을 수행하셨나요?</div>
            <button className={style.SuccessBtn} onClick={handleSuccess}>
              성공
            </button>
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
              {[
                { src: emotion1, alt: "happy" },
                { src: emotion2, alt: "pleasure" },
                { src: emotion3, alt: "neutral" },
                { src: emotion4, alt: "tired" },
                { src: emotion5, alt: "angry" },
              ].map(({ src, alt }) => (
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  onClick={() => setSelectedEmotion(alt)}
                  className={
                    selectedEmotion === alt
                      ? style.ActiveEmotion
                      : style.Emotion
                  }
                />
              ))}
            </div>

            <div className={style.Label}>이유</div>

            <input
              className={style.Input}
              placeholder="미션을 실패한 이유를 적어주세요"
              onChange={onChangeFailForm}
              name="failure_reason"
              value={failForm.failure_reason}
            />

            <button className={style.FailBtn} onClick={handleFail}>
              실패
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetMission;
