import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateUsers from './CreateUsers';
import Users from './Users';
import Updateusers from './Updateusers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/create" element={<CreateUsers />} />
        <Route path="/update/:id" element={<Updateusers />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;