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
  "nodes": [
    {
      "id": "policyTypeAreaNode1",
      "type": "policyTypeAreaNode",
      "position": {
        "x": 250,
        "y": 25
      },
      "data": {
        "id": "1",
        "type": "policyTypeAreaNode",
        "position": {
          "x": 50,
          "y": 50
        },
        "label": "Policy Type Area",
        "width": 150,
        "height": 300,
        "color": "#1d4ed8",
        "borderColor": "#1e3a8a",
        "zIndex": 1000,
        "icon": ""
      }
    },
    {
      "id": "policyAreaNode2",
      "type": "policyAreaNode",
      "position": {
        "x": 250,
        "y": 50
      },
      "data": {
        "id": "policyAreaNode2",
        "type": "policyTypeAreaNode",
        "position": {
          "x": 250,
          "y": 50
        },
        "label": "Policy Area",
        "width": 200,
        "height": 300,
        "color": "#d97706",
        "borderColor": "#92400e",
        "zIndex": 1000,
        "icon": ""
      }
    },
    {
      "id": "policyDescriptionAreaNode3",
      "type": "policyDescriptionAreaNode",
      "position": {
        "x": 500,
        "y": 50
      },
      "data": {
        "id": "policyDescriptionAreaNode3",
        "type": "policyDescriptionAreaNode",
        "position": {
          "x": 500,
          "y": 50
        },
        "label": "Policy Description Area",
        "width": 400,
        "height": 300,
        "color": "#9333ea",
        "borderColor": "#6b21a8",
        "zIndex": 1000,
        "icon": ""
      }
    },
    {
      "id": "policyTypeLabelNode4",
      "type": "policyTypeLabelNode",
      "position": {
        "x": 75,
        "y": 75
      },
      "data": {
        "id": "policyTypeLabelNode4",
        "type": "policyTypeLabelNode",
        "position": {
          "x": 75,
          "y": 75
        },
        "label": "Policy Type Block",
        "width": 120,
        "height": 200,
        "icon": ""
      }
    },
    {
      "id": "policyTextBlockNode5",
      "type": "policyTextBlockNode",
      "position": {
        "x": 275,
        "y": 125
      },
      "data": {
        "id": "policyTextBlockNode5",
        "type": "policyTextBlockNode",
        "position": {
          "x": 275,
          "y": 125
        },
        "label": "Policy Title Block",
        "width": 150,
        "height": 200,
        "icon": "",
        "customData": {
          "textBlock": "Company Policy Example Title"
        }
      }
    },
    {
      "id": "policyDescriptionTextBlockNode6",
      "type": "policyDescriptionTextBlockNode",
      "position": {
        "x": 525,
        "y": 125
      },
      "data": {
        "id": "policyDescriptionTextBlockNode6",
        "type": "policyDescriptionTextBlockNode",
        "position": {
          "x": 525,
          "y": 125
        },
        "label": "Policy Description Block",
        "width": 300,
        "height": 100,
        "icon": "",
        "customData": {
          "textBlock": "Example description of the company policy, detailing its scope and application."
        }
      }
    }
  ],
  "edges": []
}
 \`\`\`

### Notes
The output must be modular, easy to adapt, and fully compatible with React Flow 12.

Please generate the JSON schema for this artifact based on the given requirements, using sample data to represent the company's name, mission, vision, description, and strategic objectives.
`;
