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
      csvlod: {
        considerations: {
          policies: {
            index: '/artifacts/csvlod/considerations/policies',
          },
          principles: {
            index: '/artifacts/csvlod/considerations/principles',
          },
        },
        standards: {
          guidelines: {
            index: '/artifacts/csvlod/standards/guidelines',
          },
        },
      },
    },
  },
  public: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
};
