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
3. **JSON Details**:
    - Nodes must have unique identifiers and descriptive labels.
    - Edges must clearly reflect the relationships between nodes.
    - The JSON must be structured to be directly usable in React Flow 12.

Please respond with the complete JSON based on the provided data.

# Example
\`\`\`json
{
  "nodes": [
    {
      "id": "customer",
      "type": "actorNode",
      "data": { 
        "label": "Customer",       
        "backgroundColor": "#fcd34d",
        "textColor": "#f8fafc",
        "type": "actorNode",
        "placeholder": "Etiqueta ...",
        "width": 200,
        "height": 100
      },
      "position": { "x": 100, "y": 100 }
    },
    {
      "id": "webPortal",
      "type": "systemNode",
      "data": { 
        "label": "Web Portal",       
        "backgroundColor": "#f0abfc",
        "textColor": "#f8fafc",
        "type": "systemNode",
        "placeholder": "Etiqueta ...",
        "width": 200,
        "height": 100
      },
      "position": { "x": 300, "y": 100 }
    },
    {
      "id": "orderManagement",
      "type": "processNode",
      "data": {
        "label": "Order Management System",
        "backgroundColor": "#a78bfa",
        "textColor": "#f8fafc",
        "type": "processNode",
        "placeholder": "Etiqueta ...",
        "width": 200,
        "height": 100
      },
      "position": { "x": 500, "y": 200 }
    },
    {
      "id": "database",
      "type": "dataNode",
      "data": {
        "label": "Product Database',
        "backgroundColor": "#f8fafc",
        "textColor": "#475569',
        "type": "dataNode",
        "placeholder": "Etiqueta ...",
        "width": 200,
        "height": 100
      },
      "position": { "x": 500, "y": 400 }
    },
    {
      "id": "cloudInfrastructure",
      "type": "infrastructureNode",
      "data": {
        "label": "AWS Cloud",
        "backgroundColor": "#f9a8d4",
        "textColor": "text-white",
        "type": "infrastructureNode",
        "placeholder": "Etiqueta ...",
        "width": 200,
        "height": 100
      },
      "position": { "x": 700, "y": 300 }
    }
  ],
  "edges": [
    {
      "id": "customer-to-webPortal",
      "source": "customer",
      "target": "webPortal",
      "animated": true,
      "label": "Accesses",
      "type": "customDefaultEdge"
      
    },
    {
      "id": "webPortal-to-orderManagement",
      "source": "webPortal",
      "target": "orderManagement",
      "animated": true,
      "label": "Sends Orders",
       "type": "customDefaultEdge"
    },
    {
      "id": "orderManagement-to-database",
      "source": "orderManagement",
      "target": "database",
      "animated": true,
      "label": "Fetches Data",
      "type": "customDefaultEdge"
    },
    {
      "id": "orderManagement-to-cloudInfrastructure",
      "source": "orderManagement",
      "target": "cloudInfrastructure",
      "animated": true,
      "label": "Operates On",
      "type": "customDefaultEdge"
    }
  ]
}
\`\`\`

`;
