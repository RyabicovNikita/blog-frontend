import { CardSection, MainSection } from "./components";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { POSTS_ACTION_TYPES } from "../../services/store/constants";
import { Main } from "./styled-components";

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
