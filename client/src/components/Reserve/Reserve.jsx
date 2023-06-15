import {useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';


const Reserve = () => {
  const [room,setRoom] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();
  
  useEffect(()=>{
    if(!location.room){
      navigation('/404');
    }else{
      console.log(location.room);
    }
  },[]);

  return (
    <div >
      reserve
    </div>
  )
}
 
export default Reserve;