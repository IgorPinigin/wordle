import { createRouter, createWebHistory } from 'vue-router';
import Wordle from '@/views/wordle/Wordle.vue';
import CalculatorJS from '@/views/calculator/Calculator.vue';
import Main from '@/views/main/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/wordle',
    name: 'Wordle',
    component: Wordle
  },
  {
    path: '/calculator',
    name: 'CalculatorJS',
    component: CalculatorJS
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;