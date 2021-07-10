import React from "react";
import { Body, Image } from "./";
import LoginOptions from "./loginOptions";
import logo from "../logo.png";

const Home = ({provider, loadWeb3Modal, logoutOfWeb3Modal, walletGhxsts}) => {
    return (<div>
      	
        <Body>
          <p>Gxng.</p>
          <Image src={logo} alt="gxng-gxng" />
          {walletGhxsts
            ? <p>Already a member, I see! Head over to check out your ghosts.</p>
            : (
              provider
              ? <p>We're glad to have you here, but it looks like you don't own any ghxsts. Check out more information on the collection.</p>
              : <LoginOptions provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />)}
        </Body>
      </div>)
}

export default Home;