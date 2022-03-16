import styled from "styled-components";

const Footer = () => {
  const getYear = new Date().getFullYear();

  const Footer = styled.footer`
    @media (max-width: 640px) {
      display: none;
    }

    margin: 6rem auto;
    width: 90%;
    text-align: center;
    font-family: var(--titles);
    font-size: 1.4rem;

    a {
      text-decoration: none;

      &:hover {
        color: var(--grey);
      }
    }
  `;

  return (
    <Footer>
      Copyright © {getYear} Joan Segovia - Created by{" "}
      <a href="https://github.com/calmohtml">@calmohtml</a>
    </Footer>
  );
};

export default Footer;
