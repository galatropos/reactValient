/*
theFoldie_codan_sip_20251008
theFoldie_codan_sip_20251008_01_charlotte sip1
theFoldie_codan_sip_20251008_02_charlotte sip2
theFoldie_codan_sip_20251008_03_charlotte sip3
theFoldie_codan_sip_20251008_04_charlotte sip4
theFoldie_codan_sip_20251008_05_charlotte sip5
theFoldie_codan_sip_20251008_06_charlotte sip6
theFoldie_codan_sip_20251008_07_charlotte sip7
theFoldie_codan_sip_20251008_08_charlotte sip8
theFoldie_codan_sip_20251008_09_charlotte sip9
theFoldie_codan_sip_20251008_10_charlotte sip10
*/
import Sip from "./src/component/sip5/Index";
import "./assets/style/sip.css"
import { registerOpenOnClick } from '../../src/utils/registerOpenOnClick';
import interUrl from '../../src/assets/font/Instrument_Sans/InstrumentSans-VariableFont_wdth,wght.ttf';
import FontChange from "../../src/component/FontChange";
import useOrientation from "../../src/hook/useOrientation";
// TheFoldie_codan_sip_20251008_01_charlotte
function Index() { 
  useOrientation();
  registerOpenOnClick();
  FontChange({fontUrl:interUrl,fontFamily:'Instrument Sans'});
  document.title = "Welcome";
  
  return (<Sip/>)
}

export default Index;


