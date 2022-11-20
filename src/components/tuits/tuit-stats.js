import React, { useEffect, useState } from "react";
import * as service from "../../services/likes-service";
const TuitStats = ({ tuit, likeTuit, dislikeTuit }) => {
  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col">
        <span onClick={async () => await likeTuit(tuit)}>{
          tuit.stats.likes > 0 && <i class="fa-solid fa-thumbs-up"></i>
          ||
          tuit.stats.likes <= 0 && <i class="fa-regular fa-thumbs-up"></i>
        }
          {tuit.stats && tuit.stats.likes}
        </span>
      </div>
      <div className="col">
        <span onClick={async () => await dislikeTuit(tuit)}>{
          tuit.stats.dislikes > 0 && <i class="fa-solid fa-thumbs-down"></i>
          ||
          <i class="fa-regular fa-thumbs-down"></i>
        }
          {tuit.stats && tuit.stats.dislikes}
        </span>
      </div>
      <div className="col">
        <i className="far fa-inbox-out"></i>
      </div>
    </div >
  );
}

export default TuitStats;