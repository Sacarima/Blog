import { useState } from 'react'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'


export default function Login() {
  
  const [formData, setFormData] =  useState({})
  const {loading, error: errorMessage } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // handle form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    })
    

}
  // handle form submission
  const handleSubmit = async (e) => {
    // 
    e.preventDefault()
    if ( !formData.email || !formData.password ) {
      return dispatch(signInFailure('Please fill in all fields'))
    }
    if (formData.email.indexOf('@') === -1) {
      return dispatch(signInFailure('wrong credentials'))
    }

    //  send the form data to the server
    try {
      dispatch(signInStart())
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      if ( data.success === false) {
        dispatch(signInFailure(data.message))
      }
      
      if(response.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6'>

      
      {/**lelft side log*/}
      <div className='flex-1'>
        <Link to='/' className='font-bold text-4xl dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Programming</span>
              Nest
      </Link>
      <p className='text-sm mt-5'>You can Login with your email and password or with Google</p>
      </div>
      {/* Sign up form */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          
          <div>
            <Label value="Email" />
            <TextInput 
              type="text" 
              placeholder="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label value="Password" />
            <TextInput 
              type="password" 
              placeholder="************"
              id="password"
              onChange={handleChange}
            />
          </div>
          <Button 
            gradientDuoTone='purpleToPink' 
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className=''pl-3>Loading...</span>
              </>
            ) : (
              'Login'
            )}
       
          </Button>
          <OAuth />
        </form>
        <div className='flex gap-2 text-sm mt-5'>
            <span>Dont have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
      </div>
    </div>
    </div>
  )
}

// Fixed the bug in the button, the loading effect is working when an error occurs