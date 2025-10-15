import Sip from "./src/component/Sip5";
import "./assets/style/sip.css";
import { registerOpenOnClick } from '../../src/utils/registerOpenOnClick';
// stylio2_codan_sip_20250924_01_ecomm


function Index() {
  registerOpenOnClick();
  
  document.title = "Welcome to Stylio";
  
  return (<Sip/>)
}

export default Index;