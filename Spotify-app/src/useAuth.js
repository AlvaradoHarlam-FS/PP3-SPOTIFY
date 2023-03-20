import React, { useEffect, useState } from 'react';
import axios from 'axios'


function useAuth(code) {
     const [accessToken, setAccessToken] = useState()
     const [refreshToken, setRefreshToken] = useState()
     const [expiresIn, setExpiresIn] = useState()

    let ignore = false;
    useEffect(() => {
        if(!ignore){
            axios.post('http://localhost:3001/login', {
            code
            }).then (res => {
                console.log(res.data)
               setAccessToken(res.data.accessToken)
               setRefreshToken(res.data.refreshToken)
                 setExpiresIn(res.data.expiresIn)
            }).catch((err) => {
                window.location ='/'
            })
        }
        return () => {
            ignore = true;
        }
    }, [code])
}

export default useAuth;
