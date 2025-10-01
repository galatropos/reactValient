import Sip  from './src/component/sip2/Index'
import "./assets/style/sip1.css";
import { registerOpenOnClick } from '../../src/utils/registerOpenOnClick';
//walkingyoga_sip_20250922_01_ecomm
function Index() {
  registerOpenOnClick("https://walking.yoga");
  
  document.title = "Welcome to Walking Yoga";
  document.querySelector("link[rel='icon']").href = "https://walking.yoga/favicon.svg?v=6b4570743eb0775de282d1d5748d21aa"
  
  ; // tu imagen en /public
  
  return (<Sip/>)
}

export default Index;