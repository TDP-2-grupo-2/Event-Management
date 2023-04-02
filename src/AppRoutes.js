import {Metrics} from './pages/Metrics';
import {MyEvents} from './pages/MyEvents';
import {CreateEvent} from './pages/CreateEvent';

const AppRoutes = [
  //{
    //index: 1,
    //element: <Home/>
  //},
  {
    path: '/metrics',
    element: <Metrics/>
  },
  {
    path: '/my-events',
    element: <MyEvents/>
  },
  {
    path: '/create-event',
    element: <CreateEvent/>
  }

];

export default AppRoutes;