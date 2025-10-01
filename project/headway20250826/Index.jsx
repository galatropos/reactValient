import Sip from "./src/component/Sip4";
import "./assets/style/style.css";
import { registerOpenOnClick } from "../../src/utils/registerOpenOnClick";
import TheProgress01 from "../../src/component/loading/theProgress/TheProgress01";


// headway_codan_sip_2025082_01_ecomm


function Index() {
  registerOpenOnClick("https://headway-product.com/");
  return (
    <TheProgress01
      width={"80%"}
      srcImage={"https://headway-product.com/images/logo.svg"}
      backgroundColor="transparent"
      fillColor="#0066FD"
      strokeColor="#0066FD"
    >
      <Sip />
    </TheProgress01>
  );
}

export default Index;
