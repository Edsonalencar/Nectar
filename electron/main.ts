import { app, BrowserWindow } from "electron";
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
