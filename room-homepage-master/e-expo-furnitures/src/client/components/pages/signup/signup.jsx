import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Form,Button,Row,Col} from 'react-bootstrap'
import Select from 'react-select'
import countries from 'i18n-iso-countries'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './signup.css'
import  Message from '../../custom/message.jsx'
import   Loader from '../../custom/loader.jsx'

import {  useDispatch, useSelector } from 'react-redux'
const dispatch = useDispatch()

const signUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  location: yup.string().required(),
  contact: yup
    .string()
    .required()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
})
const options = Object.entries(countries.getNames('en')).map(
  ([code, name]) => ({
    value: code,
    label: name
  })
)
const [message, setMessage] = useState(null)
const useSignup = useSelector(state => state.userSignup)
const { loading, error, userInfo } = useSignup
const redirect = location.search ? location.search.split('=')[1] : '/'
const signUp = (location,history) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(signUpSchema) })
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    letter: false,
    number: false
  })
  const handlePasswordChange = e => {
    const password = e.target.value
    setPasswordStrength({
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password)
    })
  }
  const onSubmit = (e) => { 
    e.preventDefault()
    if(passwordStrength !== true){
      setMessage('Password is too weak')
    } else {
      dispatch(signUp(firstName, lastName, email, location, password))
    }
  }
  const data = watch()
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId='firstName'>
          <Form.Label>First Name</Form.Label>
            <Form.Control
                    type='text'
            placeholder=' Enter First Name'
            value={firstName}
                {...register('firstName', {
                  required: 'First Name is required'
                })}
              onChange={e => setFirstName(e.target.value)}
                  />
          {errors.firstName && <Message variant='danger'>{errors.firstName.message}</Message>}
        </Form.Group>
                <Form.Group controlId='lastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Last Name'
                    {...register('lastName', {
                      required: 'Last Name is required'
                    })}
            onChange={e => setLastName(e.target.value)}
            value={lastName}
                  /> 
                  {errors.lastName && <Message variant='danger'>{errors.lastName.message}</Message>}
                </Form.Group>
      <div className='signup-form-group'>
        <Form.Group controlId='email'>
                  <Form.Label>Enter a valid Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {errors.email && <p role='alert'>Email is required and must be valid</p>}
          </Form.Group>
          <Form.Group controlId='location'>
            <Form.Label> Enter Your Location</Form.Label>
            <Form.Control as='select' {...register('location')}>
              {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <FormGroup controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              })}
              onChange={handlePasswordChange}
            />
            {errors.password && <Message variant='danger'>{errors.password.message}</Message>}
          </FormGroup>
        <div>
          <span>Password strength:</span>
          <label>
            <input className='checkbox-auth' type='checkbox' checked={passwordStrength.length} disabled />
            At least 8 characters
          </label>
          <label>
            <input className = 'checkbox-auth' type='checkbox' checked={passwordStrength.letter} disabled />
            Contains a letter
          </label>
          <label>
            <input  className = 'checkbox-auth' type='checkbox' checked={passwordStrength.number} disabled />
            Contains a number
          </label>
        </div>
        {errors.password && (
          <p role='alert' style={{display:'flex',flexDirection:'column'}}>
            Password must contain at least 8 characters, one letter and one number
          </p>
        )}
        ;
        <Select
          options={options}
          {...register('location')}
          aria-invalid={errors.location ? 'true' : 'false'}
        />
        <input
          {...register('contact')}
          aria-invalid={errors.contact ? 'true' : 'false'}
        />
        {errors.contact && (
          <p role='alert'>Contact is required and must be valid</p>
        )}
      </div>
    <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </Form>
    </FormContainer>
  )
}

export default signUp
