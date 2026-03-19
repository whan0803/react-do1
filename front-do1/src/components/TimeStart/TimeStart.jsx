import { useEffect } from "react";
import { useGetMissionStore } from "../../store/useMissionStore";

const TimeStart = ({children}) => {
  const { setRemainingTime, setDay } = useGetMissionStore();

  useEffect(() => {
    console.log("타이머 시작됨");

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if(prev <= 0) {
            setDay((day) => day + 1);
            return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return children;
};

export default TimeStart;
