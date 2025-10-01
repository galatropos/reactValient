import Sip  from './src/component/Sip1'
import "./assets/style/sip.css";
import { registerOpenOnClick } from '../../src/utils/registerOpenOnClick';
//fanka_codan_sip_20250916_01_Lingyun
registerOpenOnClick("https://www.fanka.com/collections/todays-deals");

document.title = "Welcome to Fanka";
document.querySelector("link[rel='icon']").href = "https://www.fanka.com/cdn/shop/files/2134_x_604_a50a9518-3060-4686-8f8c-3784adfcd732.png?v=1680243132&width=100"; // tu imagen en /public
function Index() {
  return (<Sip />)
}

export default Index;