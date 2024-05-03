import React, { useState } from "react";
import "./SellAHome.css";
import StylizedParagraphs from "../TextFomatting/StylizedParagraphs.js";
import beforeYouStart from "../images/sell-a-home/illustrations/illustration4.jpg";
import findingTheDeal from "../images/sell-a-home/illustrations/update5-05.png";
import sealingTheDeal from "../images/sell-a-home/illustrations/illustration6.jpg";

function SellAHome() {
  const [showSellAHomeParagraphBefore, setShowSellAHomeParagraphBefore] =
    useState(true);
  const [showSellAHomeParagraphFinding, setShowSellAHomeParagraphFinding] =
    useState(false);
  const [showSellAHomeParagraphSealing, setShowSellAHomeParagraphSealing] =
    useState(false);
  const [fadeInSellAHomeContent, setFadeInSellAHomeContent] = useState(0);

  function onBeforeYouStartClick() {
    setFadeInSellAHomeContent(1);
    setShowSellAHomeParagraphBefore(true);
    setShowSellAHomeParagraphFinding(false);
    setShowSellAHomeParagraphSealing(false);
  }

  function onFindingTheDealClick() {
    setFadeInSellAHomeContent(1);
    setShowSellAHomeParagraphBefore(false);
    setShowSellAHomeParagraphFinding(true);
    setShowSellAHomeParagraphSealing(false);
  }

  function onSealingTheDealClick() {
    setFadeInSellAHomeContent(1);
    setShowSellAHomeParagraphBefore(false);
    setShowSellAHomeParagraphFinding(false);
    setShowSellAHomeParagraphSealing(true);
  }

  return (
    <div class="sell-a-home-main">
      <h1 class="sell-a-home-heading">Sell a Home</h1>
      <div class="sell-a-home-button-group">
        <button class="sell-a-home-button" onClick={onBeforeYouStartClick}>
          Before You Start
          <div class="button__horizontal"></div>
          <div class="button__vertical"></div>
        </button>

        <button class="sell-a-home-button" onClick={onFindingTheDealClick}>
          Getting the offer
          <div class="button__horizontal"></div>
          <div class="button__vertical"></div>
        </button>

        <button class="sell-a-home-button" onClick={onSealingTheDealClick}>
          Making The Deal
          <div class="button__horizontal"></div>
          <div class="button__vertical"></div>
        </button>
      </div>
      <div
        className="sell-a-home-content-group"
        onAnimationEnd={() => setFadeInSellAHomeContent(0)}
        animation={fadeInSellAHomeContent}
      >
        {showSellAHomeParagraphBefore ? (
          <div class="sell-a-home-content">
            <img
              src={beforeYouStart}
              alt="Before You Start"
              class="sell-a-home-image"
            />

            <h2 class="card-title"> Before you start </h2>

            <p class="buy-a-home-paragraph">
              Selling your home is a hard decision. The four walls have held
              together years of love and memories. This is a daunting task but
              no need to fear.
              <span class="underline">
                {" "}
                Our agents at WRE our experts in the market.{" "}
              </span>{" "}
              They will help you put your best foot forward when preparing to
              sell your home.
            </p>
          </div>
        ) : null}

        {showSellAHomeParagraphFinding ? (
          <div class="sell-a-home-content">
            <img
              src={findingTheDeal}
              alt="Finding The Deal"
              class="sell-a-home-image"
            />
            <h2 class="card-title"> Getting the offer </h2>
            <p class="buy-a-home-paragraph">
              {" "}
              You have an offer. There are multiple steps you can take, accept,
              counteroffer, or reject. But do not fear.{" "}
              <span class="underline">
                {" "}
                Our agents will do the hard work and weigh the options and
                advise you on the best course of action.{" "}
              </span>{" "}
            </p>
          </div>
        ) : null}
        {showSellAHomeParagraphSealing ? (
          <div class="sell-a-home-content">
            <img
              src={sealingTheDeal}
              alt="Making The Deal"
              class="sell-a-home-image"
            />
            <h2 class="card-title"> Making the deal </h2>
            <p class="buy-a-home-paragraph">
              {" "}
              <span class="underline">Congratulations! </span> You have sold
              your home. The hard work and patience has paid off and you have
              entered a new chapter of your life.
            </p>
          </div>
        ) : null}
      </div>
      {/* <iframe src="https://smartmls.mlsmatrix.com/Matrix/public/IDX.aspx?idx=0f243f8" width="100%" height="100%" frameborder="0" marginwidth="0" marginheight="0"></iframe> */}
    </div>
  );
}

export default SellAHome;
