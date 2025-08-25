import { useRef, useState } from "react";
import "../styles/Card.css";

interface MyCard {
  id: number;
  front: string;
  back: string;
}

export const Card = () => {
  // 실제 카드 데이터 (예시: 8장만 작성, 필요 시 54장으로 확장)
  const initialCards: MyCard[] = [
    {
      id: 1,
      front: "src/assets/Card/test-01.png",
      back: "src/assets/Card/back-test.png",
    },
    {
      id: 2,
      front: "src/assets/Card/test-01.png",
      back: "src/assets/Card/back-test.png",
    },
    {
      id: 3,
      front: "src/assets/Card/test-01.png",
      back: "src/assets/Card/back-test.png",
    },
    {
      id: 4,
      front: "src/assets/Card/test-01.png",
      back: "src/assets/Card/back-test.png",
    },
    {
      id: 5,
      front: "src/assets/Card/test-01.png",
      back: "src/assets/Card/back-test.png",
    },
    {
      id: 6,
      front: "src/assets/Card/test-01.png",
      back: "src/assets/Card/back-test.png",
    },
    {
      id: 7,
      front: "src/assets/Card/test-01.png",
      back: "src/assets/Card/back-test.png",
    },
    {
      id: 8,
      front: "src/assets/Card/test-01.png",
      back: "src/assets/Card/back-test.png",
    },
  ];

  // 광고 카드
  const promoCard: MyCard = {
    id: 0,
    front: "src/assets/Card/back-test.png", // 광고 이미지
    back: "src/assets/Card/promo.png",
  };

  // 초기 state: 광고 카드 + 실제 카드 덱
  const [cardsState, setCardsState] = useState<MyCard[]>([
    promoCard,
    ...initialCards,
  ]);
  const [isAlign, setIsAlign] = useState(false);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const [isShuffling, setIsShuffling] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const anglesRef = useRef(
    [...cardsState].map(() => Math.floor(Math.random() * 30 - 15))
  );

  const shuffleArray = (array: MyCard[]): MyCard[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const onShuffle = () => {
    let count = 0;
    const maxCount = 15;
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
    }, 150);
  };

  const onClicked = () => {
    setIsShuffling(true);

    if (isFirst) {
      setIsAlign(true);
      setIsFirst(false);

      // 광고 카드 뒤집기
      setFlippedId(0);

      // 광고 카드 제거 후 실제 카드 덱 셔플
      setTimeout(() => {
        setCardsState((prev) => prev.filter((c) => c.id !== 0));
        setFlippedId(null); // 광고 카드 뒤집힘 해제
        onShuffle(); // 실제 카드 셔플 시작
      }, 800); // 광고 카드 뒤집는 시간과 동일
    } else {
      setFlippedId(-1);
      setTimeout(() => {
        setFlippedId(null);
        onShuffle();
      }, 600);
    }
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
              top: `${index * 1.5}px`,
              left: `${index * 1.5}px`,
              transition:
                "transform 0.3s ease-in-out, top 0.3s ease, left 0.3s ease",
              zIndex: cardsState.length - index,
            }}
          >
            <div className="card-inner">
              <div
                className="card-front card-child"
                style={{
                  backgroundImage: `url(${c.front})`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
              ></div>
              <div
                className={`card-back card-child ${
                  c.id === 0 ? "promo-card" : ""
                }`}
                style={{
                  backgroundColor: c.id === 0 ? "#000" : "#fff", // 광고 카드일 때 배경색
                  backgroundImage: `url(${c.back})`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
