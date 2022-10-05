import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import './App.css';
import tableUser from './data/Data'
function App() {
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [row,setRow] = useState([...tableUser])
  const [checkEditItem,setCheckEditItem]= useState(false)
  const [editId,setEditId] = useState('')
  const [checkValid,setCheckValid] = useState(false)
  const [gender,setGender] = useState('')
  const [filter,setFilter] = useState('')

  const submitData=(e)=>{
    e.preventDefault();
    if(checkEditItem){
      const result = row.map((item)=>{
        if(item.id === editId){
          return{
            ...item,
            email,
            username,
            password,
            gender
          }
        }
        return item
      })
      setRow(result)
      setEmail('')
      setUsername('')
      setPassword('')
      setGender('')
      setEditId('')
      setCheckEditItem(false)
    }
    else{
      const newItem = {
      id : uuidv4(),
      email,
      username,
      password,
      gender
    }
    setRow([...row,newItem])
    setEmail('')
    setUsername('')
    setPassword('')
    setGender('')
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
    setGender(editRow.gender)
  }
  
  useEffect(()=>{
    if(!email || !username || !password){
      setCheckValid(true)
    }else{
      setCheckValid(false)
    }
    // if(filter === 'Male'){
    //    setFilterArray(row.filter(e=>e.gender === 'Male'))
    // }
    // if(filter === 'Female'){
    //   setFilterArray(row.filter(e=>e.gender === 'Female'))   
    // }
    // if(filter === ''){
    //   setFilterArray(row)
    // }
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
            <div className='gender'>
              <label>Gender : </label>
              <div onChange={(e)=>setGender(e.target.value)}>
                <input type='radio' name='gender' value='Male' /><label htmlFor="male">Male</label>
                <input type='radio' name='gender' value='Female'/><label htmlFor="female">Female</label>
              </div>
            </div>
            <button type='submit' id='btn' disabled={checkValid}>{ checkEditItem ? 'Save Item' : 'Sign up' }</button>
        </form>
      </div>
      <div className='select-container'>
      <select onChange={(e)=>setFilter(e.target.value)}>
          <option value=''>
            Total
          </option>
          <option value='Male'>
            Male
          </option>
          <option value='Female'>
            Female
          </option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
        {/* if(filter === ''){
          return true
        }else{
          if(filter === 'e.gender'){
            return true
          }
          else{
            return false
          }
        } */}
        {row.filter(e => filter === "" ? true : filter === e.gender ? true : false).map((e,index)=>{
            return(
              <tr key={index}>
                <th>{e.email}</th>
                <th>{e.username}</th>
                <th>{e.password}</th>
                <th>{e.gender}</th>
                <th onClick={()=>editItem(e.id)} >Edit</th>
                <th onClick={()=>removeItem(e.id)}>Delete</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
