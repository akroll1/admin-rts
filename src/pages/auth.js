import {useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useGlobalStore } from '../stores'
import { useEffect } from 'react'

export const Auth = () => {

    const navigate = useNavigate()

    const { setUser } = useGlobalStore()
    let { hash } = useLocation();
    
    const [access_token, id_token] = hash.split('&').map(item => item.split('=')[1])

    useEffect(() => {
        if(access_token && id_token){
            const referrerPath = sessionStorage.getItem('referrerPath')
            if(referrerPath){
                navigate(referrerPath)
            } else {
                setUser(access_token, id_token)
                navigate("/dashboard/account")
            }
        }
    },[access_token, id_token])

    return (
        <></>
    )
}