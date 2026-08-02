import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

function SalesChart({ data = [] }) {

    const chartData = data.map(item => ({
        day: new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short"
        }),
        sales: Number(item.sales)
    }));

    return (

        <div className="bg-white rounded-xl shadow p-6 h-[420px]">

            <h2 className="text-xl font-bold mb-5">
                Sales Last 7 Days
            </h2>

            <ResponsiveContainer>

                <AreaChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="day"/>

                    <YAxis/>

                    <Tooltip/>

                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#2563eb"
                        fill="#60a5fa"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

}

export default SalesChart;