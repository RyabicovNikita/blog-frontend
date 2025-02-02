import styled from "styled-components";
import { notFound_img } from "../../images";

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${notFound_img});
  background-size: contain;
  background-origin: border-box;
  background-position: top;
`;

export const Error404 = () => (
  <ErrorContainer>
    <ErrorMessage>
      <h1>404</h1>
      <h2>Page not found :(</h2>
    </ErrorMessage>
  </ErrorContainer>
);
