import { useState } from 'react';
import './App.css';
import { data } from './users';
import { FaArrowUp, FaArrowDown } from "react-icons/fa"


function App() {
  const [users, setUsers] = useState(data)
  const [sorted, setSorted] = useState({ sorted: "", reversed: false})
  const [search, setSearch] = useState("")


  const searchByAll = (event) => {
    const matchedUsers = data.filter((user) => {
      return `${ user.id } ${user.first_name} ${user.last_name} ${ user.email }`.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setUsers(matchedUsers);
    setSearch(event.target.value);
  }

  const sortById = () => {
      setSorted({ sorted: "id", reversed: !sorted.reversed });
      const usersCopy = [...users];
      usersCopy.sort((userA, userB) => {
        if (sorted.reversed) {
          return userA.id - userB.id;
        }
        return userB.id - userA.id;
      })
      setUsers(usersCopy)
  }

  const sortByName = () => {
    setSorted({ sorted: "name", reversed: !sorted.reversed });
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
      const fullNameA = `${userA.first_name} ${userA.last_name}`;
      const fullNameB = `${userB.first_name} ${userB.last_name}`;
      if (sorted.reversed) {
      return fullNameB.localeCompare(fullNameA);
      }
      return fullNameA.localeCompare(fullNameB);
    })
    setUsers(usersCopy)
  }


  const sortByEmail = () => {
    setSorted({ sorted: "email", reversed: !sorted.reversed });
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
        if (sorted.reversed) {
          return userB.email.localeCompare(userA.email)
        }
        return userA.email.localeCompare(userB.email)
    })
    setUsers(usersCopy)
  }

  const renderUsers = () => {
    return users.map((user) => {
      return (
        <tr>
          <td>{ user.id }</td>
          <td>{`${user.first_name} ${user.last_name}`}</td>
          <td>{ user.email }</td>
        </tr>
      )
    })
  }

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />
    }
    return <FaArrowDown />
  }




  return (
    <div className="app">
      <div className="app-container">
        <div className="search-container">
          <input type="text" 
          placeholder="Searching..." 
          value={search}
          onChange={searchByAll}

          />
        </div>
        <div className="table-container">
            <table>
                <thead>
                    <tr className="table-styles">
                      <th onClick={sortById}>
                      <div className="table-content">
                        <span style={{marginRight: 15}}>Id</span>
                        {sorted.sorted === "id" ? renderArrow() : null}
                      </div>
                      </th>
                      <th onClick={sortByName}>
                      <div className="table-content">
                        <span style={{marginRight: 15}}>Name</span>
                        {sorted.sorted === "name" ? renderArrow() : null}
                      </div>
                      </th>
                      <th onClick={sortByEmail}>
                      <div className="table-content">
                        <span>Email</span>
                        {sorted.sorted === "email" ? renderArrow() : null}
                      </div>
                      </th>
                    </tr>
                </thead>
                <tbody>
                    {/* FIRST WAY HOW TO USE USER DATA
                    {users.map((user) => {
                        return (
                          <tr>
                            <td>{ user.id }</td>
                            <td>{ user.first_name } { user.last_name }</td>
                            <td>{ user.email }</td>
                            <td>{ user.gender }</td>
                          </tr>
                        )
                    })}
                  */}
                  { renderUsers() }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default App;
