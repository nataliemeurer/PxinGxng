import React, { useState, useEffect } from "react";
import { Body, Image } from "./index";
import sleep1 from "../images/sleep1.png";
import sleep2 from "../images/sleep2.png";
import sleep3 from "../images/sleep3.png";
import discord1 from "../images/discord1.png";
import discord2 from "../images/discord2.png";
import discord3 from "../images/discord3.png";
import discord4 from "../images/discord4.png";
import discord5 from "../images/discord5.png";
import work1 from "../images/work1.png";
import work2 from "../images/work2.png";
import work3 from "../images/work3.png";
import zxdiac from "../images/zxdiac.png";
import ghxst from "../images/ghxst.png";
import zxdiacRaffle from "../images/zxdiacRaffle.png";
import offer from "../images/offer.png";
import offer2 from "../images/offer2.png";

const GAME_MOVES = 15;

const PxinGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div class="pxin-game-wrapper">
      {gameStarted ? (
        <GameScreen setGameStarted={setGameStarted} />
      ) : (
        <StartScreen setGameStarted={setGameStarted} />
      )}
    </div>
  );
};

const StartScreen = ({ setGameStarted }) => {
  return (
    <Body>
      <div className={"pxin-game-start-screen"}>
        <h1>Welcome to the Pxin Game.</h1>
        <p style={{ textAlign: "left", fontStyle: "italic" }}>
          The goal of the Pxin Game is to grow your collection of Ghxsts through
          buying them and winning drops.
        </p>
        <p style={{ textAlign: "left", fontStyle: "italic" }}>
          <strong>Warning</strong>: you might not get much sleep, and you'll
          endure a lot of pxin.
        </p>
        <br></br>
        <button class="big-button" onClick={(e) => setGameStarted(true)}>
          Begin the Game
        </button>
      </div>
    </Body>
  );
};

const GameScreen = ({ setGameStarted }) => {
  const [displayContent, setDisplayContent] = useState(null);
  const [moves, setMovesRemaining] = useState(GAME_MOVES);
  const [gameFields, setGameFields] = useState({
    ghxstsCollected: 0,
    zxdiacsCollected: 0,
    availableEth: 0.0,
    zxdiacsAvailable: 1,
    ghxstsAvailable: 2,
  });

  return (
    <>
      {moves > 0 ? (
        <div className="game-area">
          <div className="score-panel">
            <StatElement name="Moves Remaining" value={moves} />
            <StatElement
              name="Zxdiacs Collected"
              value={gameFields.zxdiacsCollected}
            />
            <StatElement
              name="Ghxsts Collected"
              value={gameFields.ghxstsCollected}
            />
            <StatElement name="Available Eth" value={gameFields.availableEth} />
          </div>
          <div className="game-panel">
            <div className="button-options vertical-line-right">
              <div>
                <button
                  className="big-button"
                  onClick={(ev) => {
                    setDisplayContent(<div className="loader">Loading</div>)
                    setDisplayContent(handleDiscordCheck());
                    setMovesRemaining(moves - 1);
                  }}
                >
                  Check Discord for Drops
                </button>
              </div>
              <div>
                <button
                  className="big-button"
                  onClick={(ev) => {
                    setDisplayContent(<div className="loader">Loading</div>)
                    setDisplayContent(handleSleep());
                    setMovesRemaining(moves - 1);
                  }}
                >
                  Sleep
                </button>
              </div>
              <div>
                <button
                  className="big-button"
                  onClick={(ev) => {
                    setDisplayContent(<div className="loader">Loading</div>)
                    setDisplayContent(handleWork(setGameFields));
                    setMovesRemaining(moves - 1);
                  }}
                >
                  Work
                </button>
              </div>
              <div>
                <button
                  disabled={
                    gameFields.zxdiacsAvailable
                      ? gameFields.availableEth < 1.5
                      : gameFields.availableEth < 5
                  }
                  className="big-button"
                  onClick={(ev) => {
                    setDisplayContent(handleOpenSea(setGameFields));
                  }}
                >
                  Buy on Opensea{" "}
                  {(gameFields.availableEth >= 1.5 &&
                    gameFields.zxdiacsAvailable) ||
                  (gameFields.availableEth >= 5 && gameFields.ghxstsAvailable)
                    ? ""
                    : "(insufficient funds)"}
                </button>
              </div>
            </div>
            <div className="display-zone">{displayContent}</div>
          </div>
        </div>
      ) : (
        <GameOverScreen
          gameFields={gameFields}
          setGameFields={setGameFields}
          setMovesRemaining={setMovesRemaining}
        />
      )}
    </>
  );

  function handleDiscordCheck() {
    // we assume that it's a 90 percent
    // likelihood of it being a standard convo
    // 20% chance it's a drop.
    if (Math.random() > 0.2) {
      const randomNum = Math.ceil(Math.random() * 5);
      switch (randomNum) {
        case 1:
          return (
            <HeaderImage
            header={"Cool cats convo -- Lxn shares his absurdly good cats. Nice cats, but no drop."}
            image={discord1}/>
          );
        case 2:
          return (
            <HeaderImage
              header={"07CA bought more Ghxsts. Lots of new purchases in the secondary market, but no drop."}
              image={discord2}/>
          );
        case 3:
          return (
            <HeaderImage
              header={"Franklin shares his updated spreadsheet. Great content, no drop."}
              image={discord3}/>
          );
        case 4:
          return (
            <HeaderImage
              header={"NFT Fiend checks gxs prices. High gas, and no drop."}
              image={discord4}/>
          );
        case 5:
          return <HeaderImage
            header={"BIGDOG drops some hilarious mxmes. No drop still."}
            image={discord5}/>
      }
    } else {
      // select drop options

      const randomNum = Math.ceil(Math.random() * 2);
      if (randomNum == 1) {
        return getZxdiacRaffle();
      } else {
        return offerChallenge();
      }
    }
  }

  function offerChallenge() {
    return <OfferChallenge setGameFields={setGameStarted} gameFields={gameFields} />
  }

  function getZxdiacRaffle() {
    if (gameFields.zxdiacsCollected) {
      if (Math.random() > 0.7) {
        setGameFields(
          Object.assign(gameFields, {
            ghxstsCollected: gameFields.ghxstsCollected + 1,
          })
        );
        return (
          <HeaderImage
            header={"Zxdiac Raffle!"}
            description={"You enter your Zxdiac and...you WIN! You get a Ghxst."}
            image={zxdiacRaffle}/>
        );
      } else if (Math.random() > 0.5) {
        setGameFields(
          Object.assign(gameFields, {
            zxdiacsCollected: gameFields.zxdiacsCollected + 1,
          })
        );
        return (
          <HeaderImage
            header={"Zxdiac Raffle!"}
            description={"You enter your Zxdiac and...Sven O wins! Luckily, Sven is a Zxdiac collector and gifted a Zxdiac to someone for winning. You get it."}
            image={zxdiacRaffle}/>
        );
      } else {
        return (
          <HeaderImage
            header={"Zxdiac Raffle!"}
            description={"You enter your Zxdiac and...you lose. Better luck next time."}
            image={zxdiacRaffle}/>
        );
      }
    }
    return (
      <HeaderImage
            header={"Zxdiac Raffle!"}
            description={"Unfortunately, you don't own a Zxdiac..."}
            image={zxdiacRaffle}/>
    );
  }

  function handleSleep() {
    let num = Math.ceil(Math.random() * 3);
    if (num == 1) {
      return (
        <HeaderImage
          header={"Can't sleep"}
          image={sleep1}/>
      );
    } else if (num == 2) {
      return (
        <HeaderImage
          header={"Can't sleep"}
          image={sleep2}/>
      );
    } else {
      return (
        <HeaderImage
          header={"Finally fell asleep and missed a drop."}
          image={sleep3}/>
      );
    }
  }

  function handleOpenSea() {
    if (gameFields.zxdiacsAvailable) {
      setGameFields(
        Object.assign(gameFields, {
          zxdiacsAvailable: gameFields.zxdiacsAvailable - 1,
          zxdiacsCollected: gameFields.zxdiacsCollected + 1,
          availableEth: gameFields.availableEth - 1.5,
        })
      );
      return (
        <>
          <h2>Purchased a Zxdiac for 1.5 ETH!</h2>
          <img src={zxdiac}></img>
        </>
      );
    } else if (gameFields.ghxstsAvailable) {
      setGameFields(
        Object.assign(gameFields, {
          ghxstsAvailable: gameFields.ghxstsAvailable - 1,
          ghxstsCollected: gameFields.ghxstsCollected + 1,
          availableEth: gameFields.availableEth - 5,
        })
      );
      return (
        
        <>
          <h2>Purchased a Ghxst for 5 ETH!</h2>
          <img src={ghxst}></img>
        </>
      );
    }
  }

  function handleWork(setGameFields) {
    let num = Math.ceil(Math.random() * 3);
    if (num == 1) {
      setGameFields(
        Object.assign(gameFields, {
          availableEth: gameFields.availableEth + 0.5,
        })
      );
      return (
        <HeaderImage header={"You have an unproductive day at work thinking about Ghxsts. +0.5 ETH."} image={work1}/>
      );
    } else if (num == 2) {
      Object.assign(gameFields, {
        availableEth: gameFields.availableEth + 1,
      });
      return (
        <HeaderImage header={"You have a fairly productive day at work. +1.0 ETH."} image={work2}/>
      );
    } else {
      setGameFields(
        Object.assign(gameFields, {
          availableEth: gameFields.availableEth + 1.5,
        })
      );
      return (
        <HeaderImage header={"You have a wildly productive day at work. +1.5 ETH."} image={work3}/>
      );
    }
  }
};

const StatElement = ({ name, value }) => {
  return (
    <div className="stat">
      <span className="stat-title">{name}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
};

const HeaderImage = ({header, image, description}) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
        <div className={`loader ${loading ? 'visible' : 'hidden'}`}></div>
        <div className={loading ? 'hidden' : 'visible'}>
          <h2>{header}</h2>
          {description ? <small>{description}</small> : ""}
          <div className={`loader ${loading ? 'visible' : 'hidden'}`}></div>
          <img src={image} onLoad={() => setLoading(false)}></img>
        </div>
      </>
  )
}

const OfferChallenge = ({ setGameFields, gameFields }) => {
    let [successfulOffer, setSuccess] = useState(false);
    let [failedOffer, setFailed] = useState(false);
    let [offerText, setOffer] = useState("");
    const [timer, setTimeLeft] = useState(5);

    // offer1 -> 0.68, offer2 -> >.05
    const [offerOption, setOfferOption] = useState(Math.ceil(Math.random() * 2));

    useEffect(() => {
      const timerFunc = setTimeout(() => {
        if (timer > 0 && !successfulOffer) {
          setTimeLeft(timer - 1);
        }
      }, 1000);

      // Clear timeout if the component is unmounted
      return () => clearTimeout(timer);
    });
    return (
      <>
        <img src={offerOption === 1 ? offer : offer2}/>
        <h2>Time Remaining: {timer}</h2>
        <div className="offer-input">
          <input type="text" onChange={ev => setOffer(ev.target.value)}/>
          <button disabled={timer <= 0 || successfulOffer } onClick={(ev) => {
            setFailed(false)
            if (timer > 0) {
              if ((offerOption == 1 && parseFloat(offerText) == 0.68) || (offerOption == 2 && parseFloat(offerText) > 0.05)) {
                setGameFields(
                  Object.assign(gameFields, {
                    ghxstsCollected: gameFields.ghxstsCollected + 1,
                  })
                );
                setSuccess(true)
              } else {
                setFailed(true)
              }
            }
            
          }}>Submit</button>
        </div>
        <br></br>
        {failedOffer ? <small>Wrong amount. Better luck next time.</small> :<></>}
        {successfulOffer ? <small>Got it! +1 Ghxst.</small> : <></>}
        {timer === 0 ? <small>Out of time!</small> : <></>}
      </>);
}

const GameOverScreen = ({ gameFields, setGameFields, setMovesRemaining }) => {
  return (
    <div
      className={"pxin-game-start-screen"}
      style={{ marginTop: "50px", color: "white", padding: "30px"}}
    >
      <h1>Game Over</h1>
      <div className="game-over-score">
        <StatElement
          name="Zxdiacs Collected"
          value={gameFields.zxdiacsCollected}
        />
        <StatElement
          name="Ghxsts Collected"
          value={gameFields.ghxstsCollected}
        />
      </div>
      <button
        class="big-button"
        onClick={(e) => {
          setMovesRemaining(GAME_MOVES);
          setGameFields({
            ghxstsCollected: 0,
            zxdiacsCollected: 0,
            availableEth: 0.0,
            zxdiacsAvailable: 1,
            ghxstsAvailable: 2,
          });
        }}
      >
        Play Again?
      </button>
    </div>
  );
};

export default PxinGame;
