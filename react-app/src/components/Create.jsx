import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Create() {

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState('Nepal');
    const [apiData, setApiData] = useState([]);
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [phoneError, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cityError, setCityError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    // Adding a validation function to check if the phone number is valid
    const handlePhoneNumberChange = (e) => {
        const { value } = e.target;
        setPhone(value);
    }

    const validatePhoneNumber = () => {
        const phoneNumberRegex = /^\d{7,}$/; // Regex to check for at least 7 digits

        if (phoneNumberRegex.test(phone)) {
            setError('');
        } else {
            setError('Phone number must be at least 7 digits long and contain only numbers.');
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

    const handleSubmit = (e) => {
        e.preventDefault();

        validatePhoneNumber();
        validateEmail();
        validateCity();

        setSubmitted(true)
        if (!phoneError && !emailError && !cityError) {
            if (city.trim() === '') {
                setCityError('City cannot be empty.');
            } else {
                axios.post('https://647dadeeaf984710854a1e56.mockapi.io/crud-application', {
                    e_name: name,
                    e_age: age,
                    e_email: email,
                    e_phone: phone,
                    e_city: city,
                    e_district: district,
                    e_province: province,
                    e_country: country
                }).then(() => {
                    navigate('/')
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }

    const validateCity = () => {
        if (city.trim() === '') {
            setCityError('City cannot be empty.');
        } else {
            setCityError('');
        }
    };

    function getData() {
        axios.get('https://647dadeeaf984710854a1e56.mockapi.io/crud-application')
            .then((response) => {
                setApiData(response.data);
            }).catch((err) => {
                console.log(err)
            });
    }

    function handleDelete(id) {
        axios.delete(`https://647dadeeaf984710854a1e56.mockapi.io/crud-application/${id}`)
            .then(() => {
                getData();
            }).catch((err) => {
                console.log(err)
            });
    }


    const setDataToStorage = (id, name, age, email, phone, city, district, province, country) => {
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('age', age);
        localStorage.setItem('email', email);
        localStorage.setItem('Phone', phone);
        localStorage.setItem('City', city);
        localStorage.setItem('District', district);
        localStorage.setItem('Province', province);
        localStorage.setItem('Country', country);

    }

    useEffect(() => {
        getData();

    }, [])

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedData = apiData.sort((a, b) => {
        if (sortColumn === 'name') {
            return sortOrder === 'asc' ? a.e_name.localeCompare(b.e_name) : b.e_name.localeCompare(a.e_name);
        }
        // Add sorting logic for other columns if needed
        return 0;
    });

    return (
        <>
            <div className='row'>
                <div className="col-md-4">
                    <div className="bg text-center">
                        <h1 className="heading">Profile Management</h1>
                    </div>
                    <form onSubmit={handleSubmit} className='form-position'>
                        <div className="form-group">
                            <label htmlFor="" >Enter Name:</label>
                            <input type="text" placeholder='Name' className='form-control' onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Enter Age:</label>
                            <input type="number" placeholder='Age' className='form-control' onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Enter Email:</label>
                            <input type="email" placeholder='Email' className='form-control' onChange={handleEmailChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Contact:</label>
                            <input type="tel" value={phone} maxLength='10' onChange={handlePhoneNumberChange} onBlur={validatePhoneNumber} placeholder='Phone number' className='form-control' />
                            {submitted && phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Address</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">City:</label>
                            <input type="city" placeholder='City Name' className='form-control' onChange={(e) => setCity(e.target.value)} />
                            {submitted && cityError && <div style={{ color: 'red' }}>{cityError}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">District:</label>
                            <input type="district" placeholder='District' className='form-control' onChange={(e) => setDistrict(e.target.value)} />
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
                            <input type="country" value={country} placeholder='District' className='form-control' onChange={(e) => setCountry(e.target.value)} />
                        </div>
                        <br />
                        <div className="d-grid">
                            <input type="submit" value="Submit" className="btn btn-success" style={{}} />
                        </div>
                    </form>





                </div>
            </div>
            <div className='mb-2 mb-2'>
                <Link to='/'>
                    <button className='btn btn-warning'>Profile</button>
                </Link>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr className='table table-bordered table-striped table-active table-hover border-dark table-sm'>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th >Age</th>
                        <th >Email</th>
                        <th >Phone</th>
                        <th >City</th>
                        <th >District</th>
                        <th >Province</th>
                        <th >Edit</th>
                        <th >Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedData.map((item) => {
                            return (
                                <>
                                    <tr className='table table-dark'>
                                        <td>{item.e_name}</td>
                                        <td>{item.e_age}</td>
                                        <td>{item.e_email}</td>
                                        <td>{item.e_phone}</td>
                                        <td>{item.e_city}</td>
                                        <td>{item.e_district}</td>
                                        <td>{item.e_province}</td>
                                        <td>
                                            <Link to='/edit'>
                                                <button type="button" className="btn btn-primary" onClick={() => setDataToStorage(item.id, item.e_name, item.e_age, item.e_email, item.e_phone, item.e_city, item.e_district, item.e_province)}> Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you want to delete data ?? Once delete it will be permanently delete')) { handleDelete(item.id) } }}> Delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Create