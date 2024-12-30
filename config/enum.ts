// App
export enum UserStatusEnum {
  verified = 'verified',
  unverified = 'unverified',
}

export enum RolesEnum {
  admin = 'admin',
  owner = 'owner',
  user = 'user',
}

// Artifacts
export enum ArtifactCategoryEnum {
  csvlod = 'csvlod',
  togaf = 'togaf',
  objetives = 'objetives',
}

export enum ArtifacTypeEnum {
  principles = 'principles',
  policies = 'policies',
  guidelines = 'guidelines',
  goals = 'goals',
  blueprints = 'blueprints',
}

export enum ArtifactDimensionEnum {
  considerations = 'considerations',
  standards = 'standards',
}

// Nodes
export enum CustomNodeTypeEnum {
  area = 'area',
  textBlock = 'textBlock',
  titleAndItems = 'titleAndItems',
  titleAndDescription = 'titleAndDescription',
  titleAndIcon = 'titleAndIcon',
  title = 'title',
  titleVertical = 'titleVertical',
  note = 'note',
  basic = 'basic',
}

export enum GoalsTypeNodesEnum {
  problem = 'problemNode',
  objetive = 'objectiveNode',
  successMetric = 'default',
  feature = 'featureNode',
  concept = 'conceptNode',
}
