import { useState } from "react";
import "../styles/Card.css";

export const Card = () => {
  const cards = [
    { id: 1, front: "첫 번째 카드", back: "첫 번째 카드의 뒷면" },
    { id: 2, front: "두 번째 카드", back: "두 번째 카드의 뒷면" },
    { id: 3, front: "세 번째 카드", back: "세 번째 카드의 뒷면" },
    { id: 4, front: "세 번째 카드", back: "세 번째 카드의 뒷면" },
    { id: 5, front: "세 번째 카드", back: "세 번째 카드의 뒷면" },
    { id: 6, front: "세 번째 카드", back: "세 번째 카드의 뒷면" },
    { id: 7, front: "세 번째 카드", back: "세 번째 카드의 뒷면" },
    { id: 8, front: "세 번째 카드", back: "세 번째 카드의 뒷면" },
  ];

  const ranNum = () => {
    // -15도 ~ +15도 사이에서 랜덤 각도
    return Math.floor(Math.random() * 30 - 15);
  };
  return (
    <div className="card-wrap">
      <div className="card-stack">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${cards[index].id}`}
            style={{ transform: `rotate(${ranNum()}deg)` }} // 겹치는 효과
          >
            <div className="card-inner">
              <div className="card-front card-child">{card.front}</div>
              <div className="card-back card-child">{card.back}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
