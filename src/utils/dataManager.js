import Papa from 'papaparse';

export const saveDataToLocalStorage = (data) => {
  const csv = Papa.unparse(data);
  localStorage.setItem('dashboardData', csv);
}

export const downloadCSV = (data) => {
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
  }
}

export const loadDataFromCSV = () => {
  const savedData = localStorage.getItem('dashboardData');
  if (savedData) {
    const results = Papa.parse(savedData, {
      header: true,
      dynamicTyping: true
    });
    return results.data;
  }
  return [];
}

export const importCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.data) {
          localStorage.setItem('dashboardData', Papa.unparse(results.data));
          resolve(results.data);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}
