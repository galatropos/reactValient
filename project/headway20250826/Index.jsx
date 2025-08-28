import Sip from "./src/component/Sip1";
import "./assets/style/style.css";
import { registerOpenOnClick } from "../../src/utils/registerOpenOnClick";
// headway_codan_sip_2025082_01_ecomm
function Index() {
  registerOpenOnClick("https://headway-product.com/");
  return (<Sip/>)
}

export default Index;