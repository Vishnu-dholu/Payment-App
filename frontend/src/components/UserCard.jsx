import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil'
import { transferTo } from '../states';

const UserCard = ({index, fullName, id, username}) => {

    const setTransferToUser = useSetRecoilState(transferTo)

    const navigate = useNavigate();

    function handleSend(){
        setTransferToUser({
            username: username,
            fullName: fullName
        })
        navigate("/send_money")
    }

  return (
    <div className='flex justify-between w-11/12 m-auto mt-5'>
        <span className='flex items-center'>
            <p className='bg-gray-200 rounded-full w-8 p-2 text-center text-sm'>{username[0]}</p>
            <p className='ml-4 text-bold text-md'>{username}</p>
        </span>

        <button onClick={handleSend} className='p-2 bg-black text-white rounded-md text-sm hover:bg-teal-500'>Send Money</button>
    </div>
  )
}

export default UserCard