import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:3000/delete/${id}`)
                .then(() => {
                    // Remove the deleted user from state
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="display-table" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2>User List</h2>
            <Link 
                to="/create" 
                style={{ 
                    marginBottom: '15px', 
                    display: 'inline-block', 
                    padding: '10px 15px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '5px' 
                }}
            >
                ADD +
            </Link>
            <table 
                border="1" 
                cellPadding="10" 
                style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}
            >
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                        <th>SL No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>No users found</td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    {user.image ? (
                                        <img
                                            src={`http://localhost:3000/uploads/${user.image}`}
                                            alt="User"
                                            width="50"
                                            height="50"
                                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    ) : 'No Image'}
                                </td>
                                <td>
                                    <Link 
                                        to={`/update/${user._id}`} 
                                        style={{ 
                                            marginRight: '10px', 
                                            color: 'blue', 
                                            textDecoration: 'underline' 
                                        }}
                                    >
                                        Update
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(user._id)} 
                                        style={{ 
                                            padding: '5px 10px', 
                                            backgroundColor: 'red', 
                                            color: 'white', 
                                            border: 'none', 
                                            cursor: 'pointer' 
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
