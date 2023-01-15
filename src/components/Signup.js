import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save The auth Token and Redirect
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            props.showAlert("Account Created Successfully","success");
        }
        else {
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChaneg = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChaneg} id="name" name="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChaneg} id="email" name="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" minLength={5} required onChange={onChaneg} id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" minLength={5} required onChange={onChaneg} id="cpassword" name="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup