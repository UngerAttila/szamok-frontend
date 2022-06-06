import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import QTableQuestionView from "./views/QTableQuestionView.vue";
import StartPageView from "./views/StartPageView.vue";
import EditQuestionView from "./views/EditQuestionView.vue";
import NewQuestionView from "./views/NewQuestionView.vue";
import EditCategoryView from "./views/EditCategoryView.vue";
import NewCategoryView from "./views/NewCategoryView.vue";
import QTableCategoryView from "./views/QTableCategoryView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "startPage",
    component: StartPageView,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
  },
  {
    path: "/editQuestion",
    name: "editQuestion",
    component: EditQuestionView,
  },
  {
    path: "/newQuestion",
    name: "newQuestion",
    component: NewQuestionView,
  },
  {
    path: "/qtablequestion",
    name: "qtablequestion",
    component: QTableQuestionView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/editCategory",
    name: "editCategory",
    component: EditCategoryView,
  },
  {
    path: "/newCategory",
    name: "newCategory",
    component: NewCategoryView,
  },
  {
    path: "/qtablecategory",
    name: "qtablecategory",
    component: QTableCategoryView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});
export default router;
