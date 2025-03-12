const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Limpa diretórios anteriores
fs.removeSync('dist_electron');

// Cria diretório de distribuição
fs.mkdirSync('dist_electron');

// Copia arquivos necessários
fs.copySync('dist', path.join('dist_electron', 'dist'));
fs.copySync('electron', path.join('dist_electron', 'electron'));
fs.copySync('package.json', path.join('dist_electron', 'package.json'));

// Instala dependências de produção
execSync('npm install --production', { 
  cwd: 'dist_electron',
  stdio: 'inherit'
});
