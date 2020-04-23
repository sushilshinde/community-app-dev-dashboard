import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const FindInfo = React.lazy(() => import('./views/git/FindInfo'));
const Docs = React.lazy(() => import('./views/docs/Docs'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/git', exact: true, name: 'Git', component: FindInfo },
  { path: '/git/find-info', name: 'FindInfo', component: FindInfo },
  { path: '/docs', name: 'Documentation', component: Docs },
];

export default routes;
