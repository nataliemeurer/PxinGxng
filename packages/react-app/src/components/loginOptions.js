import React from "react";
import { Button } from "./index";
import WalletButton from "./walletButton";
import { Link } from "react-router-dom";

const LoginOptions = ({ provider, loadWeb3Modal, logoutOfWeb3Modal }) => {
  return (
    <div className="login-options-container">
      <div className="flex-left">
        <p>Already a member of the Pxin Gxng?</p>
        <WalletButton
          provider={provider}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
      </div>
      <div className="flex-right vertical-line-left">
        <p>Just trying to see what it's all about?</p>
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/meme-pxin-practice";
          }}
        >
          Play the Pxin Game
        </Button>
      </div>
    </div>
  );
};

export default LoginOptions;
