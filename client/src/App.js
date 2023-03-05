
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Search } from './components/Search';
import './App.css';
import { UserList } from './components/UserList';
import {getAll } from './Services/UserServices'
import { useState,useEffect} from 'react';

function App() {
const [users,setUsers]=useState([])

  useEffect(()=>{
    getAll()
    .then(users=>{
      setUsers(users)
// console.log(users);
    })
    .catch(err=>{
      console.log('error'+err);
    })
  },[])
  return (
    <>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />
          <UserList users={users}/>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
