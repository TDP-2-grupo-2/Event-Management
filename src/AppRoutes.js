import {Metrics} from './pages/Metrics';
import {MyEvents} from './pages/MyEvents';
import {CreateEvent} from './pages/CreateEvent';
import { EditDraftEvent } from './pages/EditEventDraft';

const AppRoutes = [
 
  {
    path: '/metrics',
    element: <Metrics/>,
    show: true
  },
  {
    path: '/my-events',
    element: <MyEvents/>,
    show: true
  },
  {
    path: '/create-event',
    element: <CreateEvent/>, 
    show: true
  },


];

export default AppRoutes;