import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import { Paper, Typography, Divider } from '@mui/material';

const MelhoriasChart = ({ data, formatLabel }) => {
  // Processa os dados para mostrar apenas produtos com melhorias
  const dadosMelhorias = data.map(item => ({
    Produto: item.Produto,
    'Melhoria Custo': item['Custo Antigo'] > 0 ? 
      ((item['Custo Antigo'] - item['Custo Novo']) / item['Custo Antigo']) * 100 : 0,
    'Melhoria UPPH': item['UPPH Antigo'] > 0 ? 
      ((item['UPPH Novo'] - item['UPPH Antigo']) / item['UPPH Antigo']) * 100 : 0
  })).filter(item => item['Melhoria Custo'] > 0 || item['Melhoria UPPH'] > 0);

  return (
    <Paper sx={{ 
      p: 2, 
      height: '100%', 
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
      borderRadius: '16px'
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
        Melhorias por Produto (%)
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dadosMelhorias}
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
            label={{ value: 'Melhoria (%)', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `${formatLabel(value)}%`}
          />
          <RechartsTooltip 
            formatter={(value, name) => [`${formatLabel(value)}%`, name]}
          />
          <Legend />
          <Bar 
            dataKey="Melhoria Custo" 
            fill="#2196f3" 
            name="Melhoria Custo (%)"
          >
            <LabelList 
              dataKey="Melhoria Custo" 
              position="top" 
              formatter={(value) => `${formatLabel(value)}%`}
              fill="#000000" 
              style={{ 
                fontSize: '11px', 
                fontWeight: 'bold', 
                textShadow: '1px 1px 1px rgba(255,255,255,0.5)' 
              }} 
            />
          </Bar>
          <Bar 
            dataKey="Melhoria UPPH" 
            fill="#4caf50" 
            name="Melhoria UPPH (%)"
          >
            <LabelList 
              dataKey="Melhoria UPPH" 
              position="top" 
              formatter={(value) => `${formatLabel(value)}%`}
              fill="#000000" 
              style={{ 
                fontSize: '11px', 
                fontWeight: 'bold', 
                textShadow: '1px 1px 1px rgba(255,255,255,0.5)' 
              }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default MelhoriasChart;
