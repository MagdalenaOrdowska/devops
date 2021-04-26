import './App.css';
import {useState} from "react";
import Sport from './Sport';
import AddSport from './AddSport';
import UpdateSport from './UpdateSport';
import DeleteSport from './DeleteSport';
import GetSport from './GetSport';

function App() {

  const [initialValue, setInitialValue] = useState(1234);

  const handleInitialValue = (event) => {
    setInitialValue(event.target.value);
  };
  return (
    <div>

      {/* <input onChange={handleInitialValue}/> */}

      <Sport initValue={initialValue} changeParentHandler={setInitialValue}/>
      <AddSport/>
      <UpdateSport/>
      <DeleteSport/>
      <GetSport/>
    </div>
  );
}

export default App;
