import React from "react";
import ReactApexChart from "react-apexcharts";

// commentChart::component
const CommentChart = ({ totalComments }) => {

  // commentChart::chart configuration
  const chartOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false, // Hide the chart toolbar
      },
    },
    labels: ['Comments'], // Labels for the chart
    colors: ['#FB923C'], // Color for the donut chart
    plotOptions: {
      pie: {
        expandOnClick: false, // Disable expanding the chart on click
      },
    },
    dataLabels: {
      enabled: true, // Enable labels on the chart
      style: {
        fontSize: '16px', // Style for the labels
      },
    },
    responsive: [{
      breakpoint: 480, // Responsive configuration for smaller screens
      options: {
        chart: {
          width: 200, // Adjust the chart width for mobile screens
        },
        legend: {
          position: 'bottom', // Position the legend at the bottom
        },
      },
    }],
  };

  // commentChart::data for the chart
  const chartData = [totalComments]; // Total comments as the only data point

  // commentChart::render chart
  return (
    <div className="p-6 bg-bgPrimary rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Comments Chart</h2>
      <div className="h-80">
        <ReactApexChart
          options={chartOptions}
          series={chartData}
          type="donut"
          height={320} // Adjust the height of the chart
        />
      </div>
    </div>
  );
};

export default CommentChart;
