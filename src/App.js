
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AppRoutes from './AppRoutes';
import {Sidebar} from './components/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Sidebar>
    </BrowserRouter>
  
  );
}

export default App;