VSCode Extension APIs

1. Register, Activate, Invoke commands
2. Await commands response => Act based on that
3. Debug console shows the extension’s node process output and logs
4. Compile extension with webpack + watch mode
5. Create New WebviewTab (Tab)
    1. Rendering custom HTML
    2. Loading custom CSS
    3. Running custom JS scripts
6. Inject Svelte into the body => use svelte to create VSCode extension UIs
    1. Compile extension with webpack => generates prod bundle inside dist/
    2. Concurrently compile svelte with rollup => generates prod bundle inside out/compiled/
    3. [IDEA]: Why not create portable Svelte components that can be used in the VSCode extension and in the Web App hydrated by the C# backend?
7. Create refresh command
    1. Automatically/programatically restarting a WebView
    2. Automatically/programatically open WebView Developer Tools
    3. Keybind Alt + R to run this “refresh” command
    4. Result: change svelte components => press alt + R => refresh webview, open dev console
8. Add sidebar view
    1. Custom icon, title, category etc
    2. Hotkey for automatically reloading sidebar with new compiled svelte components and new CSS
    3. Add Svelte Todo list inside the sidebar
9. Use VSCode APIs in Svelte: inject tsvscode APIs globally
    1. Inject it through the sidebar providers script
    2. declare it as a globally available variable through a TS declaration file which also needs to import * from vscode (?)
10. Send data from Svelte components to the Sidebar provider
    1. post Info messages that the sidebar provider listens for
    2. post Error messages that the sidebar provider listens for
11. Send data from text editor (webview) inside the sidebar
    1. Register new command
    2. The command accesses the active text editor and it’s selection (selected text)
    3. The extension (through the command) posts a message to the sidebarProvider._view?.webview
    4. The sidebar svelte component adds an event listener on mount for receiving info;
    5. The component handles incoming todos from the extension
12. Execute command on click of a status bar item (bottom VScode menu)
13. Create an Express API for GitHub authentication
    1. Create GitHub auth endpoint
    2. Create successful auth return endpoint
    3. Use passport and passport GitHub for the GitHub authentication process
    4. Use JsonWenToken for auth token generation
    5. Connect to a PostgreSQL database and create the user entity
    6. Return data about the current user based on the auth header
    7. Use TypeORM as an ORM
    8. Llibraries used: dotenv-safe, express, jsonwebtoken, nodemon, pg, reflect-metadata. typeorm
14. Create a polka API
    1. Runs during the authentication process
    2. Exposes a callback endpoint where the token is received from the express API after successful authentication
    3. The callback endpoint stores the authentication token using a TokenManager
15. Svelte sidebar fetch authenticated user details
