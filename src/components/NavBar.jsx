export const NavBar = ({
  scrollToLandingPage,
  scrollToBuyAHome,
  scrollToSellAHome,
  scrollToAboutUs,
}) => {
  return (
    <nav className="navigation">
      <button className="navigation-button" onClick={scrollToLandingPage}>
        <span>Home</span>
      </button>
      <span className="separator">|</span>
      <button className="navigation-button" onClick={scrollToBuyAHome}>
        <span>Buy</span>
      </button>
      <span className="separator">|</span>
      <button className="navigation-button" onClick={scrollToSellAHome}>
        <span>Sell</span>
      </button>
      <span className="separator">|</span>
      <button className="navigation-button" onClick={scrollToAboutUs}>
        <span>About Us</span>
      </button>
    </nav>
  );
};
