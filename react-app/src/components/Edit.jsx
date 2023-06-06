import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Edit() {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState('Nepal');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    //check if the phone number is valid
    const handlePhoneNumberChange = (e) => {
        const { value } = e.target;
        setPhone(value);
    }

    const validatePhoneNumber = () => {
        const phoneNumberRegex = /^\d{7,}$/; // checking for 7 digits

        if (phoneNumberRegex.test(phone)) {
            setPhoneError('');
        } else {
            setPhoneError('Phone number must be at least 7 digits long and contain only numbers.');
        }
    }

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            setEmailError('');
        } else {
            setEmailError('Invalid email address.');
        }
    };



    useEffect(() => {
        setId(localStorage.getItem('id'));
        setName(localStorage.getItem('name'));
        setAge(localStorage.getItem('age'));
        setEmail(localStorage.getItem('email'));
        setPhone(localStorage.getItem('phone'));
        setCity(localStorage.getItem('city'));
        setDistrict(localStorage.getItem('district'));
        setProvince(localStorage.getItem('province'));
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();

        validatePhoneNumber();
        validateEmail();

        setSubmitted(true)
        e.preventDefault();
        if (!phoneError && !emailError) {
            
                axios.put(`https://647dadeeaf984710854a1e56.mockapi.io/crud-application/${id}`, {
                    e_name: name,
                    e_age: age,
                    e_email: email,
                    e_phone: phone,
                    e_city: city,
                    e_district: district,
                    e_province: province,
                    e_country: country

                }).then(() => {
                    navigate('/');
                }).catch((err) => {
                    console.log(err)
                });
            
        }
    }




    return (
        <>
            <div className='row'>
                <div className="col-md-4">

                    <h1 className='heading'>Edit Data</h1>

                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label htmlFor="">Enter Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Enter Age:</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='Age' className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Enter Email:</label>
                            <input type="email" value={email} onChange={handleEmailChange} placeholder='Email' className='form-control' />
                            {submitted && emailError && <div style={{ color: 'deb91f' }}>{emailError}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Contact:</label>
                            <input type="tel" value={phone} maxLength='10' onChange={handlePhoneNumberChange} onBlur={validatePhoneNumber} placeholder='Phone number' className='form-control' />
                            {submitted && phoneError && <div style={{ color: '#deb91f' }}>{phoneError}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Address:</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">City:</label>
                            <input type="city" value={city} placeholder='City Name' className='form-control' onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">District:</label>
                            <input type="city" value={district} placeholder='District' className='form-control' onChange={(e) => setDistrict(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Province:</label>
                            <select name="province" id="province" onChange={(e) => setProvince(e.target.value)}>
                                <option value="">Select a province</option>
                                <option value="Province 1">Province 1</option>
                                <option value="Province 2">Province 2</option>
                                <option value="Bagmati Pradesh">Bagmati Pradesh</option>
                                <option value="Gandaki Pradesh">Gandaki Pradesh</option>
                                <option value="Lumbini Pradesh">Lumbini Pradesh</option>
                                <option value="Karnali Pradesh">Karnali Pradesh</option>
                                <option value="Sudurpashchim Pradesh">Sudurpashchim Pradesh</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Country:</label>
                            <input type="city" value={country} placeholder='City Name' className='form-control' onChange={(e) => setCountry(e.target.value)} />
                        </div>
                        <br />
                        <div className="d-grid">
                            <input type="submit" value="Edit" className="btn btn-primary btn-sm" />
                        </div>
                    </form>
                    <div className='mt-2'>
                        <Link to='/'>
                            <button className='btn btn-warning btn-sm w-100'>Read</button>
                        </Link>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Edit