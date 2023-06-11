import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import countries from 'i18n-iso-countries'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './signup.css'

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
function signUp () {
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
  const onSubmit = () => {
    console.log(data)
  }
  return (
    <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <input
          {...register('firstName')}
          aria-invalid={errors.firstName ? 'true' : 'false'}
          placeholder='First Name'
        /><label>Enter Your FirstName</label>
        {errors.firstName && <p role='alert'>First name is required</p>}
        <input
          {...register('lastName')}
          aria-invalid={errors.lastName ? 'true' : 'false'}
          placeholder='Last Name'
        /> <label>Enter Your LastName </label>
        {errors.lastName && <p role='alert'>Last name is required</p>}
        <input
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          placeholder='Email Adress'
        /><label>Enter Your Email Adress</label> 
        {errors.email && (
          <p role='alert'>Email is required and must be valid</p>
        )}
        <input
          type='password'
          {...register('password')}
          onChange={handlePasswordChange}
          aria-invalid={errors.password ? 'true' : 'false'}
          placeholder='Password'
        />
        <div>
          <span>Password strength:</span>
          <label>
            <input type='checkbox' checked={passwordStrength.length} disabled />
            At least 8 characters
          </label>
          <label>
            <input type='checkbox' checked={passwordStrength.letter} disabled />
            Contains a letter
          </label>
          <label>
            <input type='checkbox' checked={passwordStrength.number} disabled />
            Contains a number
          </label>
        </div>
        {errors.password && (
          <p role='alert'>
            Password must contain at least 8 characters, one letter and one
            number
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
      <button type='submit'>Sign Up</button>
    </form>
  )
}

export default signUp
