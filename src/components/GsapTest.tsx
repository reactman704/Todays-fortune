import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
export const GsapTest = () => {
  useEffect(() => {
    gsap.to(".box", {
      x: 200,
      duration: 1,
      scrollTrigger: {
        trigger: ".box",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
        // markers: true,
      },
    });
  }, []);

  return (
    <>
      <div style={{ height: "200vh", padding: "100px" }}>
        <div
          className="box"
          style={{ width: 100, height: 100, background: "tomato" }}
        >
          스크롤 박스
        </div>
      </div>
    </>
  );
};
