const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: "./public/icon.ico", // Asegúrate de tener un icono en esta ruta
    webPreferences: {
      nodeIntegration: false, // Seguridad recomendada
    },
  });

  // Cargar la aplicación en GitHub Pages
  win.loadURL("https://MoNRaSpGit.github.io/Oriol");

  // Evitar que los usuarios abran la consola de desarrollador
  win.setMenu(null);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
