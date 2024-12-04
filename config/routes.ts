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
    },
  },
  public: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
};
