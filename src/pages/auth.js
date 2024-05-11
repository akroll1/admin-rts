import {useLocation, useNavigate } from 'react-router-dom'
import { useGlobalStore } from '../stores'
import { useEffect } from 'react'

export const Auth = () => {

    const navigate = useNavigate()

    const { setUser } = useGlobalStore()
    let { hash } = useLocation();
    
    const [access_token, id_token] = hash.split('&').map(item => item.split('=')[1])

    useEffect(() => {
        if(access_token && id_token){
            setUser(access_token, id_token)
            navigate("/forms/account")
        }
    },[access_token, id_token])

    return (
        <></>
    )
}