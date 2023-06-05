import background from "../../Assets/homevid.mp4";
import '../Login/Login.css';
import './Home.css';
import HomeBody from "./HomeBody";

const Home = (props) => {
  
  return (
    <div className="main">
        <video src={background} autoPlay muted loop />
        <div className="overlay"></div>
        <HomeBody />
    </div>
  )
}
export default Home;