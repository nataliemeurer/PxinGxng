import React from "react";
import { Body, Image } from "./";
import LoginOptions from "./loginOptions";
import logo from "../logo.png";

const Home = ({ provider, loadWeb3Modal, logoutOfWeb3Modal, walletGhxsts }) => {
  return (
    <div>
      <Body>
        <Image src={logo} alt="gxng-gxng" style={{marginTop: "-40px"}} />
        {walletGhxsts ? (
          getLoggedInMessage(walletGhxsts)
        ) : provider ? (
          <p>
            We're glad to have you here, but it looks like you don't own any
            ghxsts. Check out more information on the collection.
          </p>
        ) : (
          <LoginOptions
            provider={provider}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
          />
        )}
      </Body>
    </div>
  );
};

const getLoggedInMessage = (walletGhxsts) => {
  if (walletGhxsts != null) {
    console.log(walletGhxsts);
    const ghxst =
      walletGhxsts.filter((asset) => asset.name.toLowerCase().includes("ghxst"))
        .length > 0;
    const alixn =
      walletGhxsts.filter((asset) => asset.name.toLowerCase().includes("alixn"))
        .length > 0;
    const demxn =
      walletGhxsts.filter((asset) => asset.name.toLowerCase().includes("demxn"))
        .length > 0;
    const sirxn =
      walletGhxsts.filter((asset) => asset.name.toLowerCase().includes("sirxn"))
        .length > 0;
    const zxdiac =
      walletGhxsts.filter((asset) =>
        asset.name.toLowerCase().includes("zxdiac")
      ).length > 0;
    const immxrtal =
      walletGhxsts.filter((asset) =>
        asset.name.toLowerCase().includes("immxrtal")
      ).length > 0;
    const mythicxl = (alixn || demxn || sirxn) && ghxst;
    const gxd = mythicxl && immxrtal;
    return (
      <div className="welcome-widget">
        <h3>Welcome Back</h3>
        {renderConditionalGreetings(walletGhxsts, gxd, mythicxl, immxrtal, zxdiac, sirxn, demxn, alixn, ghxst)}
        {walletGhxsts.length
          ? <><br/><small>If you ask me, my favorite in your collection is the {randomGhxstName(walletGhxsts)}.</small></>: <></>}
      </div>
    );
  } else {
    return <p>Hi</p>;
  }
};

function renderConditionalGreetings(walletGhxsts, gxd, mythicxl, immxrtal, zxdiac, sirxn, demxn, alixn, ghxst) {
  if (gxd) {
    return <>
      <p>It looks like you're on track to a GXD!?! WOW.</p>
      <small>
        You must have endured a lot of pxin to get those{" "}
        {walletGhxsts.length} ghxsts... Let's just call you PXIN CONQUEROR from here on out.
      </small>
    </>
  } else if (mythicxl) {
    return <>
      <p>I have read the zxdiac signs, and I see a Mythicxl in your future.</p>
      <small>
        You have a pretty great collection - a solid
        {walletGhxsts.length} ghxsts...
      </small>
    </>
  } else if (immxrtal) {
    return <>
      <p>That's an absolutely B E A U T I F U L immxrtal you have there.</p>
      <small>
        I'll make you a special deal. One pickle for your {walletGhxsts.length} ghxsts (kidding, kidding)?
      </small>
    </>
  } else if (demxn) {
    return <>
      <p>Honestly, your Demxn is pretty terrifying. It's freaking me out.</p>
      <small>
        It's an awesome collection of {walletGhxsts.length} ghxsts you have there.
      </small>
    </>
  } else if (zxdiac) {
    return <>
      <p>The Zxdiacs are my personal favorites. I love yours.</p>
      <small>
        It's an awesome collection of {walletGhxsts.length} zxdiaxs you have there. Still, maybe time to get a ghxst?
      </small>
    </>
  } else if (alixn) {
    return <>
      <p>That Alixn you have is out.of.this.world.</p>
      <small>
        Bad joke, I know.
      </small>
    </>
  } else if (ghxst) {
    return <>
      <p>Wow, a Ghxst from the original 101. It's glorious.</p>
      <small>
        Have you considered picking up a Demxn or an Alixn? They could set you up for a Mythicxl.
      </small>
    </>
  } else {
    return <>
      <p>It looks like you haven't yet joined the PXIN GXNG just yet. It feels like it might be time?</p>
      <small>
        I'd recommend starting with a <a href="https://opensea.io/assets/ghxsts?search[query]=zxdiac">Zxdiac</a>. They're priced lowest and offer the most utility.
      </small>
    </>
  }
}

function randomGhxstName(walletGhxsts) {
  return walletGhxsts[Math.floor(Math.random() * walletGhxsts.length)].name
}



export default Home;
