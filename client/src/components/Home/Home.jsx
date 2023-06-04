import background from "../../Assets/homevid.mp4";
import '../Login/Login.css';
const Home = (props) => {
  return (
    <div className="main">
        <video src={background} autoPlay muted loop />
    </div>
  )
}
export default Home;