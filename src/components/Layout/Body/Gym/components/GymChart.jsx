
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

export const GymChart = (props) => {
  const {exercise} = useContext(GymContext)
  const [chartData, setChartData] = useState([])
  const [chartLabels, setChartLabels] = useState([])

  useEffect(() => {
    if (exercise.nombre) {
      // Client.sessions.getChartData(exercise.nombre).then(setChartData)
      Client.sessions.getChartLabels(exercise.nombre).then(setChartLabels)
    }    
  }, [exercise]);

  const data = {
    chartLabels,
    datasets: chartData
  };

  return (
      <div className='gym-chart'>
        {console.log(chartLabels)}
          <Line options={options} data={data} />;
      </div>
  )
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// [
//   {
//     label: 'Dataset 1',
//     data: labels.map(() => [1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000]),
//     borderColor: 'rgb(255, 99, 132)',
//     backgroundColor: 'rgba(255, 99, 132, 0.5)',
//   },
//   {
//     label: 'Dataset 2',
//     data: labels.map(() => [500,500,500,500,500,500,500,50,50,50,50,50]),
//     borderColor: 'rgb(53, 162, 235)',
//     backgroundColor: 'rgba(53, 162, 235, 0.5)',

//   },
//   {
//       label: 'Dataset 3',
//       data: labels.map(() => [4,4,4,4,4,4,4,4,4,4,4]),
//       borderColor: 'rgb(6, 6, 6)',
//       backgroundColor: 'rgba(6, 6, 6, 6.5)',
//   },
// ],
