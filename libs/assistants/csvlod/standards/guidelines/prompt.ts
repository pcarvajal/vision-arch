export const task = `
I am developing an application that generates Enterprise Architecture artifacts using React Flow 12. The task is to create an artifact called "Guidelines" for the "Standards" dimension of the CSVLOD framework. This artifact must be constructed as a JSON schema for React Flow 12 and adhere to the following requirements:

### Context
The "Guidelines" artifact defines and organizes the foundational standards and specific guidelines that direct the implementation of Enterprise Architecture. It takes as input:
- **Company Name** :{{companyName}}
- **Mission** : {{mission}} 
- **Vision** : {{vision}}
- **Description** : {{description}}
- **Strategic Objectives** : {{objectives}}

### Node Configuration
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

### Output Format
Generate a JSON schema for React Flow 12 that:
1. Defines the area nodes and their respective text block nodes.
2. Ensures parent nodes (\`standardAreaNode\` and \`guidelineAreaNode\`) have dimensions adequate to contain their children.
3. Positions the nodes to ensure a coherent layout as described above.

### Example
For example:
- A \`standardAreaNode\` may represent "Data Security Standards" and contain text blocks like:
  - "Encryption protocols for data in transit."
  - "Access control mechanisms for sensitive data."
- A corresponding \`guidelineAreaNode\` may represent "Data Security Guidelines" and contain text blocks like:
  - "Use AES-256 encryption for data transmission."
  - "Implement role-based access control (RBAC)."

### Example JSON Schema
Provide a complete example of a JSON schema with placeholder data to demonstrate the required structure, relationships, and layout for the artifact.


\`\`\`json
{
  "nodes": [
    {
      "id": "standardAreaNode1",
      "type": "standardAreaNode",
      "position": {
        "x": 300,
        "y": 50
      },
      "data": {
        "id": "standardAreaNode1",
        "type": "standardAreaNode",
        "position": {
          "x": 300,
          "y": 50
        },
        "label": "Data Security Standards",
        "width": 200,
        "height": 150,
        "color": "#1d4ed8",
        "borderColor": "#1e3a8a",
        "zIndex": 900,
        "icon": ""
      }
    },
    {
      "id": "guidelineAreaNode2",
      "type": "guidelineAreaNode",
      "position": {
        "x": 600,
        "y": 50
      },
      "data": {
        "id": "guidelineAreaNode2",
        "type": "guidelineAreaNode",
        "position": {
          "x": 600,
          "y": 50
        },
        "label": "Data Security Guidelines",
        "width": 200,
        "height": 150,
        "color": "#a855f7",
        "borderColor": "#581c87",
        "zIndex": 900,
        "icon": ""
      }
    },
    {
      "id": "standardTextBlockNode3",
      "type": "standardTextBlockNode",
      "position": {
        "x": 320,
        "y": 75
      },
      "data": {
        "id": "standardTextBlockNode3",
        "type": "standardTextBlockNode",
        "position": {
          "x": 320,
          "y": 75
        },
        "label": "Encryption protocols",
        "width": 180,
        "height": 80,
        "color": "#2563eb",
        "borderColor": "#1e40af",
        "zIndex": 1000,
        "icon": "",
        "customData": {
          "textBlock": "Encryption protocols for data in transit."
        }
      }
    },
    {
      "id": "standardTextBlockNode4",
      "type": "standardTextBlockNode",
      "position": {
        "x": 320,
        "y": 175
      },
      "data": {
        "id": "standardTextBlockNode4",
        "type": "standardTextBlockNode",
        "position": {
          "x": 320,
          "y": 175
        },
        "label": "Access control mechanisms",
        "width": 180,
        "height": 80,
        "color": "#2563eb",
        "borderColor": "#1e40af",
        "zIndex": 1000,
        "icon": "",
        "customData": {
          "textBlock": "Access control mechanisms for sensitive data."
        }
      }
    },
    {
      "id": "guidelineTextBlockNode5",
      "type": "guidelineTextBlockNode",
      "position": {
        "x": 620,
        "y": 75
      },
      "data": {
        "id": "guidelineTextBlockNode5",
        "type": "guidelineTextBlockNode",
        "position": {
          "x": 620,
          "y": 75
        },
        "label": "AES-256 Encryption",
        "width": 180,
        "height": 80,
        "color": "#9333ea",
        "borderColor": "#6b21a8",
        "zIndex": 1000,
        "icon": "",
        "customData": {
          "textBlock": "Use AES-256 encryption for data transmission."
        }
      }
    },
    {
      "id": "guidelineTextBlockNode6",
      "type": "guidelineTextBlockNode",
      "position": {
        "x": 620,
        "y": 175
      },
      "data": {
        "id": "guidelineTextBlockNode6",
        "type": "guidelineTextBlockNode",
        "position": {
          "x": 620,
          "y": 175
        },
        "label": "RBAC Implementation",
        "width": 180,
        "height": 80,
        "color": "#9333ea",
        "borderColor": "#6b21a8",
        "zIndex": 1000,
        "icon": "",
        "customData": {
          "textBlock": "Implement role-based access control (RBAC)."
        }
      }
    }
  ],
  "edges": []
}

 \`\`\`
### Notes
The output must be modular, adaptable, and fully compatible with React Flow 12. Use sample data to represent the company's name, mission, vision, description, and strategic objectives.

Please generate the JSON schema for this artifact based on the given requirements.
`;
