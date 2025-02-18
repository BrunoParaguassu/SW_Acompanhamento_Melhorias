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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Divider
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
  ResponsiveContainer
} from 'recharts'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import UploadIcon from '@mui/icons-material/Upload'
import { saveDataToLocalStorage, loadDataFromCSV, importCSVFile, downloadCSV } from './utils/dataManager'

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
  name: '',
  responsavel: '',
  status: '',
  revisao: '',
  familia: '',
  uphAntigo: '',
  hcAntigo: '',
  tpAntigo: '',
  custoAntigo: '',
  upphAntigo: '',
  uphNovo: '',
  hcNovo: '',
  tpNovo: '',
  custoNovo: '',
  upphNovo: ''
}

function App() {
  const [data, setData] = useState([
    {
      name: 'TLG2M',
      responsavel: 'Denilson / Thaina / Janaina / Nicolau',
      status: 'Implementado',
      revisao: 'Rev00',
      familia: 'TV',
      uphAntigo: 100,
      hcAntigo: 45,
      tpAntigo: 0.275,
      custoAntigo: 25.68,
      upphAntigo: 4.45,
      uphNovo: 220,
      hcNovo: 43,
      tpNovo: 0.204545455,
      custoNovo: 26.38,
      upphNovo: 4.89,
      produtividade: 30
    },
    {
      name: 'TRD55V',
      responsavel: 'Denilson / Thaina / Janaina / Nicolau',
      status: 'Implementado',
      revisao: 'Rev07',
      familia: 'TV',
      uphAntigo: 220,
      hcAntigo: 45,
      tpAntigo: 0.079,
      custoAntigo: 15.54,
      upphAntigo: 4.95,
      uphNovo: 230,
      hcNovo: 41,
      tpNovo: 0.74782887,
      custoNovo: 13.95,
      upphNovo: 5.61,
      produtividade: 14
    },
    {
      name: 'CPPC045MAOR1',
      responsavel: 'Denilson / Ana Carolina / Charlie / Ricardo',
      status: 'Implementado',
      revisao: 'Rev00',
      familia: 'TV',
      uphAntigo: 180,
      hcAntigo: 9.5,
      tpAntigo: 0.086,
      custoAntigo: 8.16,
      upphAntigo: 11.58,
      uphNovo: 200,
      hcNovo: 7.5,
      tpNovo: 0.06818118,
      custoNovo: 5.18,
      upphNovo: 14.67,
      produtividade: 27,
      ganhoPerPeca: (8.16 - 5.18).toFixed(2)
    },
    {
      name: 'CPPC045PTHR1',
      responsavel: 'Denilson / Ana Carolina / Charlie / Ricardo',
      status: 'Implementado',
      revisao: 'Rev00',
      familia: 'TV',
      uphAntigo: 190,
      hcAntigo: 9.5,
      tpAntigo: 0.086,
      custoAntigo: 8.16,
      upphAntigo: 11.58,
      uphNovo: 210,
      hcNovo: 7.5,
      tpNovo: 0.06818118,
      custoNovo: 5.18,
      upphNovo: 14.67,
      produtividade: 27,
      ganhoPerPeca: (8.16 - 5.18).toFixed(2)
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
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateGains = () => {
    const custoGain = formData.custoAntigo - formData.custoNovo
    const produtividadeGain = ((formData.upphNovo - formData.upphAntigo) / formData.upphAntigo) * 100
    return {
      custoGain,
      produtividadeGain
    }
  }

  const handleSubmit = () => {
    const gains = calculateGains()
    const newData = {
      ...formData,
      ganhoPerPeca: gains.custoGain.toFixed(2),
      produtividade: gains.produtividadeGain.toFixed(2)
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

  const calculateHCReduction = () => {
    return data.reduce((total, item) => {
      return total + (item.hcAntigo - item.hcNovo)
    }, 0).toFixed(1)
  }

  const calculateTPReduction = () => {
    const totalReduction = data.reduce((total, item) => {
      const reductionPercent = ((item.tpAntigo - item.tpNovo) / item.tpAntigo) * 100
      return total + reductionPercent
    }, 0)
    return (totalReduction / data.length).toFixed(1)
  }

  const calculateUPPHGain = () => {
    const totalGain = data.reduce((total, item) => {
      const gainPercent = ((item.upphNovo - item.upphAntigo) / item.upphAntigo) * 100
      return total + gainPercent
    }, 0)
    return (totalGain / data.length).toFixed(1)
  }

  const calculateTotalGain = () => {
    const totalGain = data.reduce((total, item) => {
      const gain = item.custoAntigo - item.custoNovo
      return total + gain
    }, 0)
    return totalGain.toFixed(2)
  }

  const generateUPHTicks = () => {
    if (data.length === 0) return [0, 10, 20, 30, 40, 50]
    
    const values = data.flatMap(d => [d.uphAntigo, d.uphNovo])
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
                  <Typography variant="h6" gutterBottom>
                    Redução Total de HC
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                    {calculateHCReduction()} HC
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3, bgcolor: '#e3f2fd' }}>
                  <Typography variant="h6" gutterBottom>
                    Redução Média de TP
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                    {calculateTPReduction()}%
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3, bgcolor: '#e3f2fd' }}>
                  <Typography variant="h6" gutterBottom>
                    Ganho Total em UPPH
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                    {calculateUPPHGain()}%
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3, bgcolor: '#e3f2fd' }}>
                  <Typography variant="h6" gutterBottom>
                    Ganho Total em R$
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ mt: 2 }}>
                    {calculateTotalGain()}
                  </Typography>
                </Paper>
              </Grid>

              {/* Gráficos */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Comparativo UPH
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 100
                      }}
                      barGap={0}
                      maxBarSize={50}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        label={{
                          value: 'UPH',
                          angle: -90,
                          position: 'insideLeft'
                        }}
                      />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="uphNovo" name="UPH Novo" fill="#1976d2" />
                      <Bar dataKey="uphAntigo" name="UPH Antigo" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Ganhos por Produto
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart 
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 100
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        yAxisId="left"
                        label={{
                          value: 'Ganho por Peça (R$)',
                          angle: -90,
                          position: 'insideLeft'
                        }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{
                          value: 'Produtividade (%)',
                          angle: 90,
                          position: 'insideRight'
                        }}
                      />
                      <RechartsTooltip
                        formatter={(value, name) => [
                          name === 'Ganho por Peça' ? `R$ ${value.toFixed(2)}` : `${value.toFixed(1)}%`,
                          name
                        ]}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="ganhoPerPeca"
                        name="Ganho por Peça"
                        stroke="#1976d2"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="produtividade"
                        name="Produtividade"
                        stroke="#ff7300"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Comparativo Tempo Padrão (TP)
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 100
                      }}
                      barGap={0}
                      maxBarSize={50}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        label={{
                          value: 'Tempo (min)',
                          angle: -90,
                          position: 'insideLeft'
                        }}
                      />
                      <RechartsTooltip
                        formatter={(value, name) => [
                          `${(value * 60).toFixed(2)} min`,
                          name.replace('tp', 'TP ')
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="tpNovo" name="TP Novo" fill="#1976d2" />
                      <Bar dataKey="tpAntigo" name="TP Antigo" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '100%', boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Comparativo Headcount
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 100
                      }}
                      barGap={0}
                      maxBarSize={50}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        label={{
                          value: 'Headcount',
                          angle: -90,
                          position: 'insideLeft'
                        }}
                      />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="hcNovo" name="HC Novo" fill="#1976d2" />
                      <Bar dataKey="hcAntigo" name="HC Antigo" fill="#82ca9d" />
                    </BarChart>
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
                          <TableCell>Produto</TableCell>
                          <TableCell>Responsável</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Revisão</TableCell>
                          <TableCell>UPH (Antigo/Novo)</TableCell>
                          <TableCell>HC (Antigo/Novo)</TableCell>
                          <TableCell>Ganho por Peça</TableCell>
                          <TableCell>Produtividade</TableCell>
                          <TableCell>Ações</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.responsavel}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.revisao}</TableCell>
                            <TableCell>{row.uphAntigo} / {row.uphNovo}</TableCell>
                            <TableCell>{row.hcAntigo} / {row.hcNovo}</TableCell>
                            <TableCell>{row.ganhoPerPeca}</TableCell>
                            <TableCell>{row.produtividade}%</TableCell>
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Produto"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Responsável"
                    name="responsavel"
                    value={formData.responsavel}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      label="Status"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Implementado">Implementado</MenuItem>
                      <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                      <MenuItem value="Pendente">Pendente</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Revisão"
                    name="revisao"
                    value={formData.revisao}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Família"
                    name="familia"
                    value={formData.familia}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Valores Antigos</Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="UPH Antigo"
                    name="uphAntigo"
                    value={formData.uphAntigo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="HC Antigo"
                    name="hcAntigo"
                    value={formData.hcAntigo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="TP Antigo"
                    name="tpAntigo"
                    value={formData.tpAntigo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Custo Antigo"
                    name="custoAntigo"
                    value={formData.custoAntigo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="UPPH Antigo"
                    name="upphAntigo"
                    value={formData.upphAntigo}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Valores Novos</Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="UPH Novo"
                    name="uphNovo"
                    value={formData.uphNovo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="HC Novo"
                    name="hcNovo"
                    value={formData.hcNovo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="TP Novo"
                    name="tpNovo"
                    value={formData.tpNovo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Custo Novo"
                    name="custoNovo"
                    value={formData.custoNovo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} md={2.4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="UPPH Novo"
                    name="upphNovo"
                    value={formData.upphNovo}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleSubmit} variant="contained">
                {editIndex !== null ? 'Atualizar' : 'Adicionar'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
