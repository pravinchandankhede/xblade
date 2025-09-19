# Sample Component

The Sample Component demonstrates how to load and display elements from the `elements.json` file through an API call.

## Features

- Loads elements data via HTTP service
- Displays elements organized by categories
- Shows all element properties and types
- Provides both categorized and flat view options
- Includes loading states and error handling
- Responsive design

## Structure

### Service (ElementsService)
- `loadElements()`: Makes HTTP GET request to load elements.json
- Defines TypeScript interfaces for type safety
- Located in `src/app/services/elements.service.ts`

### Component (SampleComponent)
- Displays all supported elements from the JSON file
- Organizes elements by categories (inputs, display, containers, data, actions)
- Shows element properties and descriptions
- Includes refresh functionality
- Located in `src/app/sample/`

## Usage

Navigate to `/sample` to view the component, or use the "Sample Elements" link in the navigation header.

## Data Source

The component loads data from `src/assets/json/elements.json`, which contains:
- `supportedElements`: Array of all available UI elements
- `elementCategories`: Organization of elements by functionality
- `commonProperties`: Properties shared across all elements

## API Structure

Each element in the JSON has:
- `type`: Unique identifier for the element
- `displayName`: Human-readable name
- `description`: Element description
- `properties`: Object containing element-specific properties and their types

## Navigation

The component is integrated into the main application routing:
- Route: `/sample`
- Navigation available in the header component