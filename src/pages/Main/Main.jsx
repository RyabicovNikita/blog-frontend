import styled from "styled-components";
import { CardSection, MainSection } from "./components";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { POSTS_ACTION_TYPES } from "../../services/store/constants";

const Main = styled.main`
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

export const MainContainer = () => {
  const dispatch = useDispatch();
  const cardSectionRef = useRef();
  const handleScrollDownClick = () => {
    cardSectionRef.current.scrollIntoView();
  };
  useEffect(() => {
    return () => dispatch({ type: POSTS_ACTION_TYPES.CLEAR_POSTS });
  }, []);
  return (
    <Main>
      <MainSection scrollDownClick={handleScrollDownClick} />
      <CardSection cardSectionRef={cardSectionRef} />
    </Main>
  );
};
