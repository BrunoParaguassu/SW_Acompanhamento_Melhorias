const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Caminho para o executável do Electron
const electronPath = path.join(__dirname, 'node_modules', 'electron', 'dist');
const resourcesPath = path.join('dist_electron', 'resources');

// Cria pasta resources se não existir
if (!fs.existsSync(resourcesPath)) {
    fs.mkdirSync(resourcesPath, { recursive: true });
}

// Copia a pasta app para resources
fs.copySync('dist_electron', path.join(resourcesPath, 'app'));

// Copia os arquivos do Electron
fs.copySync(electronPath, 'dist_electron', {
    filter: (src) => {
        return path.extname(src) === '.exe' || path.extname(src) === '.dll';
    }
});

// Renomeia o electron.exe para o nome do seu app
fs.renameSync(
    path.join('dist_electron', 'electron.exe'),
    path.join('dist_electron', 'SW_Graficos.exe')
);
