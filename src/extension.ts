import * as vscode from 'vscode';
import * as path from 'path';

let terminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.runNodeScript', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const fileName = path.basename(document.fileName); // Get only the file name

            if (terminal) {
                terminal.dispose();
            }

            terminal = vscode.window.createTerminal(`Node.js: ${filePath}`);
            terminal.show();
            terminal.sendText(`node ${fileName}`);
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
