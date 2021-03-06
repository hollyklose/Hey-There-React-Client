import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => {
        setUser(res.data.user)
        console.log(res.data.user)
        localStorage.setItem('auth-token', res.data.user.token)
      })
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <Form onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            name="email"
            value={email}
            type="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPasswordConfirmation">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="info">Sign up</Button>
      </Form>

    // <form className='auth-form' onSubmit={this.onSignUp}>
    //
    //
    //   <label htmlFor="email">Email</label>
    //   <input
    //     required
    //     name="email"
    //     value={email}
    //     type="email"
    //     placeholder="Email"
    //     onChange={this.handleChange}
    //   />
    // <label htmlFor="password">Password</label>
    // <input
    //   required
    //   name="password"
    //   value={password}
    //   type="password"
    //   placeholder="Password"
    //   onChange={this.handleChange}
    // />
    //   <label htmlFor="passwordConfirmation">Confirm Password</label>
    //   <input
    //     required
    //     name="passwordConfirmation"
    //     value={passwordConfirmation}
    //     type="password"
    //     placeholder="Confirm Password"
    //     onChange={this.handleChange}
    //   />
    //   <button type="submit">Sign Up</button>
    // </form>
    )
  }
}

export default withRouter(SignUp)
