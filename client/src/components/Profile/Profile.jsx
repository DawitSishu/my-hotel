import {useRef,useEffect} from 'react';

const Profile = () => {
  const token = useRef();

  useEffect(()=>{
    token.current = localStorage.getItem('token');
  },[])


  return (
    <div>Profile</div>
  )
}

export default Profile 