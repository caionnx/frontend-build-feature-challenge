# Frontend build feature challenge
### [👉 Go to the challenge 👈](./CHALLENGE.md)

### 🚀 See the feature in action 🚀


For extra documentation on the development experience and how to test/lint/formatting and bundle the component, please refer to `installments-component/README.MD`

## Engineering choices
- Web Component was the main technology of choice to develop such feature
    - Based on the scope of the module this was the best option due to the unknown nature of the merchant's site implementation.
    - With a web component we are not bound to a specific framework and we can keep a very small footprint on the merchant's web applications.
    - Integration comes easily as web components are supported in all major frameworks (we could build a react wrapper with Lit). https://custom-elements-everywhere.com/
    - We can scope all of our styling and logic in a specific place and grow in features in the future.
- Lit was a choice of library to develop such a web component.
    - Due to time constraints this seems to be a pertinent choice and using the starter kit we kick off with an environment for development using  Typescript, Unit Testing, and a small server of our generated files.
    - This took off a good chunk of time we would have spent on setting up the project.
    - With such a choice the development experience also benefitted from linting and formatting which are aspects very important when developing components.
- Lit task package was also added to handle fetching data robustly:
    - It gives us the ability to easily handle different states of a fetching task: pending, error, success, etc.
    - It also deals with racing conditions, it will take care of such scenarios and abort fetch requests using the signal approach.
- The main drawback of the web component as the base for our component is on the server side as we may not be able to render content in such a scenario, leading to a different approach/responsibility on the merchant side to avoid visual jumps on the client side rendering (and CLS).
- The visual aspect of the prototype was not my focus.

## Future Improvements
- Add localization. (Lit also has a library for this).
- Investigate approaches for rendering the component on the server side or approaches to mitigate visual jumps.
- Styling improvements.
- Improve component documentation and set up GitHub pages for easier integration on merchants' websites.

## Distributing this prototype to all our merchants
We can distribute our component using NPM as any other package. This way merchants can easily import the component in they're on applications and handle optimizations by themselves. Additionally, a build of our component can be available in a CDN for merchants that do not have a build system in place leveraging the component with a simple script tag directly into their HTML pages.
## Testing component integration on the merchant's product page
- Build our web component:
    - Go to `installments-component` component folder.
    - Install dependencies with `npm i`
    - Build it with `npm run build`
- Start the API serve:
    - Go to `api` folder
    - Install dependencies with `npm i`
    - Start the server with `npm run start`
- A simple web dev server was set on the root of the zip file to serve the merchant website
    - On the root directory install dependencies: `npm i`
    - Serve with `npm run start`
    - On the browser go to `http://localhost:8000/merchant-site/product-page.html`
    - Interacting with the product capacity will trigger an update on our component.