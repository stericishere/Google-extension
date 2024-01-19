import { useState } from 'react'
import './App.css'

function App() {
  const [colour, setColour] = useState('#000000')

  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true});
    chrome.scripting.executeScript({
      target: { tabId: tab.id!},
      args: [colour],
      func: (colour) => {
        document.body.style.backgroundColor = colour
      }
    });
  }
  const translation = async () => {
    let word = (document.getElementById("word") as HTMLInputElement).value;
    if(word){
      fetchData(word)
    }

    };
  return (
    <>
      <div>
        <a href="https://youtu.be/dQw4w9WgXcQ?si=5svDXR3c-WMwsKpV" target="_blank">
          <img src="colour.png" className="logo" alt="My extension logo" />
        </a>
      </div>
      <h1>CHANGE COLOUR</h1>
      <div className="card">
        <input type ='color' onChange={(e) => setColour(e.currentTarget.value)}value={colour} ></input>
        <button onClick={() => onclick()}>
          Click me
        </button>
        <h1>Translation</h1>
        <input type="text" id="word"></input>
        <button onClick={() => translation()}>Enter</button>
        <h2 id="realdefinition"></h2>
        <h3 id="definition"></h3>
        <h3 id="realexample"></h3>
        <h4 id="example"></h4>
        <h2 id="error"></h2>
      </div>
    </>
  )
}

export default App

const fetchData =async (input: string) => {
  let word = input.split(" ")[0]
  console.log(word)
  try{const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if(res.ok){
      const data = await res.json();
      document.getElementById("error")!.textContent = ""
      document.getElementById("realdefinition")!.textContent = "Definition"
      document.getElementById("definition")!.textContent = data[0].meanings[0].definitions[0].definition
      if(data[0].meanings[0].definitions[0].example != null){
        document.getElementById("realexample")!.textContent = "Example"
        document.getElementById("example")!.textContent = data[0].meanings[0].definitions[0].definition
      }}
      else{
        document.getElementById("error")!.textContent = "Please enter a real wrod"
        document.getElementById("realdefinition")!.textContent = ""
        document.getElementById("realexample")!.textContent = ""
        document.getElementById("example")!.textContent = ""
        document.getElementById("definition")!.textContent = ""
      }
    }
    catch(error){
      document.getElementById("realdefinition")!.textContent = "Please enter a real wrod"
    }
  }