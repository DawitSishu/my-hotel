import {useState,useEffect,useRef} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';



const Rooms = () => {
    const [rooms,setRooms] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    
    useEffect(()=>{
        const availableRoooms  = location.state;

        if(!availableRoooms) {
            navigate('/');
        }else{
            // setRooms(rooms)
            setRooms(availableRoooms);
        }
    },[])




  return (
    <div>Rooms</div>
  )
}

export default Rooms