import React from 'react';
import LogoutButton from '../components/logoutButton';



const Dashboard = () => {
    return <main>
        <h1 style={styles.title}>Welcome to the Dashboard</h1>
        <div className='MainContainer'>
            <div className='MainBody'>

            </div>
            <div className="LeftBar">
                <div style={styles.leftMiniContainers}>
                    <p>Cont</p>
                </div>
                <LogoutButton />
            </div>
        </div>
    </main>
};

const styles = {
    title: {
        paddingBottom: '2rem',
        borderBottom: '2px solid black',
        borderRadius: '0.5rem',
    },
    leftBar: {
        borderRight: '1px solid rgb(0,0,0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        itemsAlign: 'center',
    },
    leftMiniContainers: {
        textAlign: 'center',
        border: '2px solid black',
        borderRadius: '2px',
        padding: '0.1rem',
    },
}


export default Dashboard