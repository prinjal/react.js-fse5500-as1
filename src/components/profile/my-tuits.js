import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service.js";
import Tuits from "../tuits";

const MyTuits = () => {
  const [tuits, setTuits] = useState([]);
  const findMyTuits = () => {
      service.findTuitsByUser('me')
          .then(tuits => setTuits(tuits));
  }
  useEffect(findMyTuits, []);
  return (
      <Tuits tuits={tuits}
             refreshTuits={findMyTuits}/>
  );
};

export default MyTuits;

