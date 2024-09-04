import {LineChart, PieChart} from 'chartist';
import DashboardMenu from "../components/DashboardMenu";
import { getSummary } from "../api.js"

let summary = {};

const DashboardScreen = {
    after_render: () => {
        new LineChart(
            '.ct-chart-line',
            {
              labels: summary.dailyOrders.map((x) => x._id),
              series: [summary.dailyOrders.map((x) => x.sales)],
            },
            {
              showArea: true,
            }
          );
          new PieChart(
            '.ct-chart-pie',
            {
              labels: summary.productCategories.map((x) => x._id),
              series: summary.productCategories.map((x) => x.count),
            },
            {
              donut: true,
              donutWidth: 60,
              startAngle: 270,
              showLabel: true,
              donutSolid: true,
            }
          );
    },
    render: async () => {
        summary = await getSummary();
        return `
            <div class="dashboard">
                ${DashboardMenu.render({selected:'dashboard'})}
                <div class="dashboard-content">
                    <h1>Dashboard</h1>
                    <div>
                        <ul class="summary-items">
                            <li>
                                <div class="summary-title color1">
                                    <span style="font-weight: bold"><i class="fa fa-users"></i> Users</span>
                                </div>
                                <div class="summary-body">${summary.users[0].numUsers}</div>
                            </li>
                            <li>
                                <div class="summary-title color2">
                                    <span style="font-weight: bold"><i class="fa-solid fa-cart-shopping"></i> Orders</span>
                                </div>
                                <div class="summary-body">${summary.orders[0].numOrders}</div>
                            </li>
                            <li>
                                <div class="summary-title color3">
                                    <span style="font-weight: bold"><i class="fa-solid fa-wallet"></i> Sales</span>
                                </div>
                                <div class="summary-body">${summary.orders[0].totalSales}$</div>
                            </li>
                        </ul>
                        <div class="charts">
                            <div>
                                <h2>Sales</h2>
                                <div class="ct-perfect-fourth ct-chart-line ct-label"></div>
                            </div>
                            <div>
                                <h2>Best Selling Categories</h2>
                                <div class="ct-perfect-fourth ct-chart-pie ct-label"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
}

export default DashboardScreen;