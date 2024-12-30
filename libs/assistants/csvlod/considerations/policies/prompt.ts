export const task = ` The task is to create an artifact called "Policies" for the "Considerations" dimension of the CSVLOD framework. This artifact must be constructed as a JSON schema for React Flow 12. To generate this diagram, the company's mission, vision, name, description and strategic objectives mentioned below will be taken into account.

Here is the initial data:
- **Company Name**: {{name}}.
- **Mission**: {{mission}}.  
- **Vision**: {{vision}}.  
- **Company Description**: {{description}}.  
- **Strategic Objectives**: {{objetives}}.  

What I need:
1. **Key Solution Components**:
  - Area Nodes:
    - policyTypeAreaNode: A container node representing the type of policies, "Internal" or "External".
      - Contains: policyTypeLabelNode.
    - policyAreaNode: A container node representing individual policies.
      - Contains: policyTextBlockNode.
    - policyDescriptionAreaNode: A container node providing detailed descriptions.
      - Contains: policyDescriptionTextBlockNode.
  - Text Block Nodes:
    - policyTypeLabelNode: Represents the label or category of a policy type, "Internal" or "External" exclusively in the "title" inside the node "data" object.
    - policyTextBlockNode: Represents the main text or content of a policy.
    - policyDescriptionTextBlockNode: Represents a detailed description of a specific policy.
2. **Hierarchy and Modularity**:
  - Use area nodes to group related policy components.
  - Define text block nodes for granular policy details.
  - Maintain a clear parent-child relationship among nodes.
  - A policy type can have several policies, each with its description.
  - Each policy should have a detailed description.
3. **Generate a JSON for React Flow 12**:
    - Include nodes for the identified key components.
    - This is the relationship of component type to node type of react flow 12:
         - Policy Type Area: "area".
            - The data of the node must be:
              - name: 'policyTypeAreaNode'
              - label: 'Área tipo de política'
              - color: '#0ea5e9'
              - borderColor: '#0c4a6e'
              icon: 'scan',
         - Policy Area: "area".
            - The data of the node must be:
              - name: 'policyAreaNode'
              - label: 'Área política'
              - color: '#eab308'
              - borderColor: '#713f12'
              - icon: 'scan'
         - Policy Description Area: "area".
            - The data of the node must be:
              - name: 'policyDescriptionAreaNode'
              - label: 'Área descripción de la política'
              - color: '#a855f7'
              - borderColor: '#581c87'
              - icon: 'scan'
         - Policy Type Label: "titleVertical".
            - The data of the node must be:
              - name: 'policyTypeLabelNode',
              - label: 'Bloque tipo de política'
              - icon: 'text'
        - Policy Text Block: "textBlock".
            - The data of the node must be:
              - type: 'policyTextBlockNode'
              - label: 'Bloque titulo de política'
              - icon: 'text'
        - Policy Description Text Block: "textBlock".
            - The data of the node must be:
              - name: 'policyDescriptionTextBlockNode'
              - label: 'Bloque descripción de política'
              - icon: 'text'
         - Relationships: "deleteEdge".
            -   The data of the node must be:
                -   name: 'deleteEdge',
4. **Layout and Styling**:
    - Nodes of type "area" must be of the same height.
    - The "area" type nodes should be aligned from left to right, starting with the policy type area, then policy, and finally policy description like horizontal.
    - The child nodes must be aligned in each area with each other, so that the link between them can be inferred.
    - The "area" type nodes act as **parents** for "textBlock" and "title" nodes.
    - The "area" type nodes must be tall and wide enough to contain their children
    - The "area" type nodes must contain multiple childrens.
    - The nodes must appear in the JSON schema in the following order:
      - Area nodes first.
      - Text block nodes second.
    - The space between each node must be sufficient to show the direction of the edge.
    - The size of the nodes must be adjusted to the content. you can use the node's style properties: width and height
5. **Other Details**:
    - Nodes must have unique identifiers and descriptive labels.
    - Edges must clearly reflect the relationships between nodes.
    - The JSON must be structured to be directly usable in React Flow 12.
    - All texts of the edges and nodes must be in Spanish
`;
