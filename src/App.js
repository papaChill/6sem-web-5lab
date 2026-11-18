import './CSS/App.css';
import {cars} from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

function App() {
  const [filtered, setFiltered] = useState(cars);
  return (
    <div className="App">
       <h3>Самые быстрые автомобили</h3>

       <Chart data={ filtered }/>
       
       <Table data={ cars } amountRows="15" isPag="1" 
       filter = {filtered} onFilter ={setFiltered}/>

    </div>
  );
}

export default App;