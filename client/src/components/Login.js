import { useNavigate } from 'react-router-dom'
import {useState} from "react";
import styles from '../styles/login.module.css'
import { TextField, Button } from '@mui/material'
import logo from '../images/logo.png'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const onClickButton = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URI}/login`, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
                },
            body: JSON.stringify({username, password})
            })
            .then(response => response.json())
            .then(response => {
                if (!!response.token) {
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('username', response.username)
                    navigate('/calendar')

                } else {
                    // Display an error message
                }
            })
        }
    return (
        <div className={styles.component}>
            <img src={logo} alt="Logo"/>
            <TextField
                id="standard-basic"
                label="Username"
                value={username}
                variant="standard"
                onChange={(ev) => setUsername(ev.target.value)}
            />
            <TextField
                id="standard-basic"
                label="Password"
                type="password"
                value={password}
                variant="standard"
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <Button
                variant="text"
                onClick={onClickButton}>
                Log In
            </Button>
        </div>
    )
}

export default Login
