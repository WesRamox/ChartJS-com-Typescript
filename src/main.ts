import Chart from 'chart.js/auto';
import "./style.css"

interface IData {
  name: string
  value: string
}

interface IDolarResponse {
  USDBRL: string
  high: string
  low: string
  ask: string
}

async function dolarToday() {
  
  const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
  const data = await response.json() 
  const dolarObject: IDolarResponse = data.USDBRL

  const { high, ask, low } = dolarObject

  const ctx = <HTMLCanvasElement>document.getElementById('acquisitions');
  
    const datachart: IData[] = [
      { name: "Maxima do Dolar Hoje", value: parseFloat(high).toFixed(3) },
      { name: "Atual valor do Dolar", value: parseFloat(ask).toFixed(3) },
      { name: "Minima do Dolar Hoje", value: parseFloat(low).toFixed(3) },
    ];
    
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: datachart.map(row => row.name),
        datasets: [
          {
            label: 'Taxa do Dolar em Real',
            data: datachart.map(row => row.value),
          }
        ]
      },
    }
  );
}

dolarToday()
