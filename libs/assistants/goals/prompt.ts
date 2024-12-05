export const task = `
Generate a projection for the year {year} of a a Business Object Model (BOM) diagram using React Flow 12 based on the following inputs and guidelines. A BOM is used to align business objectives with strategic goals, as described here. Your task is to clearly represent the relationships between goals, objectives, and the business strategies designed to achieve them.

1. Define the Nodes:
   - Create nodes for each business problem (e.g., "Business Problem 1", "Business Problem 2") with unique IDs and the type "problemNode". This node can be linked to many "objetiveNode"
   - Add nodes for each business objective (e.g., "Business Objective 1 (SM)", "Business Objective 2") with the type "objectiveNode".This node can be linked to many "featureNode"
   - Add nodes for features (e.g., "High-Level Feature 1", "High-Level Feature 2") with the type "featureNode". This node can only be linked to the "conceptNode"
   - Add a node for the Product Concept with the type "conceptNode". This node only receives connections from "featureNode"

Each node type represents a specific category in the diagram, and the border color helps visually identify the category. Here is the relationship between the types and their colors:

A. **\`objetiveNode\` (Objective Node):**
   - Represents the company's objectives.
   - Border color: **Green** (\`border-green-600\`) because green symbolizes growth and achievable goals.

B. **\`problemNode\` (Problem Node):**
   - Indicates a problem or challenge the company is facing.
   - Border color: **Red** (\`border-red-600\`) because red highlights problems or warnings.

C. **\`featureNode\` (Feature Node):**
   - Describes a functionality or feature that helps solve a problem or achieve an objective.
   - Border color: **Yellow** (\`border-yellow-600\`) because yellow indicates innovation and focus on details.

D. **\`conceptNode\` (Concept Node):**
   - Represents an idea or key concept related to objectives or problems.
   - Border color: **Purple** (\`border-purple-600\`) because purple symbolizes creativity and strategic thinking.

The goal is to ensure that the color helps users quickly understand the type of information each node represents.

2. Define the Edges:
    - Create edges between nodes to represent relationships.
    - Use the "deleteButtonEdge" type for edges to allow users to delete connections.
    - Ensure that each edge has a unique ID and specifies the source and target nodes it connects.

3. Render in React Flow:
   - Adjust the position of each node so that they do not overlap each other.
   - Adjust each edge does not cross each other and.
   - The layout of flow is tree-like and horizontal.
   - The space between each node must be sufficient to show the direction of the edge.
   - Each node has a width of 300px and a height of 180px

    # Example
    \`\`\`json
    {
      "nodes": [
        {
          "id": "node1",
          "type": "problemNode",
          "data": {
            "type": "problemNode",
            "title": "Problema 1",
            "description": "Descripción del problema 1."
            "borderColor": "border-blue-600"
          },
          "position": { "x": 250, "y": 25 }
        },
        {
          "id": "node2",
          "type": "objetiveNode",
          "data": {
            "type": "objetiveNode",
            "title": "Objetivo 1",
            "description": "Descripción del objetivo 1."
            "borderColor": "border-blue-600"
          },
          "position": { "x": 400, "y": 100 }
        }
      ],
      "edges": [
        {
          "id": "e01",
          "source": "node1",
          "target": "node2",
          "type": "deleteButtonEdge"
        }
      ]
    }
    \`\`\`
`;
