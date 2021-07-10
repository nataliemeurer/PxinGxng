import React from "react";

const Ghxsts = ({ walletGhxsts }) => {
  if (walletGhxsts == null) {
    return <p>Loading...</p>;
  } else {
    console.log(walletGhxsts);
    return (
      <div className="ghxsts-display">
        {walletGhxsts.map((asset) => (
            <a href={asset.permalink} target="_blank">
                <div className="card">
                    <div className="card__image-holder">
                        <img className="card__image" src={asset.image_preview_url} alt="wave" />
                    </div>
                    <div className="card-title">
                        <a href="#" className="toggle-info btn">
                            <span className="left"></span>
                            <span className="right"></span>
                        </a>
                        <h2>
                            {asset.name}
                        </h2>
                        </div>
                        <div className="card-flap flap1">
                        <div className="card-description">
                            This grid is an attempt to make something nice that works on touch devices. Ignoring hover states when they're not available etc.
                        </div>
                    </div>
                </div>
            </a>
     ))};
    </div>);
  }
}
  
            /* <div className="card">
              <img src={asset.image_preview_url} />
            </div>
            <div class="card-title">
              <a href="#" class="toggle-info btn">
                <span class="left"></span>
                <span class="right"></span>
              </a>
              <h2>
                Card title
                <small>Image from unsplash.com</small>
              </h2>
            </div>
          </>
        ))}
      </div> */

export default Ghxsts;
