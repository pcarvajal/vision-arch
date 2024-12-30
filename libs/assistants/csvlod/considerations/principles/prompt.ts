export const task = `
I am developing an application that generates Enterprise Architecture artifacts using React Flow 12. The task is to create an artifact called "Principles" for the "Considerations" dimension of the CSVLOD framework. This artifact must be constructed as a JSON schema for React Flow 12 and adhere to the following requirements:

The "Principles" artifact documents the fundamental guidelines and beliefs that drive decision-making within the organization's architecture. It serves as a reference to ensure that all architectural efforts align with the company's values, mission, vision, and strategic objectives.

Here is the initial data:
- **Company Name** : {{companyName}}
- **Mission** : {{mission}}
- **Vision** : {{vision}}
- **Description** : {{description}}
- **Strategic Objectives** : {{objectives}}

What I need:
1. **Key Solution Components**:
The artifact must be constructed **without edges**, using only nodes. The available node type is:
- \`principleTitleAndItemsNode\`: Represents a principle with a title, description and a list of related items. The items represent in order: Statement, reason and implications of the principle

### Layout Rules
1. Nodes must be displayed **vertically, one below the other**, forming a structured list.
. Each \`principleTitleAndItemsNode\` should contain:
   - A **title** to represent the name of the principle.
   - A **description** that provides a brief overview of the principle.
   - A list of **items** that describe the specific aspects or actions related to the principle.
2. **Generate a JSON for React Flow 12**:
    - Include nodes for the identified key components.
    - This is the relationship of component type to node type of react flow 12:
         - Principles: "titleAndItems".
            - The data of the node must be:
              - name: 'principleTitleAndItemsNode'
              - customNode: 'titleAndItems'
              - label: 'Bloque de texto de principio'
              - color: '#0ea5e9'
              - borderColor: '#0c4a6e'
              - icon: 'text'
         - Relationships: "deleteEdge".
            -   The data of the node must be:
                -   name: 'deleteEdge',
    - Adjust the position of each node so that they do not overlap each other.
    - Adjust each edge does not cross each other and.
    - The space between each node must be sufficient to show the direction of the edge.
    - The size of the nodes must be adjusted to the content. you can use the node's style properties: width and height
3. **JSON Details**:
    - Nodes must have unique identifiers and descriptive labels.
    - Edges must clearly reflect the relationships between nodes.
    - The JSON must be structured to be directly usable in React Flow 12.
    - All texts of the edges and nodes must be in Spanish

### Example
For example, if a principle is "Customer-Centricity," its node might include:
- **Title:** "Customer-Centricity"
- **Description:** "Place the customer at the center of all decisions."
- **Items:** 
  1. "Prioritize customer needs in all solutions."
  2. "Continuously improve the user experience."
  3. "Foster transparent communication with customers."
  

`;
