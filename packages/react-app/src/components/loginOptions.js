import React from "react";
import { Button } from "./index";
import WalletButton from "./walletButton"


const LoginOptions = ({provider, loadWeb3Modal, logoutOfWeb3Modal}) => {
    return (
        <div className="login-options-container">
            <div className="flex-left">
                <p>Already a member of the Pxin Gxng?</p>
                <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
            </div>
            {/* <div className="vertical-line"/> */}
            <div className="flex-right vertical-line-left">
                <p>Just trying to see what it's all about?</p>
                <Button>Learn about Ghxsts.</Button>
            </div>
        </div>
    );
}

export default LoginOptions;