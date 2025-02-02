import styled from "styled-components";

export const flexToCenter = {
  display: "flex",
  "align-items": "center",
  "justify-content": "center",
};
export const mainBRadius = {
  "border-radius": "15px",
};

const urlMainPageImage = "../../images/";

export const getStyledSection = (styles) => styled.section`
  height: 120%;
  width: 100%;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  width: 100%;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background-image: url(${urlMainPageImage});
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-origin: border-box;
  background-position: top;
  ${styles}
`;

export const Section = styled.section`
  height: 120%;
  width: 100%;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;
