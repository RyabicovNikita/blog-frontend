import styled from "styled-components";

const ModalContainer = ({ className, children }) => (
  <div className={className}>
    <div className="modal__bg"></div>
    <div className="modal__content">{children}</div>
  </div>
);

export const Modal = styled(ModalContainer)`
  position: absolute;
  width: 100svw;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  left: 0;
  top: 0;
  .modal__bg {
    backdrop-filter: blur(1px);
    background-color: #0001;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .modal__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: black;
    min-width: 20vw;
    min-height: 20vh;
    z-index: 5;
    border-radius: 30px;
  }
`;
