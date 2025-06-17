// import { useState } from "react"
// import axios from 'axios'
// import { useNavigate } from "react-router-dom"
// function CreateUsers(){
//     const[name,setName]=useState()
//     const[email,setEmail]=useState()
//     const[age,setAge]=useState()
//     const navigate=useNavigate()
//     const submit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:3000/create', { name, email, age })
//             .then(res => {
//                 console.log(res.data);
//             })
//             navigate('/')
//             .catch(err => {
//                 console.error(err);
//             });
//     }


//     return(
//         <>
//         <div className="create--form-page">
//             <div className="create-form">
//                 <form action="" method="POST" onSubmit={submit}>
//                     <div className="name">
//                         <label htmlFor="name">Name:</label>
//                         <input 
//                         type="text" 
//                         name="name" 
//                         id="name" 
//                         value={name}
//                         onChange={(e)=>setName(e.target.value)} />
//                     </div>
//                     <div className="email">
//                          <label htmlFor="email">Email:</label>
//                         <input 
//                         type="email" 
//                         name="email" 
//                         id="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e)=>setEmail(e.target.value)}  />
//                     </div>
//                     <div className="age">
//                         <label htmlFor="age">Age:</label>
//                          <input 
//                          type="text" 
//                          name="age" 
//                          id="age" 
//                          placeholder="Age"
//                          value={age}
//                         onChange={(e)=>setAge(e.target.value)}  />
//                     </div>
                    
//                      <button type="submit">Add</button>
//                 </form>
//             </div>

//         </div>
//         </>
//     )
// }
// export default CreateUsers
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUsers() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('age', age);
        if (image) formData.append('image', image);

        axios.post('http://localhost:3000/create', formData)
            .then(res => navigate('/'))
            .catch(err => console.error(err));
    };

    return (
        <div className="create-form-page">
            <div className="create-form">
                <form onSubmit={submit} encType="multipart/form-data">
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input type="text" value={age} onChange={e => setAge(e.target.value)} />
                    </div>
                    <div>
                        <label>Upload Image:</label>
                        <input type="file" onChange={e => setImage(e.target.files[0])} />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUsers;