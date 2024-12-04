export const routes = {
  protected: {
    index: '/',
    company: '/company',
    artifacts: {
      goals: {
        create: '/artifacts/goals/create',
        edit: '/artifacts/goals/edit',
        visualize: '/artifacts/goals/visualize',
      },
      blueprints: {
        create: '/artifacts/blueprints/create',
        edit: '/artifacts/blueprints/edit',
        visualize: '/artifacts/blueprints/visualize',
      },
    },
  },
  public: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
};
