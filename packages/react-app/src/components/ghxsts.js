import React from "react";

const Ghxsts = ({ walletGhxsts }) => {
  if (walletGhxsts == null) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
          {walletGhxsts.map(
              asset => (
                  <img src={asset.image_preview_url} />
              )
          )}
      </>
    );
  }
};

export default Ghxsts;
