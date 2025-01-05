import React from 'react';
import { Navigate } from 'react-router-dom';
import LogoutButton from '../components/logoutButton';



const Dashboard = () => {
    return <main>
        <div>
            <h1 style={styles.title}>Welcome to the dashboard</h1>
            <p> Working on building...</p>
            <LogoutButton />
        </div>
    </main>
};

const styles = {
    title: {
        border: '2px solid black',
        borderRadius: '0.5rem',
    },
}


export default Dashboard