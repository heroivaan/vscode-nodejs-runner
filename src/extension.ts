import * as vscode from 'vscode';

let terminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.runNodeScript', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const filePath = document.fileName;

            if (terminal) {
                terminal.dispose();
            }

            terminal = vscode.window.createTerminal(`Node.js: ${filePath}`);
            terminal.show();
            terminal.sendText(`node ${filePath}`);
        } else {
            vscode.window.showErrorMessage('No active editor found');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    if (terminal) {
        terminal.dispose();
    }
}
