
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Search } from './components/Search';
import './App.css';
import { UserList } from './components/UserList';
import { getAll, create, remove } from './Services/UserServices'
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll()
      .then(users => {
        setUsers(users)
        // console.log(users);
      })
      .catch(err => {
        console.log('error' + err);
      })
  }, []);

  const userSubmitHandler = async (e) => {
    //1.stop automatic form submit
    e.preventDefault()
    console.log('submit');
    //2.take formData from DOM tree
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    //3.send ajax request to server
    const createdUser = await create(data);
    console.log(createdUser);

    //4.If successfull add new user to the server
    setUsers(state => [...state, createdUser])
    // console.log(users);

    //5.close dialog

  };
  const onDeleteClickHandler = async (userId) => {
    const user = await remove(userId)
    setUsers(state => state.filter(x => x._id !== userId))
  }

    return (
      <>
        <Header />
        <main className="main">
          <section className="card users-container">
            <Search />
            <UserList users={users} userSubmitHandler={userSubmitHandler} onDeleteClickHandler={onDeleteClickHandler} />
          </section>
        </main>
        <Footer />
      </>
    );
  }

  export default App;
