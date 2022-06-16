import styled from "styled-components";

export const FooterWrapper = styled.div`
  background: var(--darkGrey);
  padding: 0 20px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const FooterContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding 20px 0;
    marging: 0 auto;
    text: var(--white);
`;

export const TMDBLogoImg = styled.img`
  width: 100px;
  justify-content: end;

  @media screen and (max-width: 500px) {
    width: 80px;
  }
`;
