import React, { useState, useEffect } from "react";
import { OpenSeaPort, Network } from "opensea-js";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import { Button, Image } from "./components";
import About from "./components/about";
import Ghxsts from "./components/ghxsts";
import Home from "./components/home";
import WalletButton from "./components/walletButton";
import wideLogo from "./wide-logo.png";
import useWeb3Modal from "./hooks/useWeb3Modal";
import axios from 'axios';
import detectEthereumProvider from '@metamask/detect-provider';



function App() {
  // Get user ghxsts if they are available
  const [walletGhxsts, setWalletGhxsts] = useState(null)
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  useEffect(() => {
    async function fetchWalletInfo() {
      // only support one account for now
      const provider = await detectEthereumProvider();
      let account = await provider.request({ method: 'eth_accounts' });
      const seaport = new OpenSeaPort(provider, {
        networkName: Network.Main
      })
      const accountAddress = account[0]
      const response = await axios.get("https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&collection=ghxsts&owner=" + accountAddress)
      setWalletGhxsts(response.data.assets);
    }
    if (provider) {
      fetchWalletInfo()
    }
  }, [provider])

  return (
    <Router>
        <header class="header">
          <Link to="/"><span class="logo"><Image src={wideLogo} alt="react-logo" /></span></Link>
          <ul class="main-nav">
            <Link to="/about"><Button>About Ghxsts</Button></Link>
            {walletGhxsts != null ? <Link to="/ghxsts"><Button>View My Ghxsts</Button></Link> : <></>}
            <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
          </ul>
        </header> 
         <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/ghxsts">
            <Ghxsts walletGhxsts={walletGhxsts} />
          </Route>
          <Route path="/">
            <Home provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} walletGhxsts={walletGhxsts}/>
          </Route>
        </Switch>
    </Router>
    
  );
}

export default App;
