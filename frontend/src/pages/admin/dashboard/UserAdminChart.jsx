import React from "react";
import ReactApexChart from "react-apexcharts";

// userAdminChart::component
const UserAdminChart = ({ totalUsers, adminCount }) => {
  const normalUsers = totalUsers - adminCount;

  // userAdminChart::chart configuration
  const chartOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false,
      },
    },
    labels: ['Admins', 'Users'],
    colors: ['#84CC16', '#4F46E5'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // userAdminChart::data for the chart
  const chartData = [adminCount, normalUsers];

  // userAdminChart::render chart
  return (
    <div className="p-6 bg-bgPrimary rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User vs Admin Chart</h2>
      <div className="h-80">
        <ReactApexChart
          options={chartOptions}
          series={chartData}
          type="pie"
          height={320}
        />
      </div>
    </div>
  );
};

export default UserAdminChart;
