import { mainBack_img } from "../../../../images";
import { Arrow, Container, Section, Title } from "../../styled-components";
import { Icon } from "../../../../components";
import PropTypes from "prop-types";
export const MainSection = ({ scrollDownClick }) => (
  <Section href={mainBack_img}>
    <Container>
      <Title>All about programming and even a little more</Title>
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
