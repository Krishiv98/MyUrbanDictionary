import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UrbanTermView from '../views/UrbanTermView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [

  // Description -> This view will display all the trending Urban term
  //   This page will first get all the urban term
  //       then get top 50 Urban terms according to the total number of likes
  // This view will display all the Urban terms in a card form and its associated user and details
  // -> Api calls - GET, PUT
  // -> Components used in this page will be
  // - CreateUrbanTermButton, ProfileButton, UrbanTerm, User, Like Button, Dislike Button
  // (Maybe implement the search bar and the profile button here)
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  // This view will show all the definitions for a urban term, its assosiated user
  // and will have a button which will let a
  // user add there own definitions for the current UrbanTerm
  // API Calls - Get, Put

  {
    path: '/urbanterm',
    name: 'UrbanTerm',
    component: () => import('../views/UrbanTermView.vue'),
  },
  // This view wil add a new Uban term and a definition to the database
  // Only a logged in user can access this view other view lead the visitor to
  // the user account creation
  // API calls -POST
  // components - Urban term, definition
  {
    path: '/urbantermcreation',
    name: 'UrbanTermCreationView',
    component: () => import('../views/UrbanTermCreationView.vue'),
  },

  /// this view will only call post method to add a new definition and close it self
  {
    path: '/urbantermdefinitioncreation',
    name: 'home',
    component: () => import('../views/UrbanTermDefinitionCreationView.vue'),
  },

  /// User related views

];

const router = new VueRouter({
  routes,
});

export default router;
