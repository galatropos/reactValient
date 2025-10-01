import Sip from "./src/component/Sip2";
import "./assets/style/sip.css";
import { registerOpenOnClick } from '../../src/utils/registerOpenOnClick';
// stylio2_codan_sip_20250924_01_ecomm


function Index() {
  registerOpenOnClick("https://quiz.stylio.fashion/discover_your_personal_style?cohort=stylio_1&lang=en&uuid=7a6965d7-889e-4858-abba-980de2b45919");
  
  document.title = "Welcome to Stylio";
  document.querySelector("link[rel='icon']").href = "https://quiz.stylio.fashion/assets/favicon.DJEcA1gV.ico"
  
  return (<Sip/>)
}

export default Index;