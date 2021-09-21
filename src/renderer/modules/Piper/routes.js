import { lazy } from 'react';

const Piper = lazy(() => import('./Piper'));

const routes = [
    {
        name: 'piper',
        path: '/',
        component: Piper,
        exact: true,
    },
];

export default routes;
