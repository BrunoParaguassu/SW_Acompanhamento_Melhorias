import { useState, useEffect, useRef } from 'react'
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  ThemeProvider,
  createTheme,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  LineChart, 
  Line,
  ResponsiveContainer,
  Cell,
  LabelList,
  ComposedChart
} from 'recharts'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import UploadIcon from '@mui/icons-material/Upload'
import { 
  loadDataFromCSV, 
  importCSVFile, 
  saveDataToLocalStorage, 
  downloadCSV 
} from './utils/dataManager'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    }
  }
})

const initialFormState = {
  Item: '',
  Data: '',
  Mês: '',
  Business: '',
  Produto: '',
  Responsável: '',
  Status: '',
  Revisão: '',
  Familia: '',
  'UPH Antigo': '',
  'HC Antigo': '',
  'TP Antigo': '',
  'Custo Antigo': '',
  'UPPH Antigo': '',
  'UPH Novo': '',
  'HC Novo': '',
  'TP Novo': '',
  'Custo Novo': '',
  'UPPH Novo': '',
  'GANHO Por Peça': '',
  Produtividade: '',
  '% Melhoria Custo': '',
  'Mês Implementação': '',
  'REDUÇÃO HC': '',
  DESCRIÇÃO: '',
  'SAVING/Ganho ANUAL': '',
  INVESTIMENTO: '',
  'PAYBACK (MESES)': '',
  'CUSTO HC': ''
}

function App() {
  const [data, setData] = useState([
    {
      Item: '',
      Data: '',
      Mês: '',
      Business: '',
      Produto: 'TLG2M',
      Responsável: 'Denilson / Thaina / Janaina / Nicolau',
      Status: 'Implementado',
      Revisão: 'Rev00',
      Familia: 'TV',
      'UPH Antigo': 100,
      'HC Antigo': 45,
      'TP Antigo': 0.275,
      'Custo Antigo': 25.68,
      'UPPH Antigo': 4.45,
      'UPH Novo': 220,
      'HC Novo': 43,
      'TP Novo': 0.204545455,
      'Custo Novo': 26.38,
      'UPPH Novo': 4.89,
      'GANHO Por Peça': '',
      Produtividade: '',
      '% Melhoria Custo': '',
      'Mês Implementação': '',
      'REDUÇÃO HC': '',
      DESCRIÇÃO: '',
      'SAVING/Ganho ANUAL': '',
      INVESTIMENTO: '',
      'PAYBACK (MESES)': '',
      'CUSTO HC': ''
    },
    {
      Item: '',
      Data: '',
      Mês: '',
      Business: '',
      Produto: 'TRD55V',
      Responsável: 'Denilson / Thaina / Janaina / Nicolau',
      Status: 'Implementado',
      Revisão: 'Rev07',
      Familia: 'TV',
      'UPH Antigo': 220,
      'HC Antigo': 45,
      'TP Antigo': 0.079,
      'Custo Antigo': 15.54,
      'UPPH Antigo': 4.95,
      'UPH Novo': 230,
      'HC Novo': 41,
      'TP Novo': 0.74782887,
      'Custo Novo': 13.95,
      'UPPH Novo': 5.61,
      'GANHO Por Peça': '',
      Produtividade: '',
      '% Melhoria Custo': '',
      'Mês Implementação': '',
      'REDUÇÃO HC': '',
      DESCRIÇÃO: '',
      'SAVING/Ganho ANUAL': '',
      INVESTIMENTO: '',
      'PAYBACK (MESES)': '',
      'CUSTO HC': ''
    },
    {
      Item: '',
      Data: '',
      Mês: '',
      Business: '',
      Produto: 'CPPC045MAOR1',
      Responsável: 'Denilson / Ana Carolina / Charlie / Ricardo',
      Status: 'Implementado',
      Revisão: 'Rev00',
      Familia: 'TV',
      'UPH Antigo': 180,
      'HC Antigo': 9.5,
      'TP Antigo': 0.086,
      'Custo Antigo': 8.16,
      'UPPH Antigo': 11.58,
      'UPH Novo': 200,
      'HC Novo': 7.5,
      'TP Novo': 0.06818118,
      'Custo Novo': 5.18,
      'UPPH Novo': 14.67,
      'GANHO Por Peça': '',
      Produtividade: '',
      '% Melhoria Custo': '',
      'Mês Implementação': '',
      'REDUÇÃO HC': '',
      DESCRIÇÃO: '',
      'SAVING/Ganho ANUAL': '',
      INVESTIMENTO: '',
      'PAYBACK (MESES)': '',
      'CUSTO HC': ''
    },
    {
      Item: '',
      Data: '',
      Mês: '',
      Business: '',
      Produto: 'CPPC045PTHR1',
      Responsável: 'Denilson / Ana Carolina / Charlie / Ricardo',
      Status: 'Implementado',
      Revisão: 'Rev00',
      Familia: 'TV',
      'UPH Antigo': 190,
      'HC Antigo': 9.5,
      'TP Antigo': 0.086,
      'Custo Antigo': 8.16,
      'UPPH Antigo': 11.58,
      'UPH Novo': 210,
      'HC Novo': 7.5,
      'TP Novo': 0.06818118,
      'Custo Novo': 5.18,
      'UPPH Novo': 14.67,
      'GANHO Por Peça': '',
      Produtividade: '',
      '% Melhoria Custo': '',
      'Mês Implementação': '',
      'REDUÇÃO HC': '',
      DESCRIÇÃO: '',
      'SAVING/Ganho ANUAL': '',
      INVESTIMENTO: '',
      'PAYBACK (MESES)': '',
      'CUSTO HC': ''
    }
  ])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [editIndex, setEditIndex] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const loadedData = loadDataFromCSV()
    if (loadedData && loadedData.length > 0) {
      setData(loadedData)
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
    setFormData(initialFormState)
    setEditIndex(null)
  }

  const handleClose = () => {
    setOpen(false)
    setFormData(initialFormState)
    setEditIndex(null)
  }

  const handleEdit = (index) => {
    setFormData(data[index])
    setEditIndex(index)
    setOpen(true)
  }

  const handleDeleteClick = (index) => {
    setDeleteIndex(index)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deleteIndex !== null) {
      const newData = data.filter((_, i) => i !== deleteIndex)
      setData(newData)
      saveDataToLocalStorage(newData)
      setDeleteDialogOpen(false)
      setDeleteIndex(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setDeleteIndex(null)
  }

  const handleInputChange = (e) => {
    if (!e || !e.target) {
      console.warn('Invalid event object received in handleInputChange');
      return;
    }
    
    const { name, value } = e.target;
    if (!name) {
      console.warn('Input element missing name attribute');
      return;
    }

    let parsedValue = value;
    // Convert string numbers to actual numbers
    if (name.includes('Custo') || name.includes('UPPH') || name.includes('UPH') || name.includes('HC') || name.includes('TP') || name.includes('GANHO Por Peça') || name.includes('Produtividade') || name.includes('% Melhoria Custo') || name.includes('REDUÇÃO HC') || name.includes('SAVING/Ganho ANUAL') || name.includes('INVESTIMENTO') || name.includes('PAYBACK (MESES)') || name.includes('CUSTO HC')) {
      parsedValue = value === '' ? '' : Number(value.replace(',', '.'));
    }

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  }

  const calculateGains = () => {
    const custoGain = formData['Custo Antigo'] - formData['Custo Novo']
    const produtividadeGain = ((formData['UPPH Novo'] - formData['UPPH Antigo']) / formData['UPPH Antigo']) * 100
    return {
      custoGain,
      produtividadeGain
    }
  }

  const handleSubmit = () => {
    const gains = calculateGains()
    const newData = {
      ...formData,
      'GANHO Por Peça': gains.custoGain.toFixed(2),
      Produtividade: gains.produtividadeGain.toFixed(2)
    }

    let updatedData
    if (editIndex !== null) {
      updatedData = [...data]
      updatedData[editIndex] = newData
    } else {
      updatedData = [...data, newData]
    }
    
    setData(updatedData)
    saveDataToLocalStorage(updatedData)
    handleClose()
  }

  const handleSaveToFile = () => {
    downloadCSV(data)
  }

  const formatNumber = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '0';
    return value.toFixed(1);
  };

  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return 'R$ 0,00';
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const formatPercentage = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '0%';
    return `${value.toFixed(1)}%`;
  };

  const calculateTotalHCReduction = () => {
    if (!data || data.length === 0) return 0;
    return data.reduce((sum, item) => sum + (Number(item['REDUÇÃO HC']) || 0), 0);
  };

  const calculateAverageTPReduction = () => {
    if (!data || data.length === 0) return 0;
    const validItems = data.filter(item => item['TP Antigo'] > 0);
    if (validItems.length === 0) return 0;
    
    const reductions = validItems.map(item => {
      const tpAntigo = Number(item['TP Antigo']);
      const tpNovo = Number(item['TP Novo']);
      return ((tpAntigo - tpNovo) / tpAntigo) * 100;
    });
    
    return reductions.reduce((sum, value) => sum + value, 0) / reductions.length;
  };

  const calculateAverageUPPHGain = () => {
    if (!data || data.length === 0) return 0;
    const validItems = data.filter(item => item['UPPH Antigo'] > 0);
    if (validItems.length === 0) return 0;
    
    const gains = validItems.map(item => {
      const upphAntigo = Number(item['UPPH Antigo']);
      const upphNovo = Number(item['UPPH Novo']);
      return ((upphNovo - upphAntigo) / upphAntigo) * 100;
    });
    
    return gains.reduce((sum, value) => sum + value, 0) / gains.length;
  };

  const calculateTotalMoneyGain = () => {
    if (!data || data.length === 0) return 0;
    return data.reduce((sum, item) => {
      const gainPerPiece = Number(item['GANHO Por Peça']) || 0;
      return sum + Math.abs(gainPerPiece); // Usa valor absoluto pois ganho é negativo no CSV
    }, 0);
  };

  const generateUPHTicks = () => {
    if (data.length === 0) return [0, 10, 20, 30, 40, 50]
    
    const values = data.flatMap(d => [d['UPH Antigo'], d['UPH Novo']])
    const min = Math.floor(Math.min(...values) / 10) * 10
    const max = Math.ceil(Math.max(...values) / 10) * 10
    
    const ticks = []
    for (let i = min; i <= max; i += 10) {
      ticks.push(i)
    }
    return ticks
  }

  const generateHCTicks = () => {
    const ticks = []
    for (let i = 0; i <= 45; i += 5) {
      ticks.push(i)
    }
    return ticks
  }

  const handleImportCSV = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const importedData = await importCSVFile(file)
        setData(importedData)
      } catch (error) {
        console.error('Erro ao importar arquivo:', error)
        alert('Erro ao importar o arquivo. Verifique se o formato está correto.')
      }
    }
    // Limpa o input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            px: 2
          }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Dashboard Executivo - KPIs de Processo
            </Typography>
            <Box>
              <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImportCSV}
              />
              <Button 
                variant="contained" 
                startIcon={<UploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ mr: 2 }}
              >
                Importar CSV
              </Button>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={handleSaveToFile}
                sx={{ mr: 2 }}
              >
                Exportar CSV
              </Button>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Adicionar Dados
              </Button>
            </Box>
          </Box>

          <Container maxWidth={false} sx={{ mt: 2, px: 0 }}>
            <Grid container spacing={2}>
              {/* Cards de Métricas */}
              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3, bgcolor: '#e3f2fd' }}>
                  <Typography variant="h6" color="textSecondary">
                    Redução Total de HC
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                    {formatNumber(calculateTotalHCReduction())} HC
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3, bgcolor: '#e3f2fd' }}>
                  <Typography variant="h6" color="textSecondary">
                    Redução Média de TP
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                    {formatPercentage(calculateAverageTPReduction())}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3, bgcolor: '#e3f2fd' }}>
                  <Typography variant="h6" color="textSecondary">
                    Ganho Total em UPPH
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                    {formatPercentage(calculateAverageUPPHGain())}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3, bgcolor: '#e3f2fd' }}>
                  <Typography variant="h6" color="textSecondary">
                    Ganho Total em R$
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                    {formatCurrency(calculateTotalMoneyGain())}
                  </Typography>
                </Paper>
              </Grid>

              {/* Gráficos */}
              {/* Gráfico de UPH */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 2, 
                  height: '100%', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                  borderRadius: '16px'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Comparativo UPH
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                      barGap={10}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="Produto"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                      />
                      <YAxis label={{ value: 'UPH', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => value.toFixed(2)} />
                      <Legend />
                      <Bar dataKey="UPH Antigo" fill="#ff7300" name="UPH Antigo" />
                      <Bar dataKey="UPH Novo" fill="#1976d2" name="UPH Novo" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Gráfico de HC */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 2, 
                  height: '100%', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                  borderRadius: '16px'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Comparativo HC
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                      barGap={10}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="Produto"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                      />
                      <YAxis label={{ value: 'HC', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => value.toFixed(2)} />
                      <Legend />
                      <Bar dataKey="HC Antigo" fill="#ff9800" name="HC Antigo" />
                      <Bar dataKey="HC Novo" fill="#2196f3" name="HC Novo" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Gráfico de TP */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 2, 
                  height: '100%', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                  borderRadius: '16px'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Comparativo TP
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="Produto"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                      />
                      <YAxis label={{ value: 'TP', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => value.toFixed(2)} />
                      <Legend />
                      <Bar dataKey="TP Antigo" fill="#ffc107" name="TP Antigo" />
                      <Bar dataKey="TP Novo" fill="#4caf50" name="TP Novo" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Gráfico de Custo */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 2, 
                  height: '100%', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                  borderRadius: '16px'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Comparativo Custo
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="Produto"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                      />
                      <YAxis label={{ value: 'Custo (R$)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                      <Legend />
                      <Bar dataKey="Custo Antigo" fill="#e91e63" name="Custo Antigo" />
                      <Bar dataKey="Custo Novo" fill="#9c27b0" name="Custo Novo" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Gráfico de UPPH */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 2, 
                  height: '100%', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                  borderRadius: '16px'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Comparativo UPPH
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="Produto"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                      />
                      <YAxis label={{ value: 'UPPH', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => value.toFixed(2)} />
                      <Legend />
                      <Bar dataKey="UPPH Antigo" fill="#795548" name="UPPH Antigo" />
                      <Bar dataKey="UPPH Novo" fill="#607d8b" name="UPPH Novo" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Gráfico de Ganhos e Melhorias */}
              <Grid item xs={12} md={12}>
                <Paper sx={{ 
                  p: 2, 
                  height: '100%', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                  borderRadius: '16px'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Ganhos e Melhorias
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="Produto"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                      />
                      <YAxis 
                        yAxisId="left"
                        label={{ value: 'Ganho (R$)', angle: -90, position: 'insideLeft' }}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right"
                        label={{ value: 'Melhoria (%)', angle: 90, position: 'insideRight' }}
                      />
                      <Tooltip 
                        formatter={(value, name) => {
                          if (name === 'GANHO Por Peça') {
                            return [`R$ ${value.toFixed(2)}`, name];
                          } else if (name === '% Melhoria Custo' || name === 'Produtividade') {
                            return [`${value.toFixed(1)}%`, name];
                          }
                          return [value.toFixed(2), name];
                        }}
                      />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="GANHO Por Peça" 
                        fill="#00bcd4" 
                        name="Ganho por Peça"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="% Melhoria Custo" 
                        stroke="#ff5722" 
                        strokeWidth={2}
                        name="% Melhoria Custo"
                        dot={{ fill: '#ff5722' }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="Produtividade" 
                        stroke="#8bc34a" 
                        strokeWidth={2}
                        name="Produtividade"
                        dot={{ fill: '#8bc34a' }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Tabela de Cadastro */}
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer component={Paper} sx={{ 
                    maxHeight: '300px',
                    overflow: 'auto'
                  }}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: '5%' }}>Item</TableCell>
                          <TableCell sx={{ width: '5%' }}>Data</TableCell>
                          <TableCell sx={{ width: '5%' }}>Mês</TableCell>
                          <TableCell sx={{ width: '5%' }}>Business</TableCell>
                          <TableCell sx={{ width: '10%' }}>Produto</TableCell>
                          <TableCell sx={{ width: '10%' }}>Responsável</TableCell>
                          <TableCell sx={{ width: '5%' }}>Status</TableCell>
                          <TableCell sx={{ width: '5%' }}>Revisão</TableCell>
                          <TableCell sx={{ width: '5%' }}>Familia</TableCell>
                          <TableCell sx={{ width: '5%' }}>UPH Antigo</TableCell>
                          <TableCell sx={{ width: '5%' }}>HC Antigo</TableCell>
                          <TableCell sx={{ width: '5%' }}>TP Antigo</TableCell>
                          <TableCell sx={{ width: '5%' }}>Custo Antigo</TableCell>
                          <TableCell sx={{ width: '5%' }}>UPPH Antigo</TableCell>
                          <TableCell sx={{ width: '5%' }}>UPH Novo</TableCell>
                          <TableCell sx={{ width: '5%' }}>HC Novo</TableCell>
                          <TableCell sx={{ width: '5%' }}>TP Novo</TableCell>
                          <TableCell sx={{ width: '5%' }}>Custo Novo</TableCell>
                          <TableCell sx={{ width: '5%' }}>UPPH Novo</TableCell>
                          <TableCell sx={{ width: '5%' }}>GANHO Por Peça</TableCell>
                          <TableCell sx={{ width: '5%' }}>Produtividade</TableCell>
                          <TableCell sx={{ width: '5%' }}>% Melhoria Custo</TableCell>
                          <TableCell sx={{ width: '5%' }}>Mês Implementação</TableCell>
                          <TableCell sx={{ width: '5%' }}>REDUÇÃO HC</TableCell>
                          <TableCell sx={{ width: '10%' }}>DESCRIÇÃO</TableCell>
                          <TableCell sx={{ width: '5%' }}>SAVING/Ganho ANUAL</TableCell>
                          <TableCell sx={{ width: '5%' }}>INVESTIMENTO</TableCell>
                          <TableCell sx={{ width: '5%' }}>PAYBACK (MESES)</TableCell>
                          <TableCell sx={{ width: '5%' }}>CUSTO HC</TableCell>
                          <TableCell sx={{ width: '5%' }}>Ações</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.Item}</TableCell>
                            <TableCell>{row.Data}</TableCell>
                            <TableCell>{row.Mês}</TableCell>
                            <TableCell>{row.Business}</TableCell>
                            <TableCell>{row.Produto}</TableCell>
                            <TableCell>{row.Responsável}</TableCell>
                            <TableCell>{row.Status}</TableCell>
                            <TableCell>{row.Revisão}</TableCell>
                            <TableCell>{row.Familia}</TableCell>
                            <TableCell>{row['UPH Antigo']}</TableCell>
                            <TableCell>{row['HC Antigo']}</TableCell>
                            <TableCell>{row['TP Antigo']}</TableCell>
                            <TableCell>{row['Custo Antigo']}</TableCell>
                            <TableCell>{row['UPPH Antigo']}</TableCell>
                            <TableCell>{row['UPH Novo']}</TableCell>
                            <TableCell>{row['HC Novo']}</TableCell>
                            <TableCell>{row['TP Novo']}</TableCell>
                            <TableCell>{row['Custo Novo']}</TableCell>
                            <TableCell>{row['UPPH Novo']}</TableCell>
                            <TableCell>{row['GANHO Por Peça']}</TableCell>
                            <TableCell>{row.Produtividade}</TableCell>
                            <TableCell>{row['% Melhoria Custo']}</TableCell>
                            <TableCell>{row['Mês Implementação']}</TableCell>
                            <TableCell>{row['REDUÇÃO HC']}</TableCell>
                            <TableCell>{row.DESCRICAO}</TableCell>
                            <TableCell>{row['SAVING/Ganho ANUAL']}</TableCell>
                            <TableCell>{row.INVESTIMENTO}</TableCell>
                            <TableCell>{row['PAYBACK (MESES)']}</TableCell>
                            <TableCell>{row['CUSTO HC']}</TableCell>
                            <TableCell>
                              <Tooltip title="Editar">
                                <IconButton size="small" onClick={() => handleEdit(index)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Excluir">
                                <IconButton size="small" onClick={() => handleDeleteClick(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmar Exclusão"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancel}>Cancelar</Button>
              <Button onClick={handleDeleteConfirm} autoFocus color="error">
                Excluir
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{editIndex !== null ? 'Editar Dados' : 'Adicionar Novos Dados'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Item"
                    label="Item"
                    type="text"
                    fullWidth
                    value={formData.Item || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Data"
                    label="Data"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.Data || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="mes-label">Mês</InputLabel>
                    <Select
                      labelId="mes-label"
                      id="Mês"
                      value={formData.Mês || ''}
                      label="Mês"
                      onChange={(e) => handleInputChange(e)}
                    >
                      <MenuItem value="Janeiro">Janeiro</MenuItem>
                      <MenuItem value="Fevereiro">Fevereiro</MenuItem>
                      <MenuItem value="Março">Março</MenuItem>
                      <MenuItem value="Abril">Abril</MenuItem>
                      <MenuItem value="Maio">Maio</MenuItem>
                      <MenuItem value="Junho">Junho</MenuItem>
                      <MenuItem value="Julho">Julho</MenuItem>
                      <MenuItem value="Agosto">Agosto</MenuItem>
                      <MenuItem value="Setembro">Setembro</MenuItem>
                      <MenuItem value="Outubro">Outubro</MenuItem>
                      <MenuItem value="Novembro">Novembro</MenuItem>
                      <MenuItem value="Dezembro">Dezembro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="business-label">Business</InputLabel>
                    <Select
                      labelId="business-label"
                      id="Business"
                      value={formData.Business || ''}
                      label="Business"
                      onChange={(e) => handleInputChange(e)}
                    >
                      <MenuItem value="TV">TV</MenuItem>
                      <MenuItem value="Monitor">Monitor</MenuItem>
                      <MenuItem value="Áudio">Áudio</MenuItem>
                      <MenuItem value="Outros">Outros</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Produto"
                    label="Produto"
                    type="text"
                    fullWidth
                    value={formData.Produto || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Responsável"
                    label="Responsável"
                    type="text"
                    fullWidth
                    value={formData.Responsável || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Status"
                    label="Status"
                    type="text"
                    fullWidth
                    value={formData.Status || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Revisão"
                    label="Revisão"
                    type="text"
                    fullWidth
                    value={formData.Revisão || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Familia"
                    label="Familia"
                    type="text"
                    fullWidth
                    value={formData.Familia || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="UPH Antigo"
                    label="UPH Antigo"
                    type="number"
                    fullWidth
                    value={formData['UPH Antigo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="HC Antigo"
                    label="HC Antigo"
                    type="number"
                    fullWidth
                    value={formData['HC Antigo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="TP Antigo"
                    label="TP Antigo"
                    type="number"
                    fullWidth
                    value={formData['TP Antigo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Custo Antigo"
                    label="Custo Antigo"
                    type="number"
                    fullWidth
                    value={formData['Custo Antigo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="UPPH Antigo"
                    label="UPPH Antigo"
                    type="number"
                    fullWidth
                    value={formData['UPPH Antigo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="UPH Novo"
                    label="UPH Novo"
                    type="number"
                    fullWidth
                    value={formData['UPH Novo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="HC Novo"
                    label="HC Novo"
                    type="number"
                    fullWidth
                    value={formData['HC Novo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="TP Novo"
                    label="TP Novo"
                    type="number"
                    fullWidth
                    value={formData['TP Novo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Custo Novo"
                    label="Custo Novo"
                    type="number"
                    fullWidth
                    value={formData['Custo Novo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="UPPH Novo"
                    label="UPPH Novo"
                    type="number"
                    fullWidth
                    value={formData['UPPH Novo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="GANHO Por Peça"
                    label="GANHO Por Peça"
                    type="number"
                    fullWidth
                    value={formData['GANHO Por Peça'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Produtividade"
                    label="Produtividade"
                    type="number"
                    fullWidth
                    value={formData.Produtividade || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="% Melhoria Custo"
                    label="% Melhoria Custo"
                    type="number"
                    fullWidth
                    value={formData['% Melhoria Custo'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="mesImplementacao-label">Mês Implementação</InputLabel>
                    <Select
                      labelId="mesImplementacao-label"
                      id="Mês Implementação"
                      value={formData['Mês Implementação'] || ''}
                      label="Mês Implementação"
                      onChange={(e) => handleInputChange(e)}
                    >
                      <MenuItem value="Janeiro">Janeiro</MenuItem>
                      <MenuItem value="Fevereiro">Fevereiro</MenuItem>
                      <MenuItem value="Março">Março</MenuItem>
                      <MenuItem value="Abril">Abril</MenuItem>
                      <MenuItem value="Maio">Maio</MenuItem>
                      <MenuItem value="Junho">Junho</MenuItem>
                      <MenuItem value="Julho">Julho</MenuItem>
                      <MenuItem value="Agosto">Agosto</MenuItem>
                      <MenuItem value="Setembro">Setembro</MenuItem>
                      <MenuItem value="Outubro">Outubro</MenuItem>
                      <MenuItem value="Novembro">Novembro</MenuItem>
                      <MenuItem value="Dezembro">Dezembro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="Redução HC"
                    label="Redução HC"
                    type="number"
                    fullWidth
                    value={formData['REDUÇÃO HC'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="DESCRIÇÃO"
                    label="DESCRIÇÃO"
                    type="text"
                    fullWidth
                    value={formData.DESCRICAO || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="SAVING/Ganho ANUAL"
                    label="SAVING/Ganho ANUAL"
                    type="number"
                    fullWidth
                    value={formData['SAVING/Ganho ANUAL'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="INVESTIMENTO"
                    label="INVESTIMENTO"
                    type="number"
                    fullWidth
                    value={formData.INVESTIMENTO || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="PAYBACK (MESES)"
                    label="PAYBACK (MESES)"
                    type="number"
                    fullWidth
                    value={formData['PAYBACK (MESES)'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="dense"
                    id="CUSTO HC"
                    label="CUSTO HC"
                    type="number"
                    fullWidth
                    value={formData['CUSTO HC'] || ''}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleSubmit} variant="contained">
                {editIndex !== null ? 'Salvar' : 'Adicionar'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
