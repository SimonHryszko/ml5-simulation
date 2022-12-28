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
        component: () => import('./views/ColorClassification.vue'),
    },
    {
        name: 'Image classification',
        path: '/image-classification',
        component: () => import('./views/ImageClassification.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
