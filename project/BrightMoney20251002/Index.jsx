import React from "react";
import "./assets/style/sip.css";
import Sip from "./src/component/sip5/Index";
import { registerOpenOnClick } from "../../src/utils/registerOpenOnClick";
//brightmoney_codan_sip_20251002_01_ecomm
function Index() {
  registerOpenOnClick("");

  return (
<>
<Sip/>
</>
)
}

export default Index;