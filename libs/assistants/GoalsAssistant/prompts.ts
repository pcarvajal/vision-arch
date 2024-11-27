export const context = `
Generate a flow diagram based on a company's mission, vision, strategic objectives, name, and description, using React Flow 12 in a structured way.
Your goal is to create a clear and accurate layout for an Enterprise Architecture context, using nodes and edges to show relationships.

- **Inputs**: Mission, vision, strategic objectives, company's name, and its description
- **Steps**: 
  1. Analyze provided inputs to determine key concepts.
  2. Transform these concepts into React Flow nodes.
  3. Establish connections between nodes using edges that logically reflect relationships between strategic elements.

# Output Format
Provide the output as a structured JSON with the following keys:
- \`nodes\`: An array of node objects detailing each flow component.
  - Each node should contain properties like \`id\`, \`type\`, \`data\` (including key information).
- \`edges\`: An array of edge objects that specify connections between nodes.
  - Each edge should include \`source\`, \`target\`, and \`label\` to describe the relationship.

# Example
\`\`\`json
{
  "nodes": [
    {
      "id": "node1",
      "type": "input",
      "data": {
        "label": "Company Mission"
      },
      "position": { "x": 250, "y": 25 }
    },
    {
      "id": "node2",
      "type": "default",
      "data": {
        "label": "Strategic Objective 1"
      },
      "position": { "x": 400, "y": 100 }
    }
  ],
  "edges": [
    {
      "source": "node1",
      "target": "node2",
      "label": "Supports"
    }
  ]
}
\`\`\`

# Notes
- Ensure that nodes clearly represent different aspects of the company's strategic structure.
- Maintain clarity by avoiding overly complex node interconnections.
`;

export const task = `
Generate a projection for the year {year} of a a Business Object Model (BOM) diagram using React Flow 12 based on the following inputs and guidelines. A BOM is used to align business objectives with strategic goals, as described here. Your task is to clearly represent the relationships between goals, objectives, and the business strategies designed to achieve them.

1. Define the Nodes:
   - Create nodes for each business problem (e.g., "Business Problem 1", "Business Problem 2") with unique IDs, positions, and the type "problemNode".
   - Add nodes for each business objective (e.g., "Business Objective 1 (SM)", "Business Objective 2") with the type "objectiveNode".
   - Add nodes for the success metrics (e.g., "Success Metric 1", "Success Metric 2") with the type "basicNode" (or another type if needed).
   - Create nodes for the high-level features (e.g., "High-Level Feature 1", "High-Level Feature 2") with the type "featureNode".
   - Create a node for the product concept with the type "conceptNode".

2. Define type colors:
Each node type represents a specific category in the diagram, and the border color helps visually identify the category. Here is the relationship between the types and their colors:

A. **\`objetiveNode\` (Objective Node):**
   - Represents the company's objectives.
   - Border color: **Green** (\`border-green-600\`) because green symbolizes growth and achievable goals.

B. **\`problemNode\` (Problem Node):**
   - Indicates a problem or challenge the company is facing.
   - Border color: **Red** (\`border-red-600\`) because red highlights problems or warnings.

C. **\`conceptNode\` (Concept Node):**
   - Represents an idea or key concept related to objectives or problems.
   - Border color: **Purple** (\`border-purple-600\`) because purple symbolizes creativity and strategic thinking.

D. **\`featureNode\` (Feature Node):**
   - Describes a functionality or feature that helps solve a problem or achieve an objective.
   - Border color: **Yellow** (\`border-yellow-600\`) because yellow indicates innovation and focus on details.

E. **Basic Node:**
   - If the node doesn’t fit into any of the above categories, use a **Gray** border color (\`border-gray-600\`) as a generic default.

The goal is to ensure that the color helps users quickly understand the type of information each node represents.

3. Render in React Flow:
   - Import React Flow components and pass the nodes and edges array to the ReactFlow component.
   - Adjust the layout to ensure the nodes and edges align as shown in the image.

4. Example JSON for Nodes and Edges:
   - Define nodes and edges in a structured JSON format similar to:
     {
       nodes: [
         { id: 'bp1', type: 'problemNode', data: { type: 'problemNode', title:'Problem Title', description:'Problem Description', borderColor:'border-gray-600'' }, position: { x: 0, y: 50 } },
         { id: 'bp2', type: 'objetiveNode', data: { type: 'objetiveNode', title:'Objetive Title', description:'Objetive Description', borderColor:'border-green-600'' }, position: { x: 0, y: 150 } }
         ...
       ],
       edges: [
         { id: 'e1', source: 'bp1', target: 'bp2' },
         ...
       ]
     }
`;
