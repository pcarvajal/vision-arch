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
  - Each node should contain properties like \`id\`, \`type\`, \`data\` and \`position\` (including key information).
- \`edges\`: An array of edge objects that specify connections between nodes.
  - Each edge should include \`id\`, \`source\`, \`target\`, and \`type\` to describe the relationship.

# Notes
- Ensure that nodes clearly represent different aspects of the company's strategic structure.
- Maintain clarity by avoiding overly complex node interconnections.
`;
