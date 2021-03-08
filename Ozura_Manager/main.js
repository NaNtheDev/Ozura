const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: screen.getPrimaryDisplay().bounds.width,
    height: screen.getPrimaryDisplay().bounds.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      allowDisplayingInsecureContent: true
    },
    icon: `${__dirname}/icon.png`
  });

  mainWindow.loadURL('http://localhost:2004')
  mainWindow.loadFile('./web/index.html');
  mainWindow.setMenuBarVisibility(false);
  mainWindow.maximize()
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});