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

  // 🚀 Verificar caminho do `index.html`
  const indexPath = path.join(__dirname, "../../dist/index.html");
  console.log("Carregando arquivo:", indexPath);

  // 🚀 Interceptar navegação para garantir que o BrowserRouter funcione no Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    mainWindow?.loadURL(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("file://")) {
      event.preventDefault();
      const newUrl = path.join(__dirname, indexPath);
      mainWindow?.loadFile(newUrl);
    }
  });

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

  // 🚀 Tentar carregar o frontend
  mainWindow.loadFile(indexPath).catch((err) => {
    console.error("Erro ao carregar o frontend:", err);
  });

  // 🚀 Forçar recarregamento se o frontend falhar
  mainWindow.webContents.on("did-fail-load", () => {
    console.log("Falha ao carregar o frontend, recarregando...");
    mainWindow?.webContents.reload();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
