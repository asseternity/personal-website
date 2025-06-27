import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Blog from './Blog.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/blog',
    element: <Blog />,
  },
]);

export default routes;
