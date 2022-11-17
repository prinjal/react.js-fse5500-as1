import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
  const [dislikedTuit, setDisLikedTuis] = useState([]);
  const findTuitsIDisLike = () =>
    service.findAllTuitsDisLikedByUser("me")
      .then((tuits) => setDisLikedTuis(tuits));
  useEffect(findTuitsIDisLike, []);
  
  return(
    <div>
      <Tuits tuits={dislikedTuit}
             refreshTuits={findTuitsIDisLike}/>
    </div>
  );
};
export default MyDislikes;