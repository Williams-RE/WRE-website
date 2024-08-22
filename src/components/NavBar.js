import { useRef } from "react";

export const NavBar = () => {
  const landingPageRef = useRef();
  const buyAHomeRef = useRef();
  const sellAHomeRef = useRef();
  const aboutUsRef = useRef();

  function scrollToLandingPage() {
    landingPageRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToBuyAHome() {
    buyAHomeRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToSellAHome() {
    sellAHomeRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToAboutUs() {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav class="navigation">
      <button class="navigation-button" onClick={scrollToLandingPage}>
        <span class="">Home</span>
      </button>
      <span class="separator">|</span>
      <button class="navigation-button" onClick={scrollToBuyAHome}>
        <span class="">Buy</span>
      </button>
      <span class="separator">|</span>
      <button class="navigation-button" onClick={scrollToSellAHome}>
        <span class="">Sell</span>
      </button>
      <span class="separator">|</span>
      <button class="navigation-button" onClick={scrollToAboutUs}>
        <span class="">About Us</span>
      </button>
    </nav>
  );
};
