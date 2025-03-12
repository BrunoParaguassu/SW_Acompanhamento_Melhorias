import Papa from 'papaparse';

// Mapeamento das colunas do arquivo
const columnMapping = {
  'item': 'Item',
  'data': 'Data',
  'processo': 'Processo',
  'produto': 'Produto',
  'responsavel': 'Responsável',
  'status': 'Status',
  'tv': 'TV',
  'uph antigo': 'UPH Antigo',
  'hc antigo': 'HC Antigo',
  'tp antigo': 'TP Antigo',
  'uph novo': 'UPH Novo',
  'hc novo': 'HC Novo',
  'tp novo': 'TP Novo',
  'upph antigo': 'UPPH Antigo',
  'upph novo': 'UPPH Novo',
  'custo antigo': 'Custo Antigo',
  'custo novo': 'Custo Novo',
  'ganho por peca': 'GANHO Por Peça',
  'produtividade': 'Produtividade',
  'melhoria custo': '% Melhoria Custo',
  'mes implementacao': 'Mês Implementação'
};

// Limpa o nome da coluna para comparação
const cleanColumnName = (name) => {
  if (!name) return '';
  return name.toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')  // Remove espaços extras
    .replace(/[\r\n]+/g, '') // Remove quebras de linha
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s]/g, ''); // Remove caracteres especiais
};

// Função para limpar e converter número
const parseMonetaryValue = (value) => {
  if (!value || typeof value !== 'string') return 0;
  // Remove R$, espaços e converte vírgula para ponto
  const cleanValue = value.replace(/[R$\s.]/g, '').replace(',', '.');
  const number = parseFloat(cleanValue);
  return isNaN(number) ? 0 : number;
};

const parsePercentage = (value) => {
  if (!value || typeof value !== 'string') return 0;
  // Remove % e converte vírgula para ponto
  const cleanValue = value.replace('%', '').trim().replace(',', '.');
  const number = parseFloat(cleanValue);
  return isNaN(number) ? 0 : number;
};

const parseNumber = (value) => {
  if (!value || typeof value === 'number') return value || 0;
  // Converte vírgula para ponto
  const cleanValue = String(value).replace(',', '.');
  const number = parseFloat(cleanValue);
  return isNaN(number) ? 0 : number;
};

// Função auxiliar para garantir que o valor seja um número
export const ensureNumber = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  const num = typeof value === 'string' ? Number(value.replace(',', '.')) : Number(value);
  return isNaN(num) ? 0 : num;
};

// Função auxiliar para formatar números com segurança
export const safeNumberFormat = (value, decimals = 2) => {
  const num = ensureNumber(value);
  return num.toFixed(decimals);
};

// Transforma os dados do CSV para o formato da aplicação
const transformData = (data) => {
  return data.map(row => {
    // Converte a data para o formato DD/MM/YYYY
    const [day, month, year] = (row.Data || '').split('/');
    const formattedDate = day && month && year ? `${day}/${month}/${year}` : '';

    return {
      Item: row.Item || '',
      Data: formattedDate,
      Mês: row.Mês || '',
      Business: row.Business || '',
      Produto: row.Produto || '',
      Responsável: row.Responsável || '',
      Status: row.Status || '',
      Revisão: row.Revisão || '',
      Familia: row.Familia || '',
      'UPH Antigo': parseNumber(row['UPH Antigo']) || 0,
      'HC Antigo': parseNumber(row['HC Antigo']) || 0,
      'TP Antigo': parseNumber(row['TP Antigo']) || 0,
      'Custo Antigo': parseMonetaryValue(row['Custo Antigo']),
      'UPPH Antigo': parseNumber(row['UPPH Antigo']) || 0,
      'UPH Novo': parseNumber(row['UPH Novo']) || 0,
      'HC Novo': parseNumber(row['HC Novo']) || 0,
      'TP Novo': parseNumber(row['TP Novo']) || 0,
      'Custo Novo': parseMonetaryValue(row['Custo Novo']),
      'UPPH Novo': parseNumber(row['UPPH Novo']) || 0,
      'GANHO Por Peça': parseMonetaryValue(row['GANHO Por Peça']),
      'Produtividade': parsePercentage(row['Produtividade']),
      '% Melhoria Custo': parsePercentage(row['% Melhoria Custo']),
      'Mês Implementação': row['Mês Implementação'] || '',
      'REDUÇÃO HC': parseNumber(row['REDUÇÃO HC']) || 0,
      'DESCRIÇÃO': row['DESCRIÇÃO'] || '',
      'SAVING/Ganho ANUAL': parseMonetaryValue(row['SAVING/Ganho ANUAL']),
      'INVESTIMENTO': parseMonetaryValue(row['INVESTIMENTO']),
      'PAYBACK (MESES)': parseNumber(row['PAYBACK (MESES)']) || 0,
      'CUSTO HC': parseMonetaryValue(row['CUSTO HC'])
    };
  });
};

const processCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        // Remove espaços extras e mantém o header original
        return header.trim();
      },
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error('Erros ao processar CSV:', results.errors);
        }

        if (results.meta.fields.length !== new Set(results.meta.fields).size) {
          console.warn('Duplicate headers found and renamed.');
        }

        console.log('Dados brutos:', results.data);
        const transformedData = transformData(results.data);
        console.log('Dados transformados:', transformedData);
        resolve(transformedData);
      },
      error: (error) => {
        console.error('Erro ao processar arquivo:', error);
        reject(error);
      }
    });
  });
};

export const saveDataToLocalStorage = (data) => {
  try {
    const csv = Papa.unparse(data);
    localStorage.setItem('dashboardData', csv);
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    throw new Error(`Falha ao salvar dados: ${error.message}`);
  }
}

export const downloadCSV = (data) => {
  try {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'dashboard_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Erro ao baixar CSV:', error);
    throw new Error(`Falha ao baixar CSV: ${error.message}`);
  }
}

export const loadDataFromCSV = () => {
  try {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
      const results = Papa.parse(savedData, {
        header: true,
        skipEmptyLines: true
      });
      
      if (results.errors.length > 0) {
        console.warn('Avisos ao analisar CSV:', results.errors);
      }
      
      return transformData(results.data);
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    throw new Error(`Falha ao carregar dados: ${error.message}`);
  }
}

export const importCSVFile = (file) => {
  return processCSV(file);
}