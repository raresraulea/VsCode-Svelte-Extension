import * as vscode from 'vscode';

const KEY = 'token';

export class TokenManager {
    static globalState: vscode.Memento;

    static setToken(token: string) {
        this.globalState.update(KEY, token);
    }

    static getToken(): string | undefined {
        return this.globalState.get(KEY);
    }
}