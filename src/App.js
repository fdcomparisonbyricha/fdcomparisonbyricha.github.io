import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Phone } from 'lucide-react';

// IDBI Bank color palette
const IDBI_COLORS = {
  primary: '#006D44',  // IDBI Green
  secondary: '#FF6B00', // IDBI Orange
  accent: '#004D2F',   // Darker green
  light: '#E8F5E9',    // Light green
  white: '#FFFFFF'
};

const CHART_COLORS = [
  IDBI_COLORS.primary,
  '#2E8B57',
  '#3CB371',
  '#90EE90',
  '#98FB98',
  '#8FBC8F',
  '#9DC183',
  '#77AB59',
  '#558B2F',
  '#33691E',
];


function App() {
  const [selectedDuration, setSelectedDuration] = useState('61 to 90 days');
  const [selectedCategory, setSelectedCategory] = useState('below3Cr');

  const categories = [
    { id: 'below3Cr', name: '< 3 Crores' },
    { id: 'above3CrPremature', name: '> 3 Crore with premature withdrawal' },
    { id: 'above3CrNoPremature', name: '> 3 Crore without premature withdrawal' }
  ];

  const durations = [
    '61 to 90 days',
    '91 to 184 days',
    '185 to 270 days',
    '271 days to <1 year'
  ];

  const bankData = {
    below3Cr: {
      'HDFC BANK': [4.50, 4.50, 5.75, 6.00],
      'ICICI BANK': [4.50, 4.75, 5.75, 6.00],
      'SBI': [5.50, 5.50, 6.25, 6.50],
      'AXIS BANK': [4.50, 4.75, 5.75, 6.00],
      'Kotak Bank': [3.50, 4.25, 6.00, 6.00],
      'BANK OF BARODA': [5.50, 5.60, 6.25, 6.50],
      'INDUSIND BANK': [4.75, 5.00, 6.10, 6.35],
      'FEDERAL BANK': [5.50, 5.50, 6.25, 6.50],
      'PNB': [4.50, 5.50, 6.25, 6.50],
      'IDBI BANK': [4.75, 5.50, 6.00, 6.25]
    },
    above3CrPremature: {
      'HDFC BANK': [6.00, 6.50, 6.85, 6.75],
      'ICICI BANK': [6.00, 6.50, 6.85, 7.00],
      'SBI': [6.25, 6.60, 6.60, 6.75],
      'AXIS BANK': [6.00, 6.50, 6.75, 6.85],
      'Kotak Bank': [5.50, 6.00, 6.00, 6.50],
      'BANK OF BARODA': [5.75, 5.75, 6.75, 6.75],
      'INDUSIND BANK': [6.35, 7.00, 7.10, 7.20],
      'FEDERAL BANK': [6.60, 7.10, 7.15, 7.25],
      'PNB': [6.60, 7.00, 7.25, 7.25],
      'IDBI BANK': [6.36, 7.11, 7.26, 7.31]
    },
    above3CrNoPremature: {
      'HDFC BANK': [6.00, 6.50, 6.85, 6.75],
      'ICICI BANK': [6.00, 7.00, 7.25, 7.40],
      'SBI': [6.25, 6.60, 6.60, 6.75],
      'AXIS BANK': [6.00, 6.50, 6.75, 6.85],
      'Kotak Bank': [null, null, 6.60, 7.00],
      'BANK OF BARODA': [7.55, 7.55, 7.55, 7.55],
      'INDUSIND BANK': [6.50, 7.10, 7.35, 7.45],
      'FEDERAL BANK': [6.60, 7.10, 7.15, 7.25],
      'PNB': [null, 7.05, 7.30, 7.30],
      'IDBI BANK': [null, 7.21, 7.41, 7.51]
    }
  };

  const getComparisonData = () => {
    const durIndex = durations.indexOf(selectedDuration);
    return Object.entries(bankData[selectedCategory])
      .filter(([bank, rates]) => rates[durIndex] !== null)
      .map(([bank, rates]) => ({
        bank,
        rate: rates[durIndex],
        difference: (rates[durIndex] - bankData[selectedCategory]['IDBI BANK'][durIndex]).toFixed(2)
      }))
      .sort((a, b) => b.rate - a.rate);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-6">
        {/* Header */}
        <div style={{ 
          background: `linear-gradient(to right, ${IDBI_COLORS.primary}, ${IDBI_COLORS.accent})`,
          padding: '2rem',
          borderRadius: '0.75rem',
          color: 'white',
          marginBottom: '2rem'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            IDBI Bank FD Rates Analysis by Richa Rawal
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
            Competitive Analysis Dashboard, Book your FD WITH IDBI - Call Richa Rawal +918349342304
          </p>
        </div>

        {/* Category Selector */}
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: selectedCategory === category.id ? IDBI_COLORS.primary : 'white',
                color: selectedCategory === category.id ? 'white' : IDBI_COLORS.primary,
                border: `1px solid ${IDBI_COLORS.primary}`,
                cursor: 'pointer'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Duration Selector */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: selectedDuration === duration ? IDBI_COLORS.secondary : 'white',
                color: selectedDuration === duration ? 'white' : IDBI_COLORS.secondary,
                border: `1px solid ${IDBI_COLORS.secondary}`,
                cursor: 'pointer'
              }}
            >
              {duration}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Interest Rate Comparison
          </h2>
          <div style={{ height: '500px' }}>
            <ResponsiveContainer>
              <BarChart data={getComparisonData()} layout="vertical">
                <XAxis 
                  type="number" 
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis dataKey="bank" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                  {getComparisonData().map((entry, index) => (
                    <Cell 
                      key={index} 
                      fill={entry.bank === 'IDBI BANK' ? IDBI_COLORS.secondary : CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Key Insights
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {getComparisonData()
              .slice(0, 3)
              .map((data, index) => (
                <div key={index} style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '1.5rem',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {parseFloat(data.difference) > 0 ? (
                      <TrendingUp color="green" />
                    ) : (
                      <TrendingDown color="red" />
                    )}
                    <span style={{ fontWeight: 'bold' }}>{data.bank}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{data.rate}%</span>
                    <span style={{ 
                      marginLeft: '0.5rem',
                      color: parseFloat(data.difference) > 0 ? 'green' : 'red'
                    }}>
                      ({data.difference > 0 ? '+' : ''}{data.difference}%)
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full bg-white shadow-lg mt-8 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="text-gray-700">
            Created by Richa Rawal
          </div>
          <a
            href="tel:+918349342304"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#006D44] to-[#004D2F] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Phone size={20} />
            <span>Book your FD with IDBI Bank</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;