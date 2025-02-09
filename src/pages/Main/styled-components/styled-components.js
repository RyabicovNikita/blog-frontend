import { forwardRef } from "react";
import styled from "styled-components";

export const flexToCenter = {
  display: "flex",
  "align-items": "center",
  "justify-content": "center",
};

export const Section = styled.section`
  height: 120%;
  width: 100%;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  background-image: url(${({ href }) => href});
  background-size: cover;
  background-origin: border-box;
  background-position: top;
`;

const ScrollableContainer = forwardRef(({ className, children, ...props }, ref) => (
  <div className={className} {...props} ref={ref}>
    {children}
  </div>
));

export const Scrollable = styled(ScrollableContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  height: 100%;
  overflow-y: scroll;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, calc(33.3333333% - 20px)));
  grid-gap: 20px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  justify-content: center;
`;

export const Container = styled.div`
  ${flexToCenter}
  height: 70%;
  flex-direction: column;
  gap: 350px;
`;

export const Title = styled.h1`
  font-size: 100px;
  padding: 0;
  margin: 0;
  background: linear-gradient(-45deg, #ffffff, #000000, #ffffff, #ffffff);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animated_text 10s ease-in-out infinite;
  -moz-animation: animated_text 10s ease-in-out infinite;
  -webkit-animation: animated_text 10s ease-in-out infinite;
  @keyframes animated_text {
    0% {
      background-position: 0px 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0px 50%;
    }
  }
`;

export const Arrow = styled.div`
  position: absolute;
  bottom: 25%;
  width: 100%;
  height: 70px;
`;

export const Main = styled.main`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  @keyframes key-down-move {
    0% {
      top: 0;
    }
    100% {
      top: 100%;
    }
  }
`;
