export const task = `
Generate a projection for the year {year} of a a Business Object Model (BOM) diagram using React Flow 12 based on the following inputs and guidelines. A BOM is used to align business objectives with strategic goals, as described here. Your task is to clearly represent the relationships between goals, objectives, and the business strategies designed to achieve them.

Here is the initial data:
- **Company Name**: {{name}}.
- **Mission**: {{mission}}.  
- **Vision**: {{vision}}.  
- **Company Description**: {{description}}.  
- **Strategic Objectives**: {{objetives}}.  

What I need:
1. **Key Solution Components**:
   - Create nodes for each business problem (e.g., "Business Problem 1", "Business Problem 2"), this node can be linked to many "Objetive Node"
   - Add nodes for each business objective (e.g., "Business Objective 1 (SM)", "Business Objective 2").This node can be linked to many "Feature Node"
   - Add nodes for features (e.g., "High-Level Feature 1", "High-Level Feature 2"). This node can only be linked to the "Concep Node"
   - Add a node for the Product Concept with the type "conceptNode". This node only receives connections from "Fetaure Node". This node must be unique.
   - All texts of the edges and nodes must be in Spanish, include the label
2. **Generate a JSON for React Flow 12**:
    - Include nodes for the identified key components.
    - Connect the nodes with edges representing relevant relationships:
        - Problem to objetive. (It can be more than one)
        - Objetive to feature.(It can be more than one)
        - Feature to concept.(It can be more than one)
        - Relationships between systems if there are direct dependencies.
   - This is the relationship of component type to node type of react flow 12:
         - Objetives: "titleAndDescription".
            - The data of the node must be:
               -  name: 'objetiveNode'.
               -  customNode: titleAndDescription.
               -  icon: 'diamond-plus'
               -  iconColor: '#16a34a'
               -  label: 'Objetivo'
               -  borderColor: '#16a34a'
         - Problems: "titleAndDescription".
            - The data of the node must be:
               -  name: 'problemNode'
               -  customNode: 'titleAndDescription'
               -  label: 'Problema'
               -  icon: 'octagon-alert'
               -  iconColor: '#dc2626'
               -  borderColor: '#dc2626'
         - Features: "titleAndDescription".
            - The data of the node must be:
               -  name: 'featureNode'
               -  customNode: 'titleAndDescription'
               -  label: 'Característica'
               -  icon: 'package-plus'
               -  iconColor: '#ca8a04'
               -  borderColor: '#ca8a04'
         - Concept: "titleAndDescription".
            - The data of the node must be:
               -  name: 'conceptNode'
               -  customNode: 'titleAndDescription'
               -  label: 'Concepto'
               -  icon: 'square-dashed-kanban'
               -  iconColor: '#9333ea'
               -  borderColor: '#9333ea'
         - Relationships: "deleteEdge".
            -   The data of the node must be:
                -   name: 'deleteEdge',
   - Adjust the position of each node so that they do not overlap each other.
   - Adjust each edge does not cross each other and.
   - The layout of flow is tree-like and horizontal.
   - The space between each node must be broad to show the direction of the edge.
3. **JSON Details**:
    - Nodes must have unique identifiers and descriptive labels.
    - Edges must clearly reflect the relationships between nodes.
    - The JSON must be structured to be directly usable in React Flow 12.
    - All texts of the edges and nodes must be in Spanish
    - The nodes must have the correct dimension to display the nodes without overflow.

Please respond with the complete JSON based on the provided data.
`;
