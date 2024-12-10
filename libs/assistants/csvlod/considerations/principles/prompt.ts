export const task = `
I am developing an application that generates Enterprise Architecture artifacts using React Flow 12. The task is to create an artifact called "Principles" for the "Considerations" dimension of the CSVLOD framework. This artifact must be constructed as a JSON schema for React Flow 12 and adhere to the following requirements:

### Context
The "Principles" artifact documents the fundamental guidelines and beliefs that drive decision-making within the organization's architecture. It serves as a reference to ensure that all architectural efforts align with the company's values, mission, vision, and strategic objectives. The input parameters for this artifact include:
- **Company Name** : {{companyName}}
- **Mission** : {{mission}}
- **Vision** : {{vision}}
- **Description** : {{description}}
- **Strategic Objectives** : {{objectives}}

### Node Configuration
The artifact must be constructed **without edges**, using only nodes. The available node type is:
- \`principleTitleAndItemsNode\`: Represents a principle with a title, description and a list of related items. The items represent in order: Statement, reason and implications of the principle

### Layout Rules
1. Nodes must be displayed **vertically, one below the other**, forming a structured list.
2. Each \`principleTitleAndItemsNode\` should contain:
   - A **title** to represent the name of the principle.
   - A **description** that provides a brief overview of the principle.
   - A list of **items** that describe the specific aspects or actions related to the principle.

### Output Format
Generate a JSON schema for React Flow 12 that:
- Defines one or more \`principleTitleAndItemsNode\` nodes, each representing a principle.
- Positions the nodes in a vertical list to maintain a coherent and professional layout.
- Provides placeholder data for titles and items based on the input parameters (e.g., mission, vision, and strategic objectives).

### Example
For example, if a principle is "Customer-Centricity," its node might include:
- **Title:** "Customer-Centricity"
- **Description:** "Place the customer at the center of all decisions."
- **Items:** 
  1. "Prioritize customer needs in all solutions."
  2. "Continuously improve the user experience."
  3. "Foster transparent communication with customers."

### Example JSON Schema

\`\`\`json
{
  "nodes": [
    {
      "id": "principleTitleAndItemsNode1",
      "type": "principleTitleAndItemsNode",
      "position": {
        "x": 250,
        "y": 25
      },
      "data": {
        "id": "principleTitleAndItemsNode1",
        "type": "principleTitleAndItemsNode",
        "position": {
          "x": 250,
          "y": 25
        },
        "label": "Principle Text Block",
        "width": 200,
        "height": 350,
        "color": "#2563eb",
        "borderColor": "#1e40af",
        "zIndex": 1000,
        "icon": "",
        "customData": {
          "title": "Innovation-Driven",
          "description": "Guidelines to foster innovation across the organization.",
          "items": [
            {
              "id": "1",
              "title": "Declaration",
              "type": "TextArea",
              "value": "Encourage creativity and new ideas in all projects."
            },
            {
              "id": "2",
              "title": "Reason",
              "type": "TextArea",
              "value": "Innovation drives competitiveness and long-term growth."
            },
            {
              "id": "3",
              "title": "Implications",
              "type": "TextArea",
              "value": "Invest in R&D and maintain an adaptive organizational culture."
            }
          ]
        }
      }
    },
    {
      "id": "principleTitleAndItemsNode2",
      "type": "principleTitleAndItemsNode",
      "position": {
        "x": 250,
        "y": 400
      },
      "data": {
        "id": "principleTitleAndItemsNode2",
        "type": "principleTitleAndItemsNode",
        "position": {
          "x": 250,
          "y": 400
        },
        "label": "Principle Text Block",
        "width": 200,
        "height": 350,
        "color": "#facc15",
        "borderColor": "#ca8a04",
        "zIndex": 1000,
        "icon": "",
        "customData": {
          "title": "Customer-Centricity",
          "description": "Principles focused on prioritizing customer satisfaction.",
          "items": [
            {
              "id": "1",
              "title": "Declaration",
              "type": "TextArea",
              "value": "Place customer needs at the forefront of decisions."
            },
            {
              "id": "2",
              "title": "Reason",
              "type": "TextArea",
              "value": "Satisfied customers drive loyalty and positive brand reputation."
            },
            {
              "id": "3",
              "title": "Implications",
              "type": "TextArea",
              "value": "Ensure continuous improvement of customer experience."
            }
          ]
        }
      }
    }
  ],
  "edges": []
}
 \`\`\`
### Notes
The output must be clear, modular, and fully compatible with React Flow 12. Use sample data to demonstrate the structure and layout of the artifact.

Please generate the JSON schema for this artifact based on the given requirements.
`;