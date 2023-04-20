
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AppRoutes from './AppRoutes';
import {Sidebar} from './components/Sidebar'
import {Login} from './pages/Login'
import { useState } from 'react';

function App() {
  let [authenticated, setAuthentification] = useState(false)
  return (
      
      authenticated ?
        <BrowserRouter>
          <Routes>
              {AppRoutes.map((route, index) => {
                const { element, ...rest } = route;
                return <Route key={index} {...rest} element={element} />;
              })}
            </Routes>
        
          <Sidebar>
          </Sidebar>
        </BrowserRouter>
      :
      <Login 
            authenticated={authenticated} 
            setAuthentification={setAuthentification}>
      </Login>

      
  );
}

export default App;
