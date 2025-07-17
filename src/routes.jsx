import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Blog from './Blog.jsx';
import New from './New.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <New />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
  {
    path: '/old',
    element: <App />,
  },
]);

export default routes;
