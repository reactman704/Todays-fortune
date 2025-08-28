import React from "react";

interface FortuneButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const FortuneButton = ({ onClick, disabled }: FortuneButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      오늘의 운세 확인
    </button>
  );
};

export default FortuneButton;
