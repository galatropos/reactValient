import Sip from "./src/component/sip12/Index";
import "./assets/style/style.css";
import { registerOpenOnClick } from "../../src/utils/registerOpenOnClick";
//fabu_codan_sip_20250930_01_ecomm
function Index() {
  registerOpenOnClick();

  document.title = "Welcome";
  //document.querySelector("link[rel='icon']").href = "https://walking.yoga/favicon.svg?v=6b4570743eb0775de282d1d5748d21aa"

  return <Sip />;
}

export default Index;
