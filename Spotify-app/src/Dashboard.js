import React from 'react';
import useAuth from './useAuth';


function Dashboard({code}) {
 
    const accessToken = useAuth(code)
    return (
        <div>
            <p style={styles.p}>Authorized</p>
        </div>
    );
}

export default Dashboard;

const styles = {
    p: {
        padding:'1rem'
    }
}