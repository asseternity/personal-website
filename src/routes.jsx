import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Blog from './Blog.jsx';
import New from './New.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/new',
    element: <New />,
  },
]);

export default routes;
