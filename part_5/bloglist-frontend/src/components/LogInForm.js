import React from 'react';
import blogService from '../services/blogs'
import loginService from '../services/login'


const LogInForm = ({ username, setUsername, password, setPassword, setUser, setNotificationMsg }) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            console.log(user)
        } catch (exception) {
            setNotificationMsg('Wrong credentials')
            setTimeout(() => {
                setNotificationMsg(null)
            }, 5000)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
          <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
          <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );
};

export default LogInForm;