import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import PERSONAL_ROOM from "../utils/personalRoom";

function MyRoomJoin() {
  return (
    <Navigate
      to={`/join/${PERSONAL_ROOM}`}
      replace
    />
  );
}

export default MyRoomJoin;