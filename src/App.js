import React, { useEffect, useState } from 'react';
import './styles.css';








function App() {

  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState()

 // username = document.getElementById("username").value;


  useEffect(() =>{

    var submit = document.getElementById("subButton");
       if(username){
         submit.disabled = false;
      }
      else{
        submit.disabled = true;
      }
  },[username]);

  const fetchData = () => {
    // var username = document.getElementById("username").value;
    console.log(username)
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(
        (result) => {
          result.sort((a, b) => b.size - a.size)
          setRepos(result)
          setError(null)
          console.log(result)
          console.log(repos)
        })
        .catch(error=>setError(error))
        
        
        //,

        // (error) => {
        //   setError(error)
        //   console.log(error);
        //   });
        }

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input id="username" type="text" onChange={event => setUsername(event.target.value)} />
        <label htmlFor="fork">Include forks: </label>
        <input id="fork" type="checkbox" />
        <button id="subButton"  onClick={fetchData}>Submit</button>
      </div>
      <section>
        <header>
          <div className="col">Name</div>
          <div className="col">Language</div>
          <div className="col">Description</div>
          <div className="col">Size</div>
        </header>
        
       
          {!error?  repos.map(item => (
            <li className="row" key={item.id}>
              <div className="col">{item.name}</div>
              <div className="col">{item.language}</div>
              <div className="col">{item.description}</div>
              <div id='size' className="col">{item.size}</div>
             
            </li>
          )):<div className="error">Not Found</div>
          }
        
        
      </section>
      
    </div>
  );
}

export default App;
