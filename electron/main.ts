import { app, BrowserWindow, session } from "electron";
import path from "node:path";

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.webContents.openDevTools();

  // 🚀 Define a política de segurança no Electron
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
        ],
      },
    });
  });

  // Carregar o React buildado
  mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
