export const task = `
 The task is to create an artifact called "Policies" for the "Considerations" dimension of the CSVLOD framework. This artifact must be constructed as a JSON schema for React Flow 12 and adhere to the following requirements:

Here is the initial data:
- **Company Name**: {{name}}.
- **Mission**: {{mission}}.  
- **Vision**: {{vision}}.  
- **Company Description**: {{description}}.  
- **Strategic Objectives**: {{objetives}}.  

What I need:
1. **Key Solution Components**:
   **Area Nodes**:
   - \`policyTypeAreaNode\`: Contains \`policyTypeLabelNode\`.
   - \`policyAreaNode\`: Contains \`policyTextBlockNode\`.
   - \`policyDescriptionAreaNode\`: Contains \`policyDescriptionTextBlockNode\`.
   **Text Block Nodes**:
   - \`policyTypeLabelNode\`: Represents the type of policy.
   - \`policyTextBlockNode\`: Represents the text of a policy.
   - \`policyDescriptionTextBlockNode\`: Represents the description of a policy.
2. **Generate a JSON for React Flow 12**:
    - Include nodes for the identified key components.
    - This is the relationship of component type to node type of react flow 12:
         - Policy Type Area: "area".
            - The data of the node must be:
              - name: 'policyTypeAreaNode'
              - customNode: 'area'
              - label: 'Área tipo de política'
              - color: '#0ea5e9'
              - borderColor: '#0c4a6e'
              icon: 'scan',
         - Policy Area: "area".
            - The data of the node must be:
              - name: 'policyAreaNode'
              - customNode: 'area'
              - label: 'Área política'
              - color: '#eab308'
              - borderColor: '#713f12'
              - icon: 'scan'
         - Policy Description Area: "area".
            - The data of the node must be:
              - name: 'policyDescriptionAreaNode'
              - customNode: 'area'
              - label: 'Área descripción de la política'
              - color: '#a855f7'
              - borderColor: '#581c87'
              - icon: 'scan'
         - Policy Type Label: "title".
            - The data of the node must be:
              - name: 'policyTypeLabelNode',
              - customNode: 'title'
              - label: 'Bloque tipo de política'
              - icon: 'text'
        - Policy Text Block: "textBlock".
            - The data of the node must be:
              - type: 'policyTextBlockNode'
              - customNode: 'textBlock'
              - label: 'Bloque titulo de política'
              - icon: 'text'
        - Policy Description Text Block: "textBlock".
            - The data of the node must be:
              - name: 'policyDescriptionTextBlockNode'
              - customNode: 'textBlock'
              - label: 'Bloque descripción de política'
              - icon: 'text'
         - Relationships: "deleteEdge".
            -   The data of the node must be:
                -   name: 'deleteEdge',
    - Adjust the position of each node so that they do not overlap each other.
    - Adjust each edge does not cross each other and.
    - Area nodes act as **parents** for text block nodes. For this it has to have enough space to contain its child nodes, you can do this by adjusting the width and height of the node properties
    - Area nodes must contain multiple text block nodes.
    - The nodes must appear in the JSON schema in the following order:
      - Area nodes first.
      - Text block nodes second.
    - The space between each node must be sufficient to show the direction of the edge.
3. **JSON Details**:
    - Nodes must have unique identifiers and descriptive labels.
    - Edges must clearly reflect the relationships between nodes.
    - The JSON must be structured to be directly usable in React Flow 12.
    - All texts of the edges and nodes must be in Spanish








   


`;
