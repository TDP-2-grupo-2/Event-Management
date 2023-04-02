import {Metrics} from './pages/Metrics';
import {MyEvents} from './pages/MyEvents';
import {CreateEvent} from './pages/CreateEvent';

const AppRoutes = [
  //{
    //index: 1,
    //element: <Home/>
  //},
  {
    path: '/Metrics',
    element: <Metrics/>
  },
  {
    path: '/MyEvents',
    element: <MyEvents/>
  },
  {
    path: '/CreateEvent',
    element: <CreateEvent/>
  }

];

export default AppRoutes;