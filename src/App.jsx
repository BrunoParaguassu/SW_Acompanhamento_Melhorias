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
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import StarIcon from '@mui/icons-material/Star';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import TimerIcon from '@mui/icons-material/Timer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
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
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    },
    typography: {
      h4: {
        fontWeight: 600,
        letterSpacing: '0.5px'
      },
      h6: {
        fontWeight: 500,
        letterSpacing: '0.25px'
      }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateY(-1px)'
            }
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '0.875rem',
            padding: '8px 12px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)'
          }
        }
      }
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
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
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

  const handleSubmit = async () => {
    setLoading(true)
    try {
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
      setSnackbar({
        open: true,
        message: editIndex !== null ? 'Dados atualizados com sucesso!' : 'Dados adicionados com sucesso!',
        severity: 'success'
      })
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
      setSnackbar({
        open: true,
        message: 'Erro ao salvar os dados. Tente novamente.',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveToFile = () => {
    downloadCSV(data)
  }

  const handleClearData = () => {
    setData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSnackbar({
      open: true,
      message: 'Dados limpos com sucesso!',
      severity: 'info'
    });
  };

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
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setLoading(true);
    let allData = [];

    try {
      for (const file of files) {
        const importedData = await importCSVFile(file);
        allData = [...allData, ...importedData];
      }

      setData(allData);
      setSnackbar({
        open: true,
        message: `${files.length} arquivo(s) importado(s) com sucesso! Total de ${allData.length} registros.`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao importar arquivo:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao importar arquivo. Verifique se é um arquivo CSV válido.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const temAlteracoesUPH = (produto) => {
    return produto['UPH Antigo'] !== produto['UPH Novo'];
  };

  const temAlteracoesHC = (produto) => {
    return produto['HC Antigo'] !== produto['HC Novo'];
  };

  const temAlteracoesTP = (produto) => {
    return produto['TP Antigo'] !== produto['TP Novo'];
  };

  const temAlteracoesCusto = (produto) => {
    return produto['Custo Antigo'] !== produto['Custo Novo'];
  };

  const temAlteracoesUPPH = (produto) => {
    return produto['UPPH Antigo'] !== produto['UPPH Novo'];
  };

  // Filtra produtos que tiveram alguma melhoria
  const produtosMelhoria = data
    .filter(item => {
      // Verifica se houve melhoria em qualquer aspecto
      const melhoriaUPPH = Number(item['UPPH Novo']) > Number(item['UPPH Antigo']);
      const melhoriaUPH = Number(item['UPH Novo']) > Number(item['UPH Antigo']);
      const melhoriaHC = Number(item['HC Novo']) < Number(item['HC Antigo']); // Menor é melhor para HC
      const melhoriaTP = Number(item['TP Novo']) < Number(item['TP Antigo']); // Menor é melhor para TP
      const melhoriaCusto = Number(item['Custo Novo']) < Number(item['Custo Antigo']); // Menor é melhor para Custo
      
      return melhoriaUPPH || melhoriaUPH || melhoriaHC || melhoriaTP || melhoriaCusto;
    })
    .map(item => ({
      ...item,
      // Calcula os percentuais de melhoria
      melhorias: {
        UPPH: ((Number(item['UPPH Novo']) - Number(item['UPPH Antigo'])) / Number(item['UPPH Antigo']) * 100).toFixed(1),
        UPH: ((Number(item['UPH Novo']) - Number(item['UPH Antigo'])) / Number(item['UPH Antigo']) * 100).toFixed(1),
        HC: ((Number(item['HC Antigo']) - Number(item['HC Novo'])) / Number(item['HC Antigo']) * 100).toFixed(1),
        TP: ((Number(item['TP Antigo']) - Number(item['TP Novo'])) / Number(item['TP Antigo']) * 100).toFixed(1),
        Custo: ((Number(item['Custo Antigo']) - Number(item['Custo Novo'])) / Number(item['Custo Antigo']) * 100).toFixed(1)
      }
    }));

  // Função para formatar o tooltip das melhorias
  const formatTooltipMelhorias = (value, name, props) => {
    if (!props || !props.payload || !props.payload[0]) {
      return `${name}: ${formatLabel(value)}`;
    }
    const item = props.payload[0].payload;
    
    // Prepara a lista de melhorias
    const listaMelhorias = [];
    if (Number(item.melhorias.UPPH) > 0) listaMelhorias.push(`UPPH: +${item.melhorias.UPPH}%`);
    if (Number(item.melhorias.UPH) > 0) listaMelhorias.push(`UPH: +${item.melhorias.UPH}%`);
    if (Number(item.melhorias.HC) > 0) listaMelhorias.push(`HC: -${item.melhorias.HC}%`);
    if (Number(item.melhorias.TP) > 0) listaMelhorias.push(`TP: -${item.melhorias.TP}%`);
    if (Number(item.melhorias.Custo) > 0) listaMelhorias.push(`Custo: -${item.melhorias.Custo}%`);
    
    return [
      `Produto: ${item.Produto}`,
      `Data Implementação: ${item['Mês Implementação'] || item.Data || 'N/A'}`,
      'Melhorias:',
      ...listaMelhorias,
      `Status: ${item.Status || 'N/A'}`,
      `Descrição: ${item.DESCRIÇÃO || 'N/A'}`,
      `Responsável: ${item.Responsável || 'N/A'}`
    ];
  };

  // Dados filtrados para cada tipo de gráfico
  const dadosFiltradosUPH = data.filter(temAlteracoesUPH);
  const dadosFiltradosHC = data.filter(temAlteracoesHC);
  const dadosFiltradosTP = data.filter(temAlteracoesTP);
  const dadosFiltradosCusto = data.filter(temAlteracoesCusto);
  const dadosFiltradosUPPH = data.filter(temAlteracoesUPPH);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box sx={{ 
          p: 1.5, 
          bgcolor: '#424242',
          color: '#fff',
          borderRadius: 1,
          minWidth: 180,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Comparativo {label}
          </Typography>
          {payload.map((item, index) => (
            <Box key={index} sx={{ mb: index < payload.length - 1 ? 1 : 0 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  mb: 0.5,
                  '& strong': {
                    color: item.name.includes('Antigo') ? '#fff' : '#4caf50',
                    fontWeight: 'bold'
                  }
                }}
              >
                <span>{item.name}:</span>
                <strong>{formatLabel(item.value)}</strong>
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                <span>Data:</span>
                <span>{item.name.includes('Antigo') ? (data['Data Antes'] || 'N/A') : (data['Data Depois'] || data['Data'] || 'N/A')}</span>
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  const formatTooltip = (value) => {
    if (value === null || value === undefined || value === '') return '0';
    const num = typeof value === 'string' ? Number(value.replace(',', '.')) : Number(value);
    return isNaN(num) ? '0' : num.toFixed(2);
  };

  const formatLabel = (value) => {
    if (value === null || value === undefined || value === '') return '0';
    const num = typeof value === 'string' ? Number(value.replace(',', '.')) : Number(value);
    return isNaN(num) ? '0' : num.toFixed(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999
            }}
          >
            <CircularProgress />
          </Box>
        )}
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
                multiple
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
                color="error"
                onClick={handleClearData}
                disabled={!data || data.length === 0}
              >
                Limpar Dados
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
                    UPH
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={dadosFiltradosUPH}
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
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="UPH Antigo" fill="url(#colorUphAntigo)" name="UPH Antigo">
                        <LabelList 
                          dataKey="UPH Antigo" 
                          position="top" 
                          formatter={formatLabel}
                          offset={-15}
                          fill="#000"
                          style={{
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 1px rgba(255,255,255,0.5)'
                          }}
                        />
                      </Bar>
                      <Bar dataKey="UPH Novo" fill="url(#colorUphNovo)" name="UPH Novo">
                        <LabelList 
                          dataKey="UPH Novo" 
                          position="top" 
                          formatter={formatLabel}
                          offset={15}
                          fill="#000"
                          style={{
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 1px rgba(255,255,255,0.5)'
                          }}
                        />
                      </Bar>
                      <defs>
                        <linearGradient id="colorUphAntigo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ff7300" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="colorUphNovo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1976d2" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
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
                    HC
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={dadosFiltradosHC}
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
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="HC Antigo" fill="url(#colorHcAntigo)" name="HC Antigo">
                        <LabelList dataKey="HC Antigo" position="top" formatter={formatLabel} fill="#000000" style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }} />
                      </Bar>
                      <Bar dataKey="HC Novo" fill="url(#colorHcNovo)" name="HC Novo">
                        <LabelList dataKey="HC Novo" position="top" formatter={formatLabel} fill="#000000" style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }} />
                      </Bar>
                      <defs>
                        <linearGradient id="colorHcAntigo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ff9800" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="colorHcNovo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#2196f3" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
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
                     TP
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={dadosFiltradosTP}
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
                        label={{ value: 'TP', angle: -90, position: 'insideLeft' }}
                        tickFormatter={formatLabel}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="TP Antigo" fill="url(#colorTpAntigo)" name="TP Antigo">
                        <LabelList 
                          dataKey="TP Antigo" 
                          position="top" 
                          formatter={formatLabel}
                          fill="#000000"
                          style={{
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textShadow: '0px 0px 3px rgba(255,255,255,0.8)'
                          }}
                        />
                      </Bar>
                      <Bar dataKey="TP Novo" fill="url(#colorTpNovo)" name="TP Novo">
                        <LabelList 
                          dataKey="TP Novo" 
                          position="top" 
                          formatter={formatLabel}
                          fill="#000000"
                          style={{
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textShadow: '0px 0px 3px rgba(255,255,255,0.8)'
                          }}
                        />
                      </Bar>
                      <defs>
                        <linearGradient id="colorTpAntigo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffc107" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ffc107" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="colorTpNovo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4caf50" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
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
                    Custo
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={dadosFiltradosCusto}
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
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="Custo Antigo" fill="#e91e63" name="Custo Antigo">
                        <LabelList dataKey="Custo Antigo" position="top" formatter={formatLabel} fill="#000000" style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }} />
                      </Bar>
                      <Bar dataKey="Custo Novo" fill="#9c27b0" name="Custo Novo">
                        <LabelList dataKey="Custo Novo" position="top" formatter={formatLabel} fill="#000000" style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }} />
                      </Bar>
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
                    UPPH
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={dadosFiltradosUPPH}
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
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="UPPH Antigo" fill="#795548" name="UPPH Antigo">
                        <LabelList dataKey="UPPH Antigo" position="top" formatter={formatLabel} fill="#000000" style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }} />
                      </Bar>
                      <Bar dataKey="UPPH Novo" fill="#607d8b" name="UPPH Novo">
                        <LabelList dataKey="UPPH Novo" position="top" formatter={formatLabel} fill="#000000" style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Gráfico de Melhorias */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ 
                  p: 2, 
                  height: '100%',
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,
                  boxShadow: 3
                }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'medium' }}>
                    Produtos com Melhorias Implementadas
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                    Detalhes das melhorias realizadas em cada produto
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 2, 
                      maxHeight: 600, 
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#90a4ae',
                        borderRadius: '4px',
                        '&:hover': {
                          backgroundColor: '#78909c'
                        }
                      }
                    }}>
                    {produtosMelhoria.map((produto, index) => (
                      <Paper 
                        key={index} 
                        sx={{ 
                          p: 2, 
                          bgcolor: '#fff',
                          borderLeft: '4px solid #2e7d32',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: 3,
                            transform: 'translateX(4px)',
                            bgcolor: '#fafafa'
                          }
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <TrendingUpIcon color="success" />
                              <Typography variant="h6" color="primary">
                                {produto.Produto}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarTodayIcon fontSize="small" color="primary" />
                                <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 'medium' }}>
                                  Implementado em: {produto['Mês Implementação'] || produto.Data || 'N/A'}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 1,
                                  bgcolor: produto.Status?.toLowerCase().includes('conclu') ? '#e8f5e9' : '#fff3e0',
                                  p: 1,
                                  borderRadius: 1
                                }}
                              >
                                <AssignmentIcon 
                                  fontSize="small" 
                                  color={produto.Status?.toLowerCase().includes('conclu') ? 'success' : 'warning'} 
                                />
                                <Typography 
                                  variant="subtitle2" 
                                  color={produto.Status?.toLowerCase().includes('conclu') ? 'success.main' : 'warning.main'}
                                  sx={{ fontWeight: 'medium' }}
                                >
                                  Status: {produto.Status || 'N/A'}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper 
                              sx={{ 
                                p: 2, 
                                bgcolor: '#f5f5f5', 
                                borderRadius: 1,
                                mt: 1
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <DescriptionIcon fontSize="small" color="primary" />
                                <Box>
                                  <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                                    Descrição da Melhoria:
                                  </Typography>
                                  <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-line' }}>
                                    {produto.DESCRIÇÃO || 'Sem descrição'}
                                  </Typography>
                                </Box>
                              </Box>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StarIcon fontSize="small" color="primary" />
                                <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'medium' }}>
                                  Melhorias Realizadas
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon fontSize="small" color="primary" />
                                <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 'medium' }}>
                                  Responsável: <span style={{ color: '#1976d2' }}>{produto.Responsável || 'N/A'}</span>
                                </Typography>
                              </Box>
                            </Box>
                            <Grid container spacing={1}>
                              {Number(produto.melhorias.UPPH) > 0 && (
                                <Grid item xs={6} sm={4}>
                                  <Tooltip 
                                    title={
                                      <Box sx={{ 
                                        p: 2,
                                        bgcolor: '#424242',
                                        borderRadius: 1,
                                        minWidth: 200
                                      }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#fff', fontWeight: 'bold' }}>
                                          Comparativo UPPH:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                          <Box>
                                            <Typography sx={{ color: '#fff', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Antes:</span>
                                              <strong>{formatLabel(produto['UPPH Antigo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Antes'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                          <Box>
                                            <Typography sx={{ color: '#4caf50', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Depois:</span>
                                              <strong>{formatLabel(produto['UPPH Novo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Depois'] || produto['Data'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    }
                                    arrow
                                    placement="top"
                                  >
                                    <Paper 
                                      sx={{ 
                                        p: 1.5, 
                                        bgcolor: '#e8f5e9', 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                          transform: 'translateY(-2px)',
                                          boxShadow: 2,
                                          bgcolor: '#c8e6c9'
                                        }
                                      }}
                                    >
                                      <ArrowUpwardIcon color="success" fontSize="small" />
                                      <Typography variant="subtitle2" color="success.main">
                                        UPPH: +{produto.melhorias.UPPH}%
                                      </Typography>
                                    </Paper>
                                  </Tooltip>
                                </Grid>
                              )}
                              {Number(produto.melhorias.UPH) > 0 && (
                                <Grid item xs={6} sm={4}>
                                  <Tooltip 
                                    title={
                                      <Box sx={{ 
                                        p: 2,
                                        bgcolor: '#424242',
                                        borderRadius: 1,
                                        minWidth: 200
                                      }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#fff', fontWeight: 'bold' }}>
                                          Comparativo UPH:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                          <Box>
                                            <Typography sx={{ color: '#fff', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Antes:</span>
                                              <strong>{formatLabel(produto['UPH Antigo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Antes'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                          <Box>
                                            <Typography sx={{ color: '#4caf50', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Depois:</span>
                                              <strong>{formatLabel(produto['UPH Novo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Depois'] || produto['Data'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    }
                                    arrow
                                    placement="top"
                                  >
                                    <Paper 
                                      sx={{ 
                                        p: 1.5, 
                                        bgcolor: '#e8f5e9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <SpeedIcon color="success" fontSize="small" />
                                      <Typography variant="subtitle2" color="success.main">
                                        UPH: +{produto.melhorias.UPH}%
                                      </Typography>
                                    </Paper>
                                  </Tooltip>
                                </Grid>
                              )}
                              {Number(produto.melhorias.HC) > 0 && (
                                <Grid item xs={6} sm={4}>
                                  <Tooltip 
                                    title={
                                      <Box sx={{ 
                                        p: 2,
                                        bgcolor: '#424242',
                                        borderRadius: 1,
                                        minWidth: 200
                                      }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#fff', fontWeight: 'bold' }}>
                                          Comparativo HC:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                          <Box>
                                            <Typography sx={{ color: '#fff', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Antes:</span>
                                              <strong>{formatLabel(produto['HC Antigo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Antes'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                          <Box>
                                            <Typography sx={{ color: '#4caf50', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Depois:</span>
                                              <strong>{formatLabel(produto['HC Novo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Depois'] || produto['Data'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    }
                                    arrow
                                    placement="top"
                                  >
                                    <Paper 
                                      sx={{ 
                                        p: 1.5, 
                                        bgcolor: '#e8f5e9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <PeopleIcon color="success" fontSize="small" />
                                      <Typography variant="subtitle2" color="success.main">
                                        HC: -{produto.melhorias.HC}%
                                      </Typography>
                                    </Paper>
                                  </Tooltip>
                                </Grid>
                              )}
                              {Number(produto.melhorias.TP) > 0 && (
                                <Grid item xs={6} sm={4}>
                                  <Tooltip 
                                    title={
                                      <Box sx={{ 
                                        p: 2,
                                        bgcolor: '#424242',
                                        borderRadius: 1,
                                        minWidth: 200
                                      }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#fff', fontWeight: 'bold' }}>
                                          Comparativo TP:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                          <Box>
                                            <Typography sx={{ color: '#fff', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Antes:</span>
                                              <strong>{formatLabel(produto['TP Antigo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Antes'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                          <Box>
                                            <Typography sx={{ color: '#4caf50', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Depois:</span>
                                              <strong>{formatLabel(produto['TP Novo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Depois'] || produto['Data'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    }
                                    arrow
                                    placement="top"
                                  >
                                    <Paper 
                                      sx={{ 
                                        p: 1.5, 
                                        bgcolor: '#e8f5e9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <TimerIcon color="success" fontSize="small" />
                                      <Typography variant="subtitle2" color="success.main">
                                        TP: -{produto.melhorias.TP}%
                                      </Typography>
                                    </Paper>
                                  </Tooltip>
                                </Grid>
                              )}
                              {Number(produto.melhorias.Custo) > 0 && (
                                <Grid item xs={6} sm={4}>
                                  <Tooltip 
                                    title={
                                      <Box sx={{ 
                                        p: 2,
                                        bgcolor: '#424242',
                                        borderRadius: 1,
                                        minWidth: 200
                                      }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#fff', fontWeight: 'bold' }}>
                                          Comparativo Custo:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                          <Box>
                                            <Typography sx={{ color: '#fff', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Antes:</span>
                                              <strong>{formatLabel(produto['Custo Antigo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Antes'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                          <Box>
                                            <Typography sx={{ color: '#4caf50', display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                              <span>Depois:</span>
                                              <strong>{formatLabel(produto['Custo Novo'])}</strong>
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'space-between' }}>
                                              <span>Data:</span>
                                              <span>{produto['Data Depois'] || produto['Data'] || 'N/A'}</span>
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Box>
                                    }
                                    arrow
                                    placement="top"
                                  >
                                    <Paper 
                                      sx={{ 
                                        p: 1.5, 
                                        bgcolor: '#e8f5e9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <AttachMoneyIcon color="success" fontSize="small" />
                                      <Typography variant="subtitle2" color="success.main">
                                        Custo: -{produto.melhorias.Custo}%
                                      </Typography>
                                    </Paper>
                                  </Tooltip>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>

                        </Grid>
                      </Paper>
                    ))}
                  </Box>
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
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="GANHO Por Peça" 
                        fill="#00bcd4" 
                        name="Ganho por Peça"
                      >
                        <LabelList 
                          dataKey="GANHO Por Peça" 
                          position="top"
                          formatter={formatLabel}
                          style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }}
                        />
                      </Bar>
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="% Melhoria Custo" 
                        stroke="#ff5722" 
                        strokeWidth={2}
                        name="% Melhoria Custo"
                        dot={{ fill: '#ff5722' }}
                      >
                        <LabelList 
                          dataKey="% Melhoria Custo" 
                          position="top"
                          formatter={formatLabel}
                          style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }}
                        />
                      </Line>
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="Produtividade" 
                        stroke="#8bc34a" 
                        strokeWidth={2}
                        name="Produtividade"
                        dot={{ fill: '#8bc34a' }}
                      >
                        <LabelList 
                          dataKey="Produtividade" 
                          position="top"
                          formatter={formatLabel}
                          style={{ fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }}
                        />
                      </Line>
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
                          <TableCell sx={{ width: '2%' }}>Familia</TableCell>
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
