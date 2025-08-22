import { useRef, useState } from "react";
import "../styles/Card.css";

interface MyCard {
  id: number;
  front: string;
  back: string;
}

export const Card = () => {
  const initialCards: MyCard[] = [
    { id: 1, front: "첫 번째 카드", back: "첫 번째 카드의 뒷면" },
    { id: 2, front: "두 번째 카드", back: "두 번째 카드의 뒷면" },
    { id: 3, front: "세 번째 카드", back: "세 번째 카드의 뒷면" },
    { id: 4, front: "네 번째 카드", back: "네 번째 카드의 뒷면" },
    { id: 5, front: "다섯 번째 카드", back: "다섯 번째 카드의 뒷면" },
    { id: 6, front: "여섯 번째 카드", back: "여섯 번째 카드의 뒷면" },
    { id: 7, front: "일곱 번째 카드", back: "일곱 번째 카드의 뒷면" },
    { id: 8, front: "여덟 번째 카드", back: "여덟 번째 카드의 뒷면" },
  ];

  const [cardsState, setCardsState] = useState<MyCard[]>(initialCards);
  const [isAlign, setIsAlign] = useState(false);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const [isShuffling, setIsShuffling] = useState(false);

  // 카드 초기 회전 각도
  const anglesRef = useRef(
    initialCards.map(() => Math.floor(Math.random() * 30 - 15))
  );

  // Fisher-Yates 배열 섞기
  const shuffleArray = (array: MyCard[]): MyCard[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // 셔플 + 플립
  const onShuffle = () => {
    let count = 0;
    const maxCount = 20;
    const interval = setInterval(() => {
      setCardsState((prev) => {
        const shuffled = shuffleArray(prev);
        count++;
        if (count > maxCount) {
          clearInterval(interval);
          setTimeout(() => {
            setFlippedId(shuffled[0].id); // 셔플 끝나면 맨 위 카드 뒤집기
            console.log("선택된 카드:", shuffled[0]);
            setIsShuffling(false);
          }, 500);
        }
        return shuffled;
      });
    }, 100);
  };

  const onClicked = () => {
    setFlippedId(null);
    setIsAlign(true);
    setIsShuffling(true); // 셔플 시작
    onShuffle();
  };

  return (
    <div className="card-wrap">
      <button onClick={onClicked} disabled={isShuffling}>
        오늘의 운세 확인
      </button>

      <div className="card-stack">
        {cardsState.map((c, index) => (
          <div
            key={c.id}
            className={`card ${flippedId === c.id ? "flipped" : ""}`}
            style={{
              transform: `rotate(${isAlign ? 0 : anglesRef.current[index]}deg)`,
              top: `${index * 5}px`,
              left: `${index * 5}px`,
              transition:
                "transform 0.3s ease-in-out, top 0.3s ease, left 0.3s ease",
              zIndex: cardsState.length - index,
            }}
          >
            <div className="card-inner">
              <div className="card-front card-child">{c.front}</div>
              <div className="card-back card-child">{c.back}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
