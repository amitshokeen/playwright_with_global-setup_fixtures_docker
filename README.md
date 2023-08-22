# Playwright with global-setup (for one time login), POM, fixtures and Docker

The purpose of this project is to demonstrate some useful features of **Playwright** along with **dockerizing** the code and serving the HTML playwright-report with the help of a custom server.
## The dockerizing approach is as follows:
- The **playwright** project (**pw-narratives-qa**) is dockerized using a **Dockerfile**.
> The docker-compose.yml file present in the pw-narratives-qa is actually not needed. It was used for initial tests/learning.
- The **my-report-server** is separate from the playwright project and that too is dockerized using a **Dockerfile**
> The docker-compose111.yml111 file inside the my-report-server can be ignored as it was just used for intial tests/learning.
- The main project root has a **docker-compose.yml** file that uses two **services** (**pwnarrativesqa** and **my-report-server**) and a **volume** named **my-volume**
- The service named **pwnarrativesqa** will spin up a container where the Playwright tests will run. After the tests are over, the **playwright-report**, which is mapped to **my-volume**, will let the **index.html** report file be available to **my-volume**.
- The service named **my-report-server** is an ordinary html file server and listens on port 8080. The **my-volume** is mapped to **/report** on this container. Therefore, as soon as the **index.html** report is available inside the **my-volume**, it will be available to the server & will be served on **localhost:8080**
- To run the project, use **docker-compose up** on the main project root.
- You can see all the fun with both the containers happen on your **Docker desktop**.
- To see the report, open any browser and navigate to http://localhost:8080
## What's so special in the Playwright project?
- **Authentication** approach takes inspiration from https://playwright.dev/docs/auth - Basic: shared account in all tests
> The root of **pw-narratives-qa** has **global-setup.ts** file. This code launches a chromium browser and attempts to login to the site. It stores the page context (cookies, local storage etc.) in a **loginAuth.json** file. 
>The corresponding configs in the **playwright.config.ts** file are: **globalSetup: "./global-setup.ts"** and **use: {storageState: "./loginAuth.json"}**
>This approach enables reuse of the authenticated browser state for all tests & so tests need not login in each time separately. Read the doc page mentioned above for trade-offs.
- Use of **Fixtures** for the **Page Object Model**
>Notice the **import { test } from  '../pages/fixtures/basePage'** stmt. in the **ts** files under the **pq-narratives-qa/tests** folder. 
>This lets the main test be neat and allows for a professional POM approach to arranging tests as per pages.  
>The pages are instantiated in the **pw-narratives-qa/pages/fixtures/basePage.ts** file.
>The test functions of each page live here **pw-narratives-qa/pages/**