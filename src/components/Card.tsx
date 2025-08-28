import { useEffect, useRef, useState } from "react";
import "../styles/Card.css";
import axios from "axios";
import FortuneButton from "./FortuneButton";

interface MyCard {
  id: string;
  front: string;
  back: string;
  part: string;
  title: string;
  title02: string;
  keyword: string;
  desc01: string;
  desc02: string;
}

// 광고 카드
const promoCard: MyCard = {
  id: "0",
  front: "/assets/Card/back-test.png",
  back: "/assets/Card/promo.png",
  part: "1",
  title: "promo",
  title02: "promo",
  keyword: "안녕",
  desc01: "desc01",
  desc02: "desc02",
};

export const Card = () => {
  const [cardsState, setCardsState] = useState<MyCard[]>([promoCard]);
  const [isAlign, setIsAlign] = useState(false);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [flipAxis, setFlipAxis] = useState<"X" | "Y">("Y");
  const [currentAxis, setCurrentAxis] = useState<"X" | "Y">("Y");
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const anglesRef = useRef<number[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const url =
          "https://gist.githubusercontent.com/reactman704/6aa8eae1e67924ef1051c55558763c5f/raw/035bdb931b62f5c288635144fa25f6b0bf990497/Today-Question.json";
        const response = await axios.get<MyCard[]>(url);
        // console.log(response.data);
        // 랜덤 각도 초기화
        anglesRef.current = response.data.map(() =>
          Math.floor(Math.random() * 20 - 10)
        );

        setCardsState(response.data);
      } catch (error) {
        console.error("카드 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchCards();
  }, []);

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

            const randomAxis =
              selected.part === "2" ? (Math.random() > 0.5 ? "Y" : "X") : "Y";

            setFlipAxis(randomAxis);
            setCurrentAxis(randomAxis);
            setFlippedId(selected.id);
            setIsShuffling(false);

            console.log("선택된 카드:", selected, "Axis:", randomAxis);
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
      setFlipAxis("Y");
      setCurrentAxis("Y");
      setFlippedId("0");

      setTimeout(() => {
        setCardsState((prev) => prev.filter((c) => c.id !== "0"));
        setFlippedId(null);
        onShuffle();
      }, 600);
    } else {
      setFlippedId("-1");
      setTimeout(() => {
        setFlippedId(null);
        onShuffle();
      }, 600);
    }
  };

  const flippedCard = cardsState.find(
    (c) => c.id === flippedId && parseInt(flippedId!) > 0
  );

  return (
    <div className="card-wrap">
      <div></div>
      <div className="card-stack">
        {cardsState.map((c, index) => (
          <div
            key={c.id}
            className={`card ${flippedId === c.id ? "flipped" : ""}`}
            data-flip-axis={flipAxis}
            style={{
              transform: `rotate(${isAlign ? 0 : anglesRef.current[index]}deg)`,
              top: `${index * 0.3}px`,
              left: `${index * 0.3}px`,
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
                  c.id === "0" ? "promo-card" : ""
                }`}
                style={{
                  backgroundColor: c.id === "0" ? "#000" : "#fdfdfd",
                  backgroundImage: `url(${c.back})`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-info">
        {flippedCard && !isShuffling ? (
          <div>
            <div>
              {currentAxis === "X" ? flippedCard.title02 : flippedCard.title}
            </div>
            <div>{flippedCard.keyword}</div>
            <div>
              {currentAxis === "X" ? flippedCard.desc02 : flippedCard.desc01}
            </div>
          </div>
        ) : (
          <p>Card Info</p>
        )}
      </div>

      <FortuneButton onClick={onClicked} disabled={isShuffling} />
    </div>
  );
};
