import React from 'react';

const Welcome = () => {
const [user, setUser] = React.useState(null);

useEffect( () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (token && userData) {
        setUser(userData);
    }
}, [])

    return ({user});
}

export default Welcome;
