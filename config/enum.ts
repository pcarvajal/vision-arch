// App
export enum UserStatusEnum {
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
}

export enum RolesEnum {
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
}

// Artifacts
export enum ArtifactEnum {
  PRINCIPLES = 'principles',
  POLICIES = 'policies',
  GUIDELINES = 'guidelines',
  GOALS = 'goals',
  BLUEPRINTS = 'blueprints',
}

// Nodes
export enum GoalsTypeNodesEnum {
  PROBLEM = 'problemNode',
  OBJECTIVE = 'objectiveNode',
  SUCCESS_METRIC = 'default',
  FEATURE = 'featureNode',
  CONCEPT = 'conceptNode',
}

export enum CsvlodArtifactsEnum {
  PRINCIPLES = 'principles',
  POLICIES = 'policies',
  GUIDELINES = 'guidelines',
}
