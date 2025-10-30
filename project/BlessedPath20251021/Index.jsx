/*
BlessedPath_codan_sip_20251021
BlessedPath_codan_sip_20251021_01_ecomm_bible sip1
BlessedPath_codan_sip_20251021_02_ecomm_bible sip2
BlessedPath_codan_sip_20251021_03_ecomm_bible sip3
BlessedPath_codan_sip_20251021_04_ecomm_bible sip4
BlessedPath_codan_sip_20251021_05_ecomm_bible sip5
BlessedPath_codan_sip_20251021_06_ecomm_bible sip6
BlessedPath_codan_sip_20251021_07_ecomm_bible sip7
BlessedPath_codan_sip_20251021_08_ecomm_bible sip8
BlessedPath_codan_sip_20251021_09_ecomm_bible sip9
BlessedPath_codan_sip_20251021_10_ecomm_Bible sip10
*/
import useOrientation from "../../src/hook/useOrientation";
import { registerOpenOnClick } from "../../src/utils/registerOpenOnClick";
import Sip from "./src/component/sip8/Index";
function Index() {
    registerOpenOnClick();
  useOrientation();
  return (<Sip/>)
}

export default Index;