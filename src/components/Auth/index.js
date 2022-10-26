import React from 'react'
import './Auth.css'
import { GoogleLogin } from 'react-google-login'
import { clientId } from '../../youtube'

function Auth({onSuccess, onFailure}) {
  return (
    <div className='auth'>
        <div className='auth__container'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with google'
                onFailure={onFailure}
                onSuccess={onSuccess}
                cookiePolice={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    </div>
  )
}

export default Auth
