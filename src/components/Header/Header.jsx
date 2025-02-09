import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import { headerBack_img, logoBack_img } from "../../images";
import { Navigation } from "./components";
import { NavBarContainer } from "./components/NavBar/NavBar";

const getStyles = ({ href, backgroundposition, jcontent, fontSize }) => `
  display: flex;
  justify-content: ${jcontent};
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;
  background-image: url(${href});
  background-position: ${backgroundposition};
  font-size: ${fontSize}px;
  `;

const Header = styled.div`
  position: relative;
  height: 100%;
  max-height: 120px;
  gap: 15px;
  background-origin: border-box;
  z-index: 2;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  box-shadow: 0px 20px 25px 2px rgba(0, 0, 0, 1);
  overflow-y: scroll;
  ${({ href, backgroundposition, jcontent, fontSize }) => getStyles({ href, backgroundposition, jcontent, fontSize })}
  @media(max-width: 780px) {
    font-size: 20px;
  }
`;

const LogoLink = styled(Link)`
  width: 270px;
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 15px;
  @media (max-width: 780px) {
    font-size: 20px;
    width: 100px;
    padding: 30px;
  }
  ${({ href, backgroundposition, jcontent, fontSize }) => getStyles({ href, backgroundposition, jcontent, fontSize })}
`;

export const HeaderContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contextMenuAnimation, setContextMenuAnimation] = useState({});

  return (
    <>
      <Header href={headerBack_img} backgroundposition="bottom" jcontent="space-between" fontSize="35">
        <LogoLink href={logoBack_img} to="/" backgroundposition="center" jcontent="center" fontSize="65">
          Blog
        </LogoLink>
        <Navigation />
        <NavBarContainer
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setContextMenuAnimation={setContextMenuAnimation}
        />
      </Header>
      {isMenuOpen && <DropDownMenu setIsMenuOpen={setIsMenuOpen} animation={contextMenuAnimation} />}
    </>
  );
};
