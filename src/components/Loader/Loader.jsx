import styled from "styled-components";

export const Loader = styled.div`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(50%, 50%);
  width: 200px;
  height: 200px;
  background-size: cover;
  background-origin: border-box;
  background-position: top;
  animation: loader 1.5s infinite;
  background-image: url("../../images/loader.png");

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
