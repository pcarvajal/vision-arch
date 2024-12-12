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
export enum ArtifactCategoryEnum {
  CSVLOD = 'csvlod',
  TOGAF = 'togaf',
  OBJETIVES = 'objetives',
}

export enum ArtifacTypeEnum {
  PRINCIPLES = 'principles',
  POLICIES = 'policies',
  GUIDELINES = 'guidelines',
  GOALS = 'goals',
  BLUEPRINTS = 'blueprints',
}

export enum ArtifactDimensionEnum {
  CONSIDERATIONS = 'considerations',
  STANDARDS = 'standards',
}

// Nodes
export enum BaseNodeTypeEnum {
  AREA = 'areaNode',
  TEXT_BLOCK = 'textBlockNode',
  TITLE_AND_ITEMS = 'titleAndItemsNode',
  TITLE_DESCRIPTION = 'titleDescriptionNode',
  TITLE_ICON = 'titleIconNode',
  TITLE = 'titleNode',
  VERTICAL_TITLE = 'verticalTitleNode',
  NOTE = 'noteNode',
  BASIC = 'basicNode',
}

export enum GoalsTypeNodesEnum {
  PROBLEM = 'problemNode',
  OBJECTIVE = 'objectiveNode',
  SUCCESS_METRIC = 'default',
  FEATURE = 'featureNode',
  CONCEPT = 'conceptNode',
}
