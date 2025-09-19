# Xbladeshell

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## 🚀 Live Demo

The application is hosted on Azure Static Web Apps and can be accessed at:

**Live URL:** [https://salmon-ocean-0fa567f00.azurestaticapps.net](https://salmon-ocean-0fa567f00.azurestaticapps.net)

## Features

### Sample Component
The application includes a comprehensive **Sample Component** that demonstrates:
- Loading UI elements from `elements.json` via API call
- Displaying 23+ different UI element types with their properties
- Organizing elements by categories (inputs, display, containers, data, actions)
- Responsive design with loading states and error handling
- Navigation available at `/sample` route

To view the sample component, visit: [https://salmon-ocean-0fa567f00.azurestaticapps.net/sample](https://salmon-ocean-0fa567f00.azurestaticapps.net/sample)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 🚀 Deployment

The application is automatically deployed to Azure Static Web Apps using GitHub Actions. The deployment workflow:

1. **Triggers**: Runs on push to `main` branch and pull requests
2. **Build Process**: Uses Node.js 20.x to build the Angular application
3. **Deployment**: Automatically deploys to Azure Static Web Apps
4. **Live URL**: [https://salmon-ocean-0fa567f00.azurestaticapps.net](https://salmon-ocean-0fa567f00.azurestaticapps.net)

### Deployment Configuration

The deployment is configured in `.github/workflows/azure-static-web-apps-salmon-ocean-0fa567f00.yml` and includes:
- Automated builds on code changes
- Deployment to Azure Static Web Apps
- Production-optimized builds for performance

To view the deployment status, check the [Actions tab](https://github.com/pravinchandankhede/xblade/actions) in the GitHub repository.
