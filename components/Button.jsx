import styled from "styled-components";

const Button = ({ text }) => {
  const Button = styled.button`
    @media (min-width: 320px) and (max-width: 768px) {
      z-index: 1;
    }

    font-family: var(--text);
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.563rem;
    background-color: var(--blue);
    color: var(--grey);
    border: 0.2rem solid var(--white);
    border-radius: 0.4rem;
    margin: 0.375rem 0;
    outline: none;
    z-index: 1;
    transition: color 0.15s ease-in-out;
    position: relative;
    box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.9);

    :before {
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: -1;
      transform: scaleX(0);
      transform-origin: left;
      background: var(--white);
      transition: transform 0.15s ease-in-out;
    }

    :focus,
    :hover {
      color: var(--blue);
      border: 0.5vh solid var(--light-blue);
    }

    :focus:before,
    :hover:before {
      transform: scaleX(1);
    }
  `;

  return <Button type="submit">{text}</Button>;
};

export default Button;
