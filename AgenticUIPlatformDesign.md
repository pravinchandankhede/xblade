# Agentic UI Platform: Design Conversation Summary

## 1. Inspiration & Goals

- Inspired by Azure Template Specs and Blade UI Framework.
- Goal: Build a reusable, extensible, declarative UI spec system for code/no-code agentic development.
- Support for all HTML elements, actions/behaviors, styling, navigation, and layout.

---

## 2. Spec Language Decision

- Chose JSON for the spec language for interoperability, tooling, and validation.
- Considered DSL for expressiveness, but opted for JSON for now.

---

## 3. Proposed JSON Spec Structure

### Top-Level Structure

```json
{
  "version": "1.0",
  "meta": { "name": "EntityUI", "description": "...", "author": "..." },
  "layout": { "type": "flex|grid|stack|custom", "props": {} },
  "styles": { "global": {}, "local": {} },
  "navigation": [ /* routes, tabs, wizards */ ],
  "components": [
    {
      "id": "comp1",
      "type": "input|button|custom",
      "element": "input|select|button|custom",
      "props": {},
      "styles": {},
      "actions": [ /* event-driven logic */ ],
      "children": [ /* nested components */ ]
    }
    // ...more components
  ]
}
```

---

## 4. Event Logic (e.g., onClick)

- Actions array for each component.
- Built-in actions: `"type": "submit"`, `"type": "navigate"`, etc.
- Custom logic: `"type": "custom"`, `"handler": "functionName"`.
- Advanced: `"type": "expression"`, `"script": "..."`.

---

## 5. Required Framework Components

- **Angular** for dynamic rendering and event binding.
- **Spec Parser**: Reads and validates JSON spec.
- **Dynamic Renderer**: Maps spec to Angular components.
- **Component Library**: Reusable UI elements.
- **Action Handler Service**: Executes actions, maps custom handlers.
- **Style Manager**: Applies styles.
- **Navigation Manager**: Handles routes/tabs.
- **Layout Manager**: Arranges components.

---

## 6. Entity Example: Agent

- Properties: `id`, `name`, `role`, `status`, etc.
- UI Spec defines:
  - List view (table/cards)
  - Create/Edit form
  - Delete button/dialog

### Process

1. Define JSON spec for Agent UI.
2. Parse and validate spec.
3. Render UI dynamically.
4. Bind actions to backend (create, update, delete).
5. Apply styles and layout.
6. Handle navigation.

---

## 7. Backend Touch Points

- **List Agents**: `GET /api/agents`
- **Get Agent**: `GET /api/agents/{id}`
- **Create Agent**: `POST /api/agents`
- **Update Agent**: `PUT/PATCH /api/agents/{id}`
- **Delete Agent**: `DELETE /api/agents/{id}`
- **Validation, custom actions, auth, error handling, file uploads/downloads (optional)**

---

## 8. Next Steps

- Use this documentation to scaffold your Angular services, components, and JSON spec structure.
- Implement the Spec Parser, Dynamic Renderer, and Action Handler Service.
- Map UI actions to backend endpoints as per the spec.

---

## 9. Blade Architecture for Multiple Technologies

### Goal

Support blades (UI components/pages) defined in JSON spec, plain JavaScript, React, or Knockout.js, in addition to Angular.

### Blade Registry

- Maintain a registry of blades with metadata: name, type (json, js, react, knockout), entry point, props.

### Dynamic Loader Component (Angular)

- Create a `BladeLoaderComponent` that receives blade metadata and loads the appropriate blade.

#### Loading Strategies

- **JSON Spec Blades:** Use Angular dynamic renderer to parse and render.
- **Plain JavaScript Blades:** Use dynamic import or script injection to load JS, attach rendered DOM to Angular view using `ElementRef` and `Renderer2`.
- **React Blades:** Use a wrapper Angular component to mount React components via `ReactDOM.render` into a container div, passing props from Angular.
- **Knockout Blades:** Use a wrapper Angular component to initialize Knockout bindings on a container div.

#### Example Blade Registry Entry

```json
{
  "name": "AgentListBlade",
  "type": "react",
  "entry": "./blades/AgentList.jsx",
  "props": { "entity": "Agent" }
}
```

#### Example Loader Component (Angular)

```typescript
@Component({
  selector: 'app-blade-loader',
  template: '<div #bladeContainer></div>'
})
export class BladeLoaderComponent implements OnInit {
  @Input() bladeMeta: BladeMeta;
  @ViewChild('bladeContainer', { static: true }) container: ElementRef;

  ngOnInit() {
    switch (this.bladeMeta.type) {
      case 'json':
        // Use Angular dynamic renderer
        break;
      case 'js':
        // Dynamically import and execute JS, attach to container
        break;
      case 'react':
        // Use ReactDOM.render to mount React component in container
        break;
      case 'knockout':
        // Initialize Knockout bindings in container
        break;
    }
  }
}
```

### Security & Lifecycle

- Sanitize and validate external code before loading.
- Clean up resources (unmount React, dispose Knockout) on component destroy.

### Benefits

- Maximum flexibility for developers/designers.
- Extensible to new blade types.
- Supports both code and no-code approaches.

### Challenges

- Security and sandboxing for arbitrary JS.
- Consistent UX across blade types.
- Standardizing data and event interfaces.

---

Let me know if you want help generating code or structure from this documentation!
