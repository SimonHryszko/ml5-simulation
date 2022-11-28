import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'Landing page',
        path: '/',
        component: () => import('../views/LandingView.vue'),
    },
    {
        name: 'Color classificator',
        path: '/cc',
        component: () => import('../views/color/ColorView.vue'),
    },
    {
        name: 'Object detection',
        path: '/object-detection',
        component: () => import('../views/objectDetection/index.vue'),
    },
    {
        name: 'Draw recognition',
        path: '/draw-recognition',
        component: () => import('../views/drawRecognition/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
