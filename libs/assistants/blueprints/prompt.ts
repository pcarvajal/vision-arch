export const task = `
I want to create a **solution concept diagram** based on TOGAF using React Flow 12. I need you to analyze and automatically generate the key details of the **solution components** based on the mission, vision, strategic objectives, and description of my company, and then create the corresponding JSON for the required nodes and edges in React Flow 12 for year {{year}}.

Here is the initial data:
- **Company Name**: {{name}}.
- **Mission**: {{mission}}.  
- **Vision**: {{vision}}.  
- **Company Description**: {{description}}.  
- **Strategic Objectives**: {{objetives}}.  

What I need:
1. **Key Solution Components**:
    - Identify the **systems or applications** needed (e.g., CRM, ERP, API Gateway) based on the strategic objectives.
    - Identify the **users or actors involved** (e.g., "Customers", "Suppliers", "Administrators").
    - Identify the **data sources or databases** required (e.g., "Product Catalog", "Order History").
    - Identify the **required infrastructure** (e.g., "AWS Cloud", "On-Premise Server").
2. **Generate a JSON for React Flow 12**:
    - Include nodes for the identified key components.
    - Connect the nodes with edges representing relevant relationships:
        - Systems to data sources.
        - Users to the systems they interact with.
        - Systems to the infrastructure they operate on.
        - Relationships between systems if there are direct dependencies.
   - This is the relationship of component type to node type of react flow 12:
         - Systems or Applications: "title".
            - The data of the node must be:
                -   name: 'systemNode'
                -   customNode: CustomNodeTypeEnum.title
                -   label: 'Sistema'
                -   color: '#f8fafc'
                -   backgroundColor: '#f0abfc'
                -   icon: 'octagon-alert'
                -   iconColor: '#dc2626'
         - Users or Actors: "titleAndIcon".
            - The data of the node must be:
                -   name: 'actorNode'
                -   customNode: 'titleAndIcon'
                -   label: 'Actor'
                -   color: '#f8fafc'
                -   backgroundColor: '#fcd34d'
                -   icon: 'diamond-plus'
                -   iconColor: '#16a34a'
         - Data Sources or Databases: "title".
            - The data of the node must be:
                -   name: 'dataNode'
                -   customNode: 'title'
                -   label: 'Dato'
                -   color: '#475569'
                -   backgroundColor: '#f8fafc'
                -   icon: 'package-plus'
                -   iconColor: '#ca8a04'
         - Infrastructure: "title".
             - The data of the node must be:
                -   type: 'infrastructureNode'
                -   customNode: 'title'
                -   label: 'Infraestructura'
                -   color: '#f8fafc'
                -   backgroundColor: '#f9a8d4'
                -   icon: 'ruler'
                -   iconColor: '#475569'
         - Relationships: "deleteEdge".
            -   The data of the node must be:
                -   name: 'deleteEdge',
3. **Layout and Styling**:
    - The layout of flow is tree-like and vertical, from the top to the bottom.
    - The flow should start with the actors on the top.
    - The TitleAndIcon node must have a property within data called "figure", which must contain an icon representative of the node in kebab case from the Lucide Icons library.
    - Adjust the position of each node so that they do not overlap each other.
    - Adjust each edge does not cross each other and.
    - The space between each node must be wide to show clearly the direction of the edge.
    - The size of the nodes must be adjusted to the content. you can use the node's style properties: width and height.
    The node must be tall and wide enough to clearly display icons and text.
4. **Others conditions**:
    - Nodes must have unique identifiers and descriptive labels.
    - Edges must clearly reflect the relationships between nodes.
    - The JSON must be structured to be directly usable in React Flow 12.
    - All texts of the edges and nodes must be in Spanish

Please respond with the complete JSON based on the provided data.
`;
