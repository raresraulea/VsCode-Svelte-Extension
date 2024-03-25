// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './HellowWorldPanel';
import { SidebarProvider } from './SidebarProvider';
import { authenticate } from './authenticate';
import { TokenManager } from './TokenManager';

export function activate(context: vscode.ExtensionContext) {

	TokenManager.globalState = context.globalState;
	vscode.window.showInformationMessage("Token: " + TokenManager.getToken());

	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	item.text = "$(beaker) Add Todo";
	item.command = "vstodo.addTodo";
	item.show();

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"vstodo-sidebar",
		sidebarProvider
		)
	); 

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.helloWorld', () => {
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.authenticate', () => {
			authenticate();
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.addTodo', () => {
			const { activeTextEditor } = vscode.window;
			if (!activeTextEditor) {
				vscode.window.showInformationMessage("No active text editor");
				return;
			}

			const text = activeTextEditor.document.getText(activeTextEditor.selection);

			sidebarProvider._view?.webview.postMessage({
				type: 'new-todo',
				value: text
			});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.refresh', () => {
			// Uncomment if reusing it
			// HelloWorldPanel.kill();
			// HelloWorldPanel.createOrShow(context.extensionUri);

			vscode.commands.executeCommand("workbench.action.closeSidebar");

			vscode.commands.executeCommand("workbench.view.extension.vstodo-sidebar-view");

			// Uncomment if reusing it
			// setTimeout(() => {
			// 	vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools');
			// }, 100);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vstodo.askQuestion', () => {
			vscode.window.showInformationMessage('How was your day?', 'Good', 'Bad').then((response) => {
					if (response === 'Good') {
						vscode.window.showInformationMessage('That\'s great to hear!');
					} else if (response === 'Bad') {
						vscode.window.showInformationMessage('I hope it gets better!');
					}
				}
			);
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
