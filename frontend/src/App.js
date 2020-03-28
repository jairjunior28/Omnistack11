import React from 'react';
import './global.css';
import Routes from './routes';

//import Header from './Header';
//jsx
function App() {
  /*const [contador,setContador] = useState(0);
  function increment(){
    setContador(contador +1);
    
  }*/
  return (
    <Routes/>
    //<Header title="Semana Omnistack"/>
    /*<div>
    <Header>
      Contador:{contador}
    </Header>
    <button onClick={increment}>Incrementar</button>
    </div>*/
  );
}

export default App;
