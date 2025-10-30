/*
learna_codan_mip_20251015
learna_codan_mip_20251015_01_ecomm_teacher sip1
learna_codan_mip_20251015_02_ecomm_select sip2
learna_codan_mip_20251015_03_ecomm_select sip3
learna_codan_mip_20251015_04_ecomm_select sip4
learna_codan_mip_20251015_05_ecomm_carousel sip5
learna_codan_mip_20251015_06_ecomm_select sip6
TestGio sip7
*/
import Sip from "./src/component/sip8/Index";
import "./assets/style/sip.css"
import useOrientation from "../../src/hook/useOrientation";
// TheFoldie_codan_sip_20251008_01_charlotte

import FontChange from "../../src/component/FontChange";
import nunito from '../../src/assets/font/Nunito/Nunito-VariableFont_wght.ttf';



function Index() { 
  FontChange(
    {
      fontUrl:[
        nunito,
      ],
      fontFamily:["Nunito"]
    }
  )
  useOrientation();

  document.title = "Welcome";
  
  return (<Sip/>)
}

export default Index;


