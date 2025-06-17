import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUsers() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/getusers/${id}`)
            .then(result => {
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
                setCurrentImage(result.data.image);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('age', age);
        if (image) {
            formData.append('image', image);
        }

        axios.put(`http://localhost:3000/update/${id}`, formData)
            .then(() => navigate('/'))
            .catch(err => console.log(err));
    };

    return (
        <div className="update-form-page" style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Update User</h2>
            <form onSubmit={update} encType="multipart/form-data">
                <div style={{ marginBottom: '10px' }}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Age:</label>
                    <input 
                        type="number" 
                        value={age} 
                        onChange={e => setAge(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                {currentImage && (
                    <div style={{ marginBottom: '10px' }}>
                        <label>Current Image:</label><br />
                        <img 
                            src={`http://localhost:3000/uploads/${currentImage}`} 
                            alt="Current" 
                            width="150" 
                        />
                    </div>
                )}

                <div style={{ marginBottom: '10px' }}>
                    <label>Change Image:</label>
                    <input 
                        type="file" 
                        onChange={e => setImage(e.target.files[0])} 
                        accept="image/*"
                    />
                </div>

                <button type="submit" style={{ padding: '10px 20px' }}>Update</button>
            </form>
        </div>
    );
}

export default UpdateUsers;
