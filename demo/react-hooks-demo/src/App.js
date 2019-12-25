import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppContext } from './redux'
import Child from './child'
import actions from './redux/actions'




function App() {
  
  const { dispatch } = useContext( AppContext )
  function handleInput(e){
    dispatch(actions.setUserName(e.target.value))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Hooks Demo
        </p>
        <div><input onInput={handleInput} type='text' style={{width:'200px',height:'30px',marginBottom:'20px',outline:'none',fontSize:'20px'}} /></div>
        <Child  />
      </header>
    </div>
  );
}

export default App;
