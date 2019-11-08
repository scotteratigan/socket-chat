import React, {useState} from "react";
import logo from "./logo.svg";
// import './App.css';

function App() {
  const [name, setName] = useState("Anonymous");
  return <div className="App">Hi</div>;
}

export default App;

function Name({name, setName}) {
  return (
    <div>
    <label>Enter your name:</label>
    <input type="text" value={name} onChange={e => setName(e.target.value)}
    <div/>
    )
}