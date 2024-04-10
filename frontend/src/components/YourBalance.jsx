import React, { useEffect } from 'react'
import { balanceState } from '../states'
import { useRecoilState } from 'recoil'
import { data } from 'autoprefixer'


const YourBalance = () => {

    const [userBalance, setUserBalance] = useRecoilState(balanceState)

    const token = localStorage.getItem("myToken");

    useEffect(() => {
        fetch("https://mern-paytm-backend.vercel.app/api/v1/account/balance", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
        .then(data => setUserBalance(data.balance))
    }, [])

  return (
    <>
        <h1 className='m-5 text-bold text-xl'>Your Balance: {userBalance}</h1>
        <hr />
    </>
  )
}

export default YourBalance