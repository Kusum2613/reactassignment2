import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import './App.css'
import Header from './Header';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
const[ingredients,setIngredients]=useState("")
const[quantity,setQuantity]=useState("")
const[unit,setUnit]=useState("")
const[data,setData]=useState([]) 
const [recipeName, setRecipeName] = useState(""); // State for recipe name
const [instructions, setInstructions] = useState(""); // State for instructions
const [time, setTime] = useState(""); 




  // Save the recipe to local storage
  const saveRecipe = () => {
    const recipe = {
      recipeName,
      instructions,
      time,
      ingredientsList: data,
    };
    localStorage.setItem('savedRecipe', JSON.stringify(recipe));
    alert('Recipe saved successfully!');
  };

  // Load the recipe from local storage
  const loadRecipe = () => {
    const savedRecipe = JSON.parse(localStorage.getItem('savedRecipe'));
    if (savedRecipe) {
      setRecipeName(savedRecipe.recipeName);
      setInstructions(savedRecipe.instructions);
      setTime(savedRecipe.time);
      setData(savedRecipe.ingredientsList);
    } else {
      alert('No saved recipe found!');
    }
  };


const addData=()=>{
  setData([...data, {
   ingredients,quantity,unit
  }])
  //spread operator
  setIngredients("")
  setQuantity("")
  setUnit("")
}
const removeItem=(index)=>{
  let arr =data
  arr.splice(index,1)
  setData([...arr])
}

const resetPage = () => {
  setIngredients("");
  setQuantity("");
  setUnit("");
  setData([]);
 
  setRecipeName("");
  setInstructions("");
  setTime("");
  
};






  return (
   
    <div className='container'>
      <div className='header'>
       <Header/>
       
       <div className='recipe'>
        <input type='text' placeholder='Recipe Name'    value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}></input>
       </div>
       
      </div>
      <div className="box">
      <div className='items'>
      <Stack spacing={2} direction="row">
       <TextField id="outlined-basic" label="Ingredients" variant="outlined" value={ingredients}  onChange={(e)=>setIngredients(e.target.value)}/>
      
       <TextField id="outlined-basic" label="Quantity" variant="outlined" placeholder='Number' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
       <TextField id="outlined-basic"label=" Unit" variant="outlined"  placeholder='grams/cups/tablespoons etc' value={unit} onChange={(e)=>setUnit(e.target.value)}/>
       <Button variant="contained" color="success"  onClick={addData}><AddIcon></AddIcon></Button>
       </Stack>
      
       </div>
       <div className='steps'>
       <textarea className="step" placeholder="Write instructions here..."  value={instructions}
            onChange={(e) => setInstructions(e.target.value)}></textarea><br></br> 
       <input className='time' type='number' placeholder='00' min={1} value={time}
            onChange={(e) => setTime(e.target.value)}></input><br></br><span>Time  required in minutes</span>
       </div>
       </div>

       <div className='datashow'>
   
    {
        data.map((element,index)=>{
            return(
              <div className='dataval'>
              <h4>{element.ingredients}</h4>
              <h4>{element.quantity}</h4>
              <h4>{element.unit}</h4>
              <h4> <Button onClick={()=>removeItem(index)} variant="contained" color="error">
              <DeleteIcon></DeleteIcon>
              </Button></h4>
            </div>
                
            )
        })
    }
    </div>
    <button className='submit' onClick={resetPage}>Submit</button>
   <button  className='submit load' onClick={loadRecipe}>Store</button>
   <button  className='submit save' onClick={saveRecipe}>Save</button>

    </div>
  )
}

export default App
