import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { 
		name: "Color classification",
		path: "/",
		component: () => import("../views/colorClassification/index.vue") 
	},
  { 
		name: "Object detection",
		path: "/object-detection",
		component: () => import("../views/objectDetection/index.vue") 
	},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
