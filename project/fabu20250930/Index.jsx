import Sip from "./src/component/sip13/Index";
import "./assets/style/style.css";
import { registerOpenOnClick } from "../../src/utils/registerOpenOnClick";
import interUrl from '../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf';
import FontChange from "../../src/component/FontChange";
//fabu_codan_sip_20250930_01_ecomm


function Index() {

  FontChange({fontUrl:interUrl});
  registerOpenOnClick();

  document.title = "Welcome";
  //document.querySelector("link[rel='icon']").href = "miurl"

  return <Sip />;
}

export default Index;
