import * as vscode from 'vscode';

let terminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.runNodeScript', (uri: vscode.Uri) => {
        const filePath = uri ? uri.fsPath : vscode.window.activeTextEditor?.document.fileName;

        if (!filePath) {
            vscode.window.showErrorMessage('No file selected to run.');
            return;
        }

        if (!terminal) {
            terminal = vscode.window.createTerminal('node');
            terminal.show();

            vscode.window.onDidCloseTerminal((closedTerminal) => {
                if (closedTerminal === terminal) {
                    terminal = undefined;
                }
            });
        }

        terminal.show();
        terminal.sendText(`node "${filePath}"`);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    if (terminal) {
        terminal.dispose();
    }
}
