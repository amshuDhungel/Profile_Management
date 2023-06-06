import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Read() {
    const [apiData, setApiData] = useState([])
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    function getData() {
        axios.get('https://647dadeeaf984710854a1e56.mockapi.io/crud-application')
            .then((response) => {
                setApiData(response.data);
            }).catch((err) =>{
                console.log(err)
            });
    }

    function handleDelete(id){
        axios.delete(`https://647dadeeaf984710854a1e56.mockapi.io/crud-application/${id}`)
        .then(() =>{
            getData();
        }).catch((err) =>{
            console.log(err)
        });
    }

    const setDataToStorage = (id, name, age, email, phone, city, district, province) =>{
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('age', age);
        localStorage.setItem('email', email);
        localStorage.setItem('Phone', phone);
        localStorage.setItem('City', city);
        localStorage.setItem('City', district);
        localStorage.setItem('Province', province);

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
            <div className="row">
                <div className="col-md-12">
                    <div className='mb-2 mt-2'>
                        <Link to='/create'>
                            <button className='btn btn-info'>Create New Data</button>
                        </Link>
                    </div>
                    <table className='table table-bordered table-striped table-active table-hover border-dark table-sm'>
                        <thead>
                            <tr className='table table-dark'>
                                <th onClick = {() => handleSort('name')}>Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>City</th>
                                <th>District</th>
                                <th>Province</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedData.map((item) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.e_name}</td>
                                                <td>{item.e_age}</td>
                                                <td>{item.e_email}</td>
                                                <td>{item.e_phone}</td>
                                                <td>{item.e_city}</td>
                                                <td>{item.e_district}</td>
                                                <td>{item.e_province}</td>
                                                <td>
                                                    <Link to= '/edit'>
                                                    <button type="button" className="btn btn-dark" onClick={() => setDataToStorage(item.id, item.e_name, item.e_age, item.e_email, item.e_phone, item.e_city, item.e_district , item.e_province)}> Edit</button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-dark" onClick={() => {if(window.confirm('Are you sure you want to delete data ?? Once delete it will be permanently delete')){ handleDelete(item.id)}}}> Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Read