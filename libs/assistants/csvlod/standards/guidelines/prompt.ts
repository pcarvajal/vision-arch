export const task = `
I am developing an application that generates Enterprise Architecture artifacts using React Flow 12. The task is to create an artifact called "Guidelines" for the "Standards" dimension of the CSVLOD framework. This artifact must be constructed as a JSON schema for React Flow 12 and adhere to the following requirements:


The "Guidelines" artifact defines and organizes the foundational standards and specific guidelines that direct the implementation of Enterprise Architecture.

Here is the initial data:
- **Company Name**: {{name}}.
- **Mission**: {{mission}}.  
- **Vision**: {{vision}}.  
- **Company Description**: {{description}}.  
- **Strategic Objectives**: {{objetives}}. 

What I need:
The artifact must be constructed **without edges**, using only nodes. The following nodes are available:
- **Area Nodes**:
  - \`standardAreaNode\`: Represents a general standard.
  - \`guidelineAreaNode\`: Represents specific guidelines tied to the standards.
- **Text Block Nodes**:
  - \`standardTextBlockNode\`: Text content for a standard.
  - \`guidelineTextBlockNode\`: Text content for a guideline.

### Relationships
1. \`standardAreaNode\` must contain one or more \`standardTextBlockNode\` nodes.
2. \`guidelineAreaNode\` must contain one or more \`guidelineTextBlockNode\` nodes.
3. The layout aligns horizontally, where blocks in \`standardAreaNode\` correspond to blocks in \`guidelineAreaNode\`.

### Layout Rules
1. **Area Nodes**:
   - \`standardAreaNode\` must appear on the right.
   - \`guidelineAreaNode\` must appear on the left.
2. **Text Block Nodes**:
   - Each \`standardTextBlockNode\` must align horizontally with a corresponding \`guidelineTextBlockNode\`.
3. **Order of Nodes in JSON**:
    - Area nodes must appear first in the JSON schema.
    - Text block nodes must appear after their respective parent area nodes.
      - Adjust the position of each node so that they do not overlap each other.
      - Adjust each edge does not cross each other and.
      - Area nodes act as **parents** for text block nodes. For this it has to have enough space to contain its child nodes, you can do this by adjusting the width and height of the node properties
    - Area nodes must contain multiple text block nodes.
    - The nodes must appear in the JSON schema in the following order:
      - Area nodes first.
      - Text block nodes second.
    - The space between each node must be sufficient to show the direction of the edge.
    - The size of the nodes must be adjusted to the content. you can use the node's style properties: width and height
3. **JSON Details**:
    - Nodes must have unique identifiers and descriptive labels.
    - Edges must clearly reflect the relationships between nodes.
    - The JSON must be structured to be directly usable in React Flow 12.
    - All texts of the edges and nodes must be in Spanish

`;
