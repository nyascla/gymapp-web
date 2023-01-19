
import './GymComponents.css'
import React,{useState, useEffect, useContext} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GymContext } from '../Gym';
import Client from '../../../../../utils/Client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export const GymChart = (props) => {
  const {exercise} = useContext(GymContext)
  const [chartData, setChartData] = useState([])
  const [values, setValues] = useState([])
  const [labels, setLabels] = useState([])
  
  useEffect(() => {
    if (exercise) {
      Client.sessions.getAllSessions(exercise).then(setChartData)
    }    
  }, [exercise]);

  useEffect(() => {
    setValues(chartData.map(e => e.sets_value))
    setLabels(chartData.map(e => e.session_date))
  }, [chartData]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => values),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ]
  };

  return (
    
      <div className='gym-chart'>
          <Line options={options} data={data} />;
      </div>
  )
}

