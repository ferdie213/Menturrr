import { defineAsyncComponent } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';

// import MentorDetail from './pages/mentors/MentorDetail.vue';
import MentorsList from './pages/mentors/MentorsList.vue';
// import MentorRegistration from './pages/mentors/MentorRegistration.vue';
// import ContactMentor from './pages/requests/ContactMentor.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const MentorDetail = defineAsyncComponent(() =>
  import('./pages/mentors/MentorDetail.vue')
);
const MentorRegistration = defineAsyncComponent(() =>
  import('./pages/mentors/MentorRegistration.vue')
);
const ContactMentor = defineAsyncComponent(() =>
  import('./pages/requests/ContactMentor.vue')
);
const RequestsReceived = defineAsyncComponent(() =>
  import('./pages/requests/RequestsReceived.vue')
);
const UserAuth = defineAsyncComponent(() =>
  import('./pages/auth/UserAuth.vue')
);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/mentors' },
    { path: '/mentors', component: MentorsList },
    {
      path: '/mentors/:id',
      component: MentorDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactMentor }, // /mentors/m1/contact
      ],
    },
    {
      path: '/register',
      component: MentorRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

// global navigation guard
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/mentors');
  } else {
    next();
  }
});

export default router;
