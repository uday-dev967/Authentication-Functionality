import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')
  const navigateToHome = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  const onClickLogin = async () => {
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      navigateToHome(data.jwt_token)
    }
  }

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login">
      <h1>Please Login</h1>
      <button type="button" onClick={onClickLogin}>
        Login with Sample Creds
      </button>
    </div>
  )
}

export default Login
