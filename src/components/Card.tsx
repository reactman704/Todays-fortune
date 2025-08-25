import { useRef, useState } from "react";
import "../styles/Card.css";

interface MyCard {
  id: number;
  front: string;
  back: string;
  part: number;
  title: string;
  title02: string;
}

export const Card = () => {
  // 카드 데이터 (예시: 일부만 작성)
  const initialCards: MyCard[] = [
    {
      id: 1,
      front: "/assets/Card/test-01.png",
      back: "/assets/Card/back-test.png",
      part: 2,
      title: "컬러 조커",
      title02: "컬러 조커",
    },
    {
      id: 2,
      front: "/assets/Card/test-01.png",
      back: "/assets/Card/back-test.png",
      part: 2,
      title: "흑백조커",
      title02: "흑백조커",
    },
    {
      id: 3,
      front: "/assets/Card/test-01.png",
      back: "/assets/Card/back-test.png",
      part: 2,
      title: "의심에 면역이 안된 아이",
      title02: "건강하게 싫어하는 아이",
    },
    {
      id: 4,
      front: "/assets/Card/test-01.png",
      back: "/assets/Card/back-test.png",
      part: 2,
      title: "3.5차원 가족 누구를 추가할건지, 교체할건지",
      title02: "3.5차원 가족 누구를 추가할건지, 교체할건지",
    },
    {
      id: 5,
      front: "/assets/Card/test-01.png",
      back: "/assets/Card/back-test.png",
      part: 2,
      title: "기대감 질문하는 힘",
      title02: "기대감 질문하는 힘",
    },
    {
      id: 6,
      front: "/assets/Card/test-01.png",
      back: "/assets/Card/back-test.png",
      part: 2,
      title: "언제나 틀릴수도 있다는 자신감. 오해 받을 용기",
      title02: "언제나 틀릴수도 있다는 자신감. 오해 받을 용기",
    },
  ];

  // 광고 카드
  const promoCard: MyCard = {
    id: 0,
    front: "/assets/Card/back-test.png",
    back: "/assets/Card/promo.png",

    part: 1,
    title: "promo",
    title02: "promo",
  };

  // 초기 state: 광고 카드 + 실제 카드 덱
  const [cardsState, setCardsState] = useState<MyCard[]>([
    promoCard,
    ...initialCards,
  ]);
  const [isAlign, setIsAlign] = useState(false);
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [flipAxis, setFlipAxis] = useState<"X" | "Y">("Y");

  const [isShuffling, setIsShuffling] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const anglesRef = useRef(
    [...cardsState].map(() => Math.floor(Math.random() * 30 - 15))
  );

  // 배열 셔플
  const shuffleArray = (array: MyCard[]): MyCard[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // 카드 셔플
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
            const selected = shuffled[0];

            // part == 2 → X/Y 랜덤, 아니면 Y 고정
            const randomAxis =
              selected.part === 2 ? (Math.random() > 0.5 ? "Y" : "X") : "Y";
            setFlipAxis(randomAxis);

            setFlippedId(selected.id);
            console.log("선택된 카드:", selected);
            setIsShuffling(false);
          }, 500);
        }
        return shuffled;
      });
    }, 150);
  };

  // 버튼 클릭
  const onClicked = () => {
    setIsShuffling(true);

    if (isFirst) {
      setIsAlign(true);
      setIsFirst(false);

      // 광고 카드 flip
      setFlipAxis("Y"); // 광고 카드는 항상 Y축
      setFlippedId(0);

      setTimeout(() => {
        setCardsState((prev) => prev.filter((c) => c.id !== 0));
        setFlippedId(null);
        onShuffle();
      }, 800);
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
            data-flip-axis={flipAxis}
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
                  backgroundColor: c.id === 0 ? "#000" : "#fff",
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
