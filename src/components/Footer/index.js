import React from "react";

import { FooterWrapper, FooterContent, TMDBLogoImg } from "./Footer.styles";
import TMDBLogo from "../../images/tmdb-logo.svg";

const Footer = () => (
  <FooterWrapper>
    <FooterContent>
      <p>&copy; {new Date().getFullYear()} Copyright: De Software Kipduiven</p>
      <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
    </FooterContent>
  </FooterWrapper>
);

export default Footer;
