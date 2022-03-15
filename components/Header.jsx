import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";

export default function Header() {
  const Nav = styled.nav`
    @media (min-width: 320px) and (max-width: 639px) {
      justify-content: center;
      display: flex;
    }

    display: flex;
    margin: 1rem 0;

    a {
      display: flex;
      align-items: center;
    }
  `;

  const NavPictureContainer = styled.div`
    @media (min-width: 320px) and (max-width: 639px) {
      display: flex;
      justify-content: center;
    }

    display: flex;
    align-items: center;
    margin: 0 auto;

    img {
      width: 5.5rem;
      height: 5rem;
      border-radius: 50%;
      border: 0.3rem solid var(--white);
      object-fit: cover;
    }
  `;

  const NavLinkHome = styled(Link)`
    display: flex;
    text-decoration: none;
  `;

  const NavLinkText = styled.h1`
    align-items: center;
    margin: 0 1rem;
    font-size: 1.5rem;
    letter-spacing: -0.065rem;
    font-family: var(--text);
  `;

  return (
    <Nav>
      {/* 
      <a href="https://calmohtml.vercel.app/" rel="noopener noreferrer">
        <FaArrowLeft />
      </a> 
      */}
      <NavPictureContainer>
        <Image
          src="/me_v2.jpg"
          alt="Photo of Joan Segovia"
          width={70}
          height={70}
          loading="eager"
          layout="intrinsic"
          quality={50}
          placeholder="empty"
          objectFit="cover"
        />
        <NavLinkHome passHref href="/">
          <NavLinkText>Blog - Joan Segovia</NavLinkText>
        </NavLinkHome>
      </NavPictureContainer>
    </Nav>
  );
}

{
  /* <FaArrowLeft /> */
}
