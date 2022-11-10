import './App.css';
import { useEffect, useState } from 'react'; 
import Axios from 'axios'; 
import Dropdown from 'react-dropdown'; 
import { HiSwitchHorizontal } from 'react-icons/hi'; 
import 'react-dropdown/style.css'; 


function App() {
  const [info, setInfo] = useState([]); 
  const [input, setInput] = useState(0); 
  const [from, setFrom] = useState("usd"); 
  const [to, setTo] = useState("eur"); 
  const [options, setOptions] = useState([]); 
  const [output, setOutput] = useState(0); 

   // Calling the api whenever the dependency changes 
   useEffect(() => { 
    Axios.get( 
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`) 
   .then((res) => { 
      setInfo(res.data[from]); 
    }) 
  }, [from]); 
  // Calling the convert function whenever 
  // a user switches the currency 
  useEffect(() => { 
    setOptions(Object.keys(info)); 
    convert(); 
  }, [info]) 
  //Changing the output when the currency changes
  useEffect(() => {
    var rate = info[to]
    setOutput(input * rate)
  })
  // Function to convert the currency 
  function convert() { 
    var rate = info[to]; 
    setOutput(input * rate); 
  } 

  // Function to switch between two currency 
  function flip() { 
    var temp = from; 
    setFrom(to); 
    setTo(temp); 
  } 
  function handleChange(e) {
     var x = e.target.value
    setInput(x)
    console.log("x = " + x + " input = " + input)
    var rate = info[to]
    setOutput(x * rate)
    
  }
  
  return (
    // NAVBAR
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
  <a className="navbar-brand justify-content-center d-flex w-100" href="#">Currency Converter</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ">
    </ul>
  </div>
</nav>

{/* CONTENT */}
<div className="container">
  <div className="row">
    <div className="col">
    <div className="left"> 
  <h3>Amount</h3> 
  <input type="text" 
     placeholder="Enter the amount" 
     onChange={(e) => {setInput(e.target.value); handleChange(e)}}
      /> 
</div> 
    </div>
    <div className="col">
    <div className="middle"> 
  <h3>From</h3> 
  <Dropdown options={options}  
            onChange={(e) => { setFrom(e.value);  }} 
  value={from} placeholder="From" /> 
</div> 
    </div>
    <div className="col-1 mt-auto mb-1">
    <div className="switch"> 
  <HiSwitchHorizontal size="30px" 
                onClick={() => { flip()}}/> 
</div> 
    </div>
    <div className="col">

<div className="right"> 
  <h3>To</h3> 
  <Dropdown options={options}  
            onChange={(e) => {setTo(e.value); }}  
  value={to} placeholder="To" /> 
  </div>
    </div>
  </div>
  <div className="row">
    <div className="col">
    <div className="result"> 
    <button className='mt-4' onClick={()=>{convert()}}>Convert</button> 
    <h2 className='mt-4'>Converted Amount:</h2> 
    <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p> 
  </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default App;
