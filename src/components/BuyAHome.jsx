import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./BuyAHome.css";
import config from "../config";
import ListingsLayout from "./ListingsLayout.jsx";
import beforeYouBuy from "../assets/buy-a-home/illustrations/update1-03.avif";
import findingTheDeal from "../assets/buy-a-home/illustrations/update2-02.avif";
import sealingTheDeal from "../assets/buy-a-home/illustrations/update3-03.avif";
import closeModalImg from "../assets/close-modal.avif";

Modal.setAppElement("#root");

function BuyAHome() {
  const [showBuyAHomeParagraphBefore, setShowBuyAHomeParagraphBefore] =
    useState(true);
  const [showBuyAHomeParagraphFinding, setShowBuyAHomeParagraphFinding] =
    useState(false);
  const [showBuyAHomeParagraphSealing, setShowBuyAHomeParagraphSealing] =
    useState(false);
  const [fadeInBuyAHomeContent, setFadeInBuyAHomeContent] = useState(0);
  const [listings, setListings] = useState({});
  const [listingsModalIsOpen, setListingsModalIsOpen] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  // useEffect(() => {
  //   getListings();
  // }, []);

  function onBeforeYouBuyClick() {
    setFadeInBuyAHomeContent(1);
    setShowBuyAHomeParagraphBefore(true);
    setShowBuyAHomeParagraphFinding(false);
    setShowBuyAHomeParagraphSealing(false);
  }

  function onFindingTheDealClick() {
    setFadeInBuyAHomeContent(1);
    setShowBuyAHomeParagraphBefore(false);
    setShowBuyAHomeParagraphFinding(true);
    setShowBuyAHomeParagraphSealing(false);
  }

  function onSealingTheDealClick() {
    setFadeInBuyAHomeContent(1);
    setShowBuyAHomeParagraphBefore(false);
    setShowBuyAHomeParagraphFinding(false);
    setShowBuyAHomeParagraphSealing(true);
  }

  async function getListings() {
    try {
      const response = await fetch(`${config.SERVER_URL}/get-listings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setListings(data);
      // console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  function openModal() {
    document.documentElement.style.setProperty(
      "--scroll-top",
      "-" + document.documentElement.scrollTop + "px",
    );
    setScrollTop(document.documentElement.scrollTop);
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    document.body.classList.remove("modal-open");
    window.scrollTo(0, scrollTop);
  }

  function openListingsModal() {
    openModal();
    setListingsModalIsOpen(true);
  }

  function closeListingsModal() {
    closeModal();
    setListingsModalIsOpen(false);
  }

  return (
    <div className="buy-a-home-main">
      <h1 className="buy-a-home-heading">Buy a Home</h1>
      <div className="buy-a-home-button-group">
        <button className="buy-a-home-button" onClick={onBeforeYouBuyClick}>
          Before You Buy
          <div className="button__horizontal"></div>
          <div className="button__vertical"></div>
        </button>

        <button className="buy-a-home-button" onClick={onFindingTheDealClick}>
          Finding The Deal
          <div className="button__horizontal"></div>
          <div className="button__vertical"></div>
        </button>

        <button className="buy-a-home-button" onClick={onSealingTheDealClick}>
          Sealing The Deal
          <div className="button__horizontal"></div>
          <div className="button__vertical"></div>
        </button>
      </div>

      <div
        className="buy-a-home-content-group"
        onAnimationEnd={() => setFadeInBuyAHomeContent(0)}
        animation={fadeInBuyAHomeContent}
      >
        {showBuyAHomeParagraphBefore ? (
          <div className="buy-a-home-content">
            <img
              src={beforeYouBuy}
              alt="Before You Buy"
              className="buy-a-home-image"
            />

            <h2 className="card-title"> Before you buy</h2>

            <p className="buy-a-home-paragraph">
              Buying a home is one of the most challenging and rewarding
              experiences in your life. To guarantee a smooth process, contact
              your bank to get a preapproval letter. If you have any questions
              feel free to reach out to one of our qualified agents.{" "}
              <span className="underline">
                {" "}
                WRE is always here to serve you.{" "}
              </span>
            </p>
          </div>
        ) : null}

        {showBuyAHomeParagraphFinding ? (
          <div className="buy-a-home-content">
            <img
              src={findingTheDeal}
              alt="Finding The Deal"
              className="buy-a-home-image"
            />

            <h2 className="card-title"> Finding the deal </h2>

            <p className="buy-a-home-paragraph">
              {" "}
              Finding the right home is as much as an art as it is a science.
              The first step is figure out what you want vs what you need in a
              home. When house hunting you should consider other factors beyond
              the price and style.{" "}
              <span className="underline">
                Our agents at WRE are best in understanding your budget, tastes,
                and lifestyles.{" "}
              </span>{" "}
            </p>
          </div>
        ) : null}
        {showBuyAHomeParagraphSealing ? (
          <div className="buy-a-home-content">
            <img
              src={sealingTheDeal}
              alt="Sealing The Deal"
              className="buy-a-home-image"
            />

            <h2 className="card-title"> Sealing the deal </h2>

            <p className="buy-a-home-paragraph">
              {" "}
              You spotted the perfect home! Now the next step is to make the
              offer, and making an agreement with the seller. This is a grueling
              and tedious time but you do not have to worry.{" "}
              <span className="underline">
                {" "}
                Our trusted agents will guide you through the process.{" "}
              </span>{" "}
            </p>
          </div>
        ) : null}
      </div>
      <button
        className="listings-modal-button"
        onClick={() => openListingsModal()}
      >
        {" "}
        Listings{" "}
      </button>
      <Modal
        className="listings-modal"
        isOpen={listingsModalIsOpen}
        onRequestClose={() => closeListingsModal()}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 2,
          },
        }}
      >
        <div className="listings-modal-heading">
          <img
            src={closeModalImg}
            alt="Close Modal"
            className="close-listings-modal-button"
            onClick={() => closeListingsModal()}
          />
        </div>
        <div className="listings-modal-content">
          <ListingsLayout listings={listings} />
        </div>
      </Modal>
    </div>
  );
}

export default BuyAHome;
