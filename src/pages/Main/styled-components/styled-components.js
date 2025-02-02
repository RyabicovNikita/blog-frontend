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
