export const roles = ['owner', 'admin', 'user'] as const;

const prompts = {
  appContext: `You are an expert assistant in generating flows and diagrams using React Flow 12 for an Enterprise Architecture application. Based on a companies mission, vision, strategic objectives, name, and description, generate a structured JSON defining nodes and edges for React Flow 12.`,
  tasks: {
    businessObjetiveModel: {
      task: `
      Generate a Business Objectives Model (BOM) for the year {year} in JSON format, structured for use with React Flow 12. The model should include the following components:
        1. **Business Problems**: Initial nodes identifying the key challenges faced by the business.
        2. **Strategic Objectives**: Intermediate nodes outlining goals directly linked to the identified problems.
        3. **Product Features**: Final nodes representing solutions or features derived from the strategic objectives.
        4. **Concept**: A single node summarizing the product concept, encompassing the new features.
      `,
      flowLayout: `
      ### Requirements for Node Arrangement:
      - Nodes must be positioned hierarchically to reflect logical relationships:
        - **Root nodes** (e.g., Business Problems) should appear at the top of the diagram.
        - **Intermediate nodes** (e.g., Strategic Objectives) should appear below their parent nodes.
        - **Final nodes** (e.g., Product Features) should appear at the bottom.
      - Ensure sufficient spacing to avoid overlapping:
        - **Horizontal spacing**: At least 300px between sibling nodes.
        - **Vertical spacing**: At least 150px between levels of the hierarchy.`,
    },
  },
};

const nodeSchema = {
  id: {
    type: 'string',
    description: 'Unique identifier for the node',
  },
  type: {
    type: 'string',
    description: 'Type of the node.',
    enum: ['objetiveNode', 'problemNode', 'conceptNode', 'featureNode'],
  },
  position: {
    type: 'object',
    description: 'Position of the node in the diagram',
    properties: {
      x: {
        type: 'number',
        description: 'Horizontal position',
      },
      y: {
        type: 'number',
        description: 'Vertical position',
      },
    },
  },
  data: {
    type: 'object',
    description: 'Data object for the node',
    properties: {
      title: {
        type: 'string',
        description: 'Title of the node',
      },
      description: {
        type: 'string',
        description: 'Description of the node',
      },
    },
  },
};

const edgeSchema = {
  id: {
    type: 'string',
    description: 'Unique identifier for the edge',
  },
  source: {
    type: 'string',
    description: 'Source node identifier',
  },
  target: {
    type: 'string',
    description: 'Target node identifier',
  },
  animated: {
    type: 'boolean',
    description: 'Flag to animate the edge',
  },
};

export { prompts, edgeSchema, nodeSchema };
