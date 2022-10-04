import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [row,setRow] = useState([])
  const [checkEditItem,setCheckEditItem]= useState(false)
  const [editId,setEditId] = useState('')
  const [checkValid,setCheckValid] = useState(false)
  const submitData=(e)=>{
    e.preventDefault();
    if(checkEditItem){
      const result = row.map((item)=>{
        if(item.id === editId){
          return{
            ...item,
            email,
            username,
            password
          }
        }
        return item
      })
      setRow(result)
      setEmail('')
      setUsername('')
      setPassword('')
      setEditId('')
      setCheckEditItem(false)
      
    }
    else{
      const newItem = {
      id : uuidv4(),
      email,
      username,
      password
    }
    setRow([...row,newItem])
    setEmail('')
    setUsername('')
    setPassword('')
    setCheckValid(false)
    }
  }
  const removeItem=(id)=>{
    const result = row.filter(e=>e.id !== id)
    setRow(result)
  }
  const editItem=(id)=>{
    setCheckEditItem(true)
    const editRow = row.find(e=>e.id === id)
    setEditId(editRow.id)
    setEmail(editRow.email)
    setUsername(editRow.username)
    setPassword(editRow.password)
  }
  useEffect(()=>{
    if(!email || !username || !password){
      setCheckValid(true)
    }else{
      setCheckValid(false)
    }
  },[email,username,password])
  return (
    <div className='container'>
      <div className='form-container'>
        <h1>Form Register</h1>
        <form className='form-group' onSubmit={submitData}>
            <div className='form-control'>
              <label htmlFor='email'>Email : </label>
              <input 
                  type='email' 
                  id='email' 
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                   />
            </div>
            <div className='form-control'>
              <label htmlFor='username'>Username : </label>
              <input 
                type='text' 
                id='username' 
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                />
            </div>
            <div className='form-control'>
              <label htmlFor='password'>Password : </label>
              <input 
                type='password' 
                id='password' 
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                />
            </div>
            <button type='submit' id='btn' disabled={checkValid}>{ checkEditItem ? 'Save Item' : 'Sign up' }</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {row.map((e,index)=>{
            return(
              <tr key={index}>
                <th>{e.email}</th>
                <th>{e.username}</th>
                <th>{e.password}</th>
                <button onClick={()=>editItem(e.id)} >Edit</button>
                <button onClick={()=>removeItem(e.id)}>Delete</button>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
