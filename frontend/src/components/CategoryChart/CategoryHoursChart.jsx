import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { categoryData, hoursPerCategoryChart } from '../../services/eventsChartsService';
import Chart from "chart.js/auto";


function CategoryHoursChart({data}) {

    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    // region Chart Options
    const chartData = {
        labels: labels,
        showInLegend: true,
        datasets: [{
            label: 'Amount',
            data: values,
            hoverOffset: 4,
            backgroundColor: [
                'rgba(220, 19, 63, 1)',
                'rgba(17, 119, 187, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]
        }]
    }

    const options = {
        plugins: {
            legend: {
                display: false,
                position: 'right'
            }
        }
    }

    useEffect(() =>{
        const result = hoursPerCategoryChart(data);
        setLabels(Object.keys(result));
        setValues(Object.values(result));
    },[data])

    //endregion

    return (
        <div className='center'>
            <h3>Hours / Category</h3>
            <Doughnut options={options} data={chartData}/>
        </div>
    )
}

export default CategoryHoursChart;