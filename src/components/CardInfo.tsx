import React from "react";
import type { MyCard } from "./Card"; // 타입 가져오기

interface CardInfoProps {
  flippedCard: MyCard | null | undefined;
  isShuffling: boolean; // 이름이 isShuffling 이어야 함
  currentAxis: "X" | "Y";
}
export const CardInfo = ({
  flippedCard,
  isShuffling,
  currentAxis,
}: CardInfoProps) => {
  return (
    <>
      {flippedCard && !isShuffling ? (
        <div>
          <div className="card-info-title">
            {currentAxis === "X" ? flippedCard.title02 : flippedCard.title}
          </div>
          <div className="card-info-keyword">{flippedCard.keyword}</div>
          <div className="card-info-desc">
            {currentAxis === "X" ? flippedCard.desc02 : flippedCard.desc01}
          </div>
        </div>
      ) : (
        <div>
          <div className="card-info-title"></div>
          <div className="card-info-keyword"></div>
          <div className="card-info-desc"></div>
        </div>
      )}
    </>
  );
};
