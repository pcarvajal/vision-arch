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
   "nodes":[
      {
         "id":"customer",
         "type":"actorNode",
         "data":{
            "type":"actorNode",
            "nodeData":{
               "titlePlaceholder":"Ingresa un actor ..."
            },
            "nodeBaseType":"BaseNodeTypeEnum.TITLE_ICON",
            "label":"Actor",
            "color":"#f8fafc",
            "backgroundColor":"#fcd34d",
            "icon":"diamond-plus",
            "iconColor":"#16a34a",
            "width":200,
            "height":100
         },
         "position":{
            "x":100,
            "y":100
         }
      },
      {
         "id":"webPortal",
         "type":"systemNode",
         "data":{
            "type":"systemNode",
            "nodeData":{
               "titlePlaceholder":"Ingresa un sistema ..."
            },
            "nodeBaseType":"BaseNodeTypeEnum.TITLE",
            "label":"Sistema",
            "color":"#f8fafc",
            "backgroundColor":"#f0abfc",
            "icon":"octagon-alert",
            "iconColor":"#dc2626",
            "width":200,
            "height":100
         },
         "position":{
            "x":300,
            "y":100
         }
      },
      {
         "id":"orderManagement",
         "type":"processNode",
         "data":{
            "type":"processNode",
            "nodeData":{
               "titlePlaceholder":"Ingresa un proceso ..."
            },
            "nodeBaseType":"BaseNodeTypeEnum.TITLE",
            "label":"Proceso",
            "color":"#f8fafc",
            "backgroundColor":"#a78bfa",
            "icon":"square-dashed-kanban",
            "iconColor":"#9333ea",
            "width":200,
            "height":100
         },
         "position":{
            "x":500,
            "y":200
         }
      },
      {
         "id":"database",
         "type":"dataNode",
         "data":{
            "type":"dataNode",
            "nodeData":{
               "titlePlaceholder":"Ingresa una fuente de datos ..."
            },
            "nodeBaseType":"BaseNodeTypeEnum.TITLE",
            "label":"Dato",
            "color":"#475569",
            "backgroundColor":"#f8fafc",
            "icon":"package-plus",
            "iconColor":"#ca8a04",
            "width":200,
            "height":100
         },
         "position":{
            "x":500,
            "y":400
         }
      },
      {
         "id":"cloudInfrastructure",
         "type":"infrastructureNode",
         "data":{
            "type":"infrastructureNode",
            "nodeData":{
               "titlePlaceholder":"Ingresa una componente de infraestructura ..."
            },
            "nodeBaseType":"BaseNodeTypeEnum.TITLE",
            "label":"Infraestructura",
            "color":"#f8fafc",
            "backgroundColor":"#f9a8d4",
            "icon":"ruler",
            "iconColor":"#475569",
            "width":200,
            "height":100
         },
         "position":{
            "x":700,
            "y":300
         }
      }
   ],
   "edges":[
      {
         "id":"customer-to-webPortal",
         "source":"customer",
         "target":"webPortal",
         "animated":true,
         "label":"Accesses",
         "type":"customDefaultEdge"
      },
      {
         "id":"webPortal-to-orderManagement",
         "source":"webPortal",
         "target":"orderManagement",
         "animated":true,
         "label":"Sends Orders",
         "type":"customDefaultEdge"
      },
      {
         "id":"orderManagement-to-database",
         "source":"orderManagement",
         "target":"database",
         "animated":true,
         "label":"Fetches Data",
         "type":"customDefaultEdge"
      },
      {
         "id":"orderManagement-to-cloudInfrastructure",
         "source":"orderManagement",
         "target":"cloudInfrastructure",
         "animated":true,
         "label":"Operates On",
         "type":"customDefaultEdge"
      }
   ]
}
\`\`\`

`;
