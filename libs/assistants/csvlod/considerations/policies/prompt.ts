export const task = `
 The task is to create an artifact called "Policies" for the "Considerations" dimension of the CSVLOD framework. This artifact must be constructed as a JSON schema for React Flow 12 and adhere to the following requirements:

### Context
The "Policies" artifact organizes and documents company policies based on their type, description, and relevance. It takes as input:
- Company name: {{companyName}}
- Mission: {{mission}}
- Vision: {{vision}}
- Description: {{description}}
- Strategic objectives: {{objetives}}

### Node Configuration
The schema must use only **nodes** (no edges) and be structured with areas and text blocks as follows:
1. **Area Nodes**:
   - \`policyTypeAreaNode\`: Contains \`policyTypeLabelNode\`.
   - \`policyAreaNode\`: Contains \`policyTextBlockNode\`.
   - \`policyDescriptionAreaNode\`: Contains \`policyDescriptionTextBlockNode\`.

2. **Text Block Nodes**:
   - \`policyTypeLabelNode\`: Represents the type of policy.
   - \`policyTextBlockNode\`: Represents the text of a policy.
   - \`policyDescriptionTextBlockNode\`: Represents the description of a policy.

### Relationships
- Area nodes act as **parents** for text block nodes.
- Area nodes must contain multiple text block nodes.
- The nodes must appear in the JSON schema in the following order:
  - Area nodes first.
  - Text block nodes second.

### Layout Rules
1. The layout must display:
   - \`policyTypeAreaNode\` on the left with its \`policyTypeLabelNode\` child.
   - To the right of \`policyTypeAreaNode\`, place \`policyAreaNode\` with its \`policyTextBlockNode\` child. If there are multiple \`policyAreaNode\` instances, stack them vertically below, ensuring alignment with neighboring nodes.
   - To the right of \`policyAreaNode\`, place \`policyDescriptionAreaNode\` with its \`policyDescriptionTextBlockNode\` child. Align its height with its neighbors.
2. Each parent node must have appropriate dimensions to contain all its child nodes.For this you have to very precisely adjust the properties of the width and height nodes, taking into consideration the width and height of their child nodes.
3. Ensure all nodes are positioned to maintain a coherent and visually balanced layout.
4. Area type nodes must be of the same height, taking the highest area as a reference.
5. Area nodes have to be separated by the same distance, approximately 10px.


### Output Format
Generate a React Flow JSON schema that:
- Defines the areas and their respective text blocks.
- Positions the nodes in the specified layout.
- Ensures parent nodes have adequate dimensions to contain all their child nodes.

### Example JSON Schema
Provide a complete example of a JSON schema with placeholder data to demonstrate the required structure, relationships, and layout for the artifact.

\`\`\`json
{
   "nodes":[
      {
         "id":"policyTypeAreaNode1",
         "type":"policyTypeAreaNode",
         "position":{
            "x":250,
            "y":25
         },
         "data":{
            "type":"policyTypeAreaNode",
            "nodeData":{
               "title":"Tipo de política"
            },
            "nodeBaseType":"BaseNodeTypeEnum.AREA",
            "label":"Área tipo de política",
            "width":100,
            "height":250,
            "color":"#0ea5e9",
            "borderColor":"#0c4a6e",
            "zIndex":900,
            "icon":"scan"
         }
      },
      {
         "id":"policyAreaNode2",
         "type":"policyAreaNode",
         "position":{
            "x":250,
            "y":50
         },
         "data":{
            "type":"policyAreaNode",
            "nodeData":{
               "title":"Política"
            },
            "nodeBaseType":"BaseNodeTypeEnum.AREA",
            "label":"Área política",
            "width":140,
            "height":250,
            "color":"#eab308",
            "borderColor":"#713f12",
            "zIndex":900,
            "icon":"scan"
         }
      },
      {
         "id":"policyDescriptionAreaNode3",
         "type":"policyDescriptionAreaNode",
         "position":{
            "x":500,
            "y":50
         },
         "data":{
            "type":"policyDescriptionAreaNode",
            "nodeData":{
               "title":"Descripción"
            },
            "nodeBaseType":"BaseNodeTypeEnum.AREA",
            "label":"Área descripción de la política",
            "width":600,
            "height":250,
            "color":"#a855f7",
            "borderColor":"#581c87",
            "zIndex":900,
            "icon":"scan"
         }
      },
      {
         "id":"policyTypeLabelNode4",
         "type":"policyTypeLabelNode",
         "position":{
            "x":75,
            "y":75
         },
         "data":{
            "type":"policyTypeLabelNode",
            "nodeData":{
               "title":"Tipo de política",
               "titlePlaceholder":"Ingresa un tipo de política ..."
            },
            "nodeBaseType":"BaseNodeTypeEnum.TITLE",
            "label":"Bloque tipo de política",
            "width":88,
            "height":193,
            "zIndex":"undefined",
            "icon":"text"
         }
      },
      {
         "id":"policyTextBlockNode5",
         "type":"policyTextBlockNode",
         "position":{
            "x":275,
            "y":125
         },
         "data":{
            "type":"policyTextBlockNode",
            "nodeData":{
               "textBlock":"Política",
               "textBlockPlaceholder":"Ingresa una política ..."
            },
            "nodeBaseType":"BaseNodeTypeEnum.TEXT_BLOCK",
            "label":"Bloque titulo de política",
            "width":110,
            "height":80,
            "icon":"text"
         }
      },
      {
         "id":"policyDescriptionTextBlockNode6",
         "type":"policyDescriptionTextBlockNode",
         "position":{
            "x":525,
            "y":125
         },
         "data":{
            "type":"policyDescriptionTextBlockNode",
            "nodeData":{
               "textBlock":"Descripción de la política",
               "textBlockPlaceholder":"Ingresa una descripción de la política ..."
            },
            "nodeBaseType":"BaseNodeTypeEnum.TEXT_BLOCK",
            "label":"Bloque descripción de política",
            "width":240,
            "height":80,
            "icon":"text"
         }
      }
   ],
   "edges":[
      
   ]
}
 \`\`\`

### Notes
The output must be modular, easy to adapt, and fully compatible with React Flow 12.

Please generate the JSON schema for this artifact based on the given requirements, using sample data to represent the company's name, mission, vision, description, and strategic objectives.
`;
