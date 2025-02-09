import styled from "styled-components";

const ErrorContainer = ({ className, children, styles }) => <div className={className}>{children}</div>;

export const Error = styled(ErrorContainer)`
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ styles }) => styles};
`;
