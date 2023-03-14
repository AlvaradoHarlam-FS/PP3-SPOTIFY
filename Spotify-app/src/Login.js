import React from 'react';

const client_id = process.env.CLIENT_ID
const REDIRECT_URI = 'http://localhost:3000/'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

function Login() {
    return (
        <div>
            <div style={styles.center}>
                <a style={styles.btn} href={AUTH_URL}>Spotify Login</a>
            </div>
        </div>
    );
}


export default Login;

const styles = {
    btn: {
        backgroundColor: "green",
        textAlign: 'center',
        display: 'flex',
        width: '15rem',
        padding: '1rem',
        cursor: 'pointer',
        fontSize: '30px',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '15px'
    },
    center: {
        margin: 0,
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
    }
}