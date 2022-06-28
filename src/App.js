import "./App.css";
import {useState} from "react"
import { v4 as uuidv4} from "uuid"
import List from "./components/List";
import Alert from "./components/Alert";

function App() {

  const [name,setName] = useState("")
  const [list,setList] = useState([])
  const [alert,setAlert] = useState({show:false,msg:'',type:''})
  const [checkEditItem,setCheckEditItem] = useState(false)

  const submitData =(e)=>{
    e.preventDefault();
    if(!name){
      setAlert({show:true,msg:'Please fill something',type:'error'})
      //alert something
    }else{
      const newItem ={
        id:uuidv4() ,
        title: name
      }
      setList([...list,newItem])
      setName('')
      setAlert({show:true,msg:'Input Successful',type:'success'})
    }
    
 }

const removeItem=(id)=>{
  setList(list.filter((item)=>item.id !== id));
  setAlert({show:true,msg:"Delete Successful",type:"error"})
}

const editItem=(id)=>{
  setCheckEditItem(true)
  //list.find

}

  return (
    <section className="container">
      <h1>Todo List App</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list}/>}
      <form className="from-group" onSubmit={submitData}>
        <div className="form-control">
          <input type="text" className="text-input" 
            onChange={(e)=>setName(e.target.value)}
            value={name}
            />            
          <button type="submit" className="submit-btn">
            {checkEditItem ? "Edit Data" : "Add Data"}
          </button>
        </div>
      </form>
      <section className="list-container">
        {list.map((data,index)=>{
          return <List key={index} {...data} removeItem={removeItem} editItem={editItem}/>
        })}
      </section>
    </section>
  );
}

export default App;
