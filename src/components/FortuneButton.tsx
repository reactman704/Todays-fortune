import React from "react";
import "../styles/FortuneButton.css";
interface FortuneButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const FortuneButton = ({ onClick, disabled }: FortuneButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className="qa-btn">
      오늘의 운세 확인
    </button>
  );
};

export default FortuneButton;
