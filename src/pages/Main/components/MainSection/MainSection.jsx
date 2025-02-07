import styled from "styled-components";
import { mainBack_img } from "../../../../images";
import { flexToCenter, Section } from "../../styled-components";
import { Icon } from "../../../../components";
import PropTypes from "prop-types";

const Container = styled.div`
  ${flexToCenter}
  height: 70%;
  flex-direction: column;
  gap: 350px;
`;

const Title = styled.h1`
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

const Arrow = styled.div`
  position: absolute;
  bottom: 25%;
  width: 100%;
  height: 70px;
`;

export const MainSection = ({ scrollDownClick }) => (
  <Section href={mainBack_img}>
    <Container>
      <Title>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Title>
      <Arrow>
        <Icon
          className="fa fa-chevron-down drop-down-icon"
          styles={
            "cursor: pointer; position: absolute;top: 0;animation: key-down-move alternate;animation-duration: 2s;animation-iteration-count: infinite;"
          }
          onClick={scrollDownClick}
        />
      </Arrow>
    </Container>
  </Section>
);

MainSection.propTypes = {
  scrollDownClick: PropTypes.func.isRequired,
};
