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
import { saveDataToCSV, loadDataFromCSV, importCSVFile } from './utils/dataManager'

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
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [editIndex, setEditIndex] = useState(null)
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

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index)
    setData(newData)
    saveDataToCSV(newData)
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
    saveDataToCSV(updatedData)
    handleClose()
  }

  const handleSaveToFile = () => {
    saveDataToCSV(data)
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
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
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

          {/* Form Dialog */}
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

          {/* Data Table */}
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table size="small">
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
                        <IconButton size="small" onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: 400, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Comparativo UPH
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="uphNovo" fill="#1976d2" name="UPH Novo" />
                    <Bar dataKey="uphAntigo" fill="#82ca9d" name="UPH Antigo" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: 400, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Comparativo Headcount
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="hcNovo" fill="#1976d2" name="HC Novo" />
                    <Bar dataKey="hcAntigo" fill="#82ca9d" name="HC Antigo" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, height: 400, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Ganhos por Linha
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="ganhoPerPeca" 
                      stroke="#1976d2" 
                      name="Ganho por Peça" 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="produtividade" 
                      stroke="#ff7300" 
                      name="Ganho em Produtividade (%)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
