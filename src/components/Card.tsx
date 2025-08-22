import { useRef, useState } from "react";
import "../styles/Card.css";

export const Card = () => {
  interface myCard {
    id: number;
    front: string;
    back: string;
  }
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

  const [isAlign, setIsAlign] = useState(false);

  const [card, setCard] = useState(cards);

  const shuffleArray = (array: myCard[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const onShuffle = () => {
    const shuffled = shuffleArray(cards);
    setCard(shuffled);
    console.log(shuffled);
  };

  const anglesRef = useRef(
    cards.map(() => Math.floor(Math.random() * 30 - 15))
  );
  const onClicked = () => {
    setIsAlign(true);
    onShuffle();
  };
  return (
    <div className="card-wrap">
      <div>
        <button onClick={onClicked} disabled={!isAlign ? false : true}>
          오늘의 운세 확인
        </button>
      </div>

      <div className="card-stack">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${cards[index].id}`}
            style={{
              transform: `rotate(${isAlign ? 0 : anglesRef.current[index]}deg)`,
            }} // 겹치는 효과
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
