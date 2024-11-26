export const roles = ["owner", "admin", "user"] as const;

const prompts = {
  appContext: `You are an expert assistant in generating flows and diagrams using React Flow 12 for an Enterprise Architecture application. Utilize the OpenAI API to generate responses. Based on a company's mission, vision, strategic objectives, name, and description, generate a structured JSON defining nodes and edges for React Flow 12.`,
  tasks: {
    businessObjetiveModel: {
      task: `
1. Define the Nodes:
   - Create nodes for each business problem (e.g., "Business Problem 1", "Business Problem 2") with unique IDs, positions, and the type "problemNode".
   - Add nodes for each business objective (e.g., "Business Objective 1 (SM)", "Business Objective 2") with the type "objectiveNode".
   - Add nodes for the success metrics (e.g., "Success Metric 1", "Success Metric 2") with the type "default" (or another type if needed).
   - Create nodes for the high-level features (e.g., "High-Level Feature 1", "High-Level Feature 2") with the type "featureNode".
   - Create a node for the product concept with the type "conceptNode".

2. Define the Edges:
   - Connect the "problemNode" nodes to their respective "objectiveNode" nodes using directional edges.
   - Connect the "objectiveNode" nodes to the success metric nodes ("default" type).
   - Link the success metric nodes to the "featureNode" nodes.
   - Optionally connect the "conceptNode" to the high-level features ("featureNode").

3. Structure JSON for React Flow:
   - Each node should have properties like "id", "type", "data", and "position". The "type" property specifies the node type (e.g., "problemNode", "objectiveNode").
   - Each edge should have properties like "id", "source", "target", and "animated" if applicable.

4. Customize Styling:
   - Define custom styles for each node type ("problemNode", "objectiveNode", "featureNode", "conceptNode") using React Flow's node customization options.
   - Use arrows or labels for edges to indicate relationships clearly.

5. Render in React Flow:
   - Import React Flow components and pass the nodes and edges array to the ReactFlow component.
   - Adjust the layout to ensure the nodes and edges align as shown in the image.

6. Example JSON for Nodes and Edges:
   - Define nodes and edges in a structured JSON format similar to:
     {
       nodes: [
         { id: 'bp1', type: 'problemNode', data: { label: 'Business Problem 1' }, position: { x: 0, y: 50 } },
         ...
       ],
       edges: [
         { id: 'e1', source: 'bp1', target: 'bo1' },
         ...
       ]
     }

7. Implement Interaction:
   - Add interactivity for selecting, moving, or connecting nodes.
   - Optionally, include a zoom or pan feature to navigate the flow.

8. Enhance the Visuals:
   - Add hover effects or tooltips to nodes and edges for better usability.
   - Use custom node components for "problemNode", "objectiveNode", "featureNode", and "conceptNode" to provide specific designs for each type.
`,
      flowLayout: `
      ### Requirements for Node Arrangement:
      - Nodes must be positioned hierarchically to reflect logical relationships:
        - **Root nodes** (e.g., Business Problems) should appear at the top of the diagram.
        - **Intermediate nodes** (e.g., Strategic Objectives) should appear below their parent nodes.
        - **Final nodes** (e.g., Product Features) should appear at the bottom.
      - Ensure sufficient spacing to avoid overlapping:
        - **Horizontal spacing**: At least 300px between sibling nodes.
        - **Vertical spacing**: At least 150px between levels of the hierarchy.`
    }
  }
};

const instructions = `
1. Define the Nodes:
   - Create nodes for each business problem (e.g., "Business Problem 1", "Business Problem 2") with unique IDs, positions, and the type "problemNode".
   - Add nodes for each business objective (e.g., "Business Objective 1 (SM)", "Business Objective 2") with the type "objectiveNode".
   - Add nodes for the success metrics (e.g., "Success Metric 1", "Success Metric 2") with the type "default" (or another type if needed).
   - Create nodes for the high-level features (e.g., "High-Level Feature 1", "High-Level Feature 2") with the type "featureNode".
   - Create a node for the product concept with the type "conceptNode".

2. Define the Edges:
   - Connect the "problemNode" nodes to their respective "objectiveNode" nodes using directional edges.
   - Connect the "objectiveNode" nodes to the success metric nodes ("default" type).
   - Link the success metric nodes to the "featureNode" nodes.
   - Optionally connect the "conceptNode" to the high-level features ("featureNode").

3. Structure JSON for React Flow:
   - Each node should have properties like "id", "type", "data", and "position". The "type" property specifies the node type (e.g., "problemNode", "objectiveNode").
   - Each edge should have properties like "id", "source", "target", and "animated" if applicable.

4. Customize Styling:
   - Define custom styles for each node type ("problemNode", "objectiveNode", "featureNode", "conceptNode") using React Flow's node customization options.
   - Use arrows or labels for edges to indicate relationships clearly.

5. Render in React Flow:
   - Import React Flow components and pass the nodes and edges array to the ReactFlow component.
   - Adjust the layout to ensure the nodes and edges align as shown in the image.

6. Example JSON for Nodes and Edges:
   - Define nodes and edges in a structured JSON format similar to:
     {
       nodes: [
         { id: 'bp1', type: 'problemNode', data: { label: 'Business Problem 1' }, position: { x: 0, y: 50 } },
         ...
       ],
       edges: [
         { id: 'e1', source: 'bp1', target: 'bo1' },
         ...
       ]
     }

7. Implement Interaction:
   - Add interactivity for selecting, moving, or connecting nodes.
   - Optionally, include a zoom or pan feature to navigate the flow.

8. Enhance the Visuals:
   - Add hover effects or tooltips to nodes and edges for better usability.
   - Use custom node components for "problemNode", "objectiveNode", "featureNode", and "conceptNode" to provide specific designs for each type.
`;

const nodeSchema = {
  id: {
    type: "string",
    description: "Unique identifier for the node"
  },
  type: {
    type: "string",
    description: "Type of the node.",
    enum: ["objetiveNode", "problemNode", "conceptNode", "featureNode"]
  },
  position: {
    type: "object",
    description: "Position of the node in the diagram",
    properties: {
      x: {
        type: "number",
        description: "Horizontal position"
      },
      y: {
        type: "number",
        description: "Vertical position"
      }
    }
  },
  data: {
    type: "object",
    description: "Data object for the node",
    properties: {
      title: {
        type: "string",
        description: "Title of the node"
      },
      description: {
        type: "string",
        description: "Description of the node"
      }
    }
  }
};

const edgeSchema = {
  id: {
    type: "string",
    description: "Unique identifier for the edge"
  },
  source: {
    type: "string",
    description: "Source node identifier"
  },
  target: {
    type: "string",
    description: "Target node identifier"
  },
  animated: {
    type: "boolean",
    description: "Flag to animate the edge"
  }
};

export { prompts, edgeSchema, nodeSchema };
