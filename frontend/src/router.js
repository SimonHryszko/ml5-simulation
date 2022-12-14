import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'Landing page',
        path: '/',
        component: () => import('./views/LandingView.vue'),
    },
    {
        name: 'Color classification',
        path: '/color-classification',
        component: () => import('./views/color/ColorClassification.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
