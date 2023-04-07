import {Metrics} from './pages/Metrics';
import {MyEvents} from './pages/MyEvents';
import {CreateEvent} from './pages/CreateEvent';

const AppRoutes = [
 
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