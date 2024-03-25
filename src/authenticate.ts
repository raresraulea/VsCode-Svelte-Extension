import * as vscode from 'vscode';
import { apiBaseUrl } from './constants';
import polka from 'polka';
import { TokenManager } from './TokenManager';

export const authenticate = (callbackAfterAuth?: () => void) => {
    const app = polka();

    app.get('/auth/:token', async (req, res) => {
        const { token } = req.params;

        if(!token) {
            res.end('<h1>No token</h1>');
            return;
        }

        await TokenManager.setToken(token);
        callbackAfterAuth?.();

        console.log('Token:', TokenManager.getToken());

        res.end(`<h1>Auth was successful, you can close this now.</h1>`);

        setTimeout(() => {
            app.server?.close();
        }, 3000);
    });

    app.listen(54321, (err: any) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Server is running on http://localhost:54321');
    });

    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(`${apiBaseUrl}/auth/github`));
}