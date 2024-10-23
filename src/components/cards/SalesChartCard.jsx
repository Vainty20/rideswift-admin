import { useState, useEffect } from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { formatPrice } from "../../utils/formatPrice";
import {
  calculateMaxYValue,
  calculateTotalIncome,
  filterBookings,
  groupAndSumBookings,
} from "../../utils/salesChartHelper";
import { Select, Stats } from "react-daisyui";

export default function SalesChartCard({ bookings }) {
  const [filterType, setFilterType] = useState("daily");
  const [filteredData, setFilteredData] = useState([]);
  const [totalIncome, setTotalIncome] = useState("");
  const [maxYValue, setMaxYValue] = useState(0);

  const handleChangeFilterType = (type) => {
    setFilterType(type);
  };

  useEffect(() => {
    const filteredBookings = filterBookings(bookings, filterType);
    const totalIncome = calculateTotalIncome(filteredBookings);
    setTotalIncome(totalIncome);

    const chartData = groupAndSumBookings(filteredBookings, filterType);

    setFilteredData(chartData);
    setMaxYValue(calculateMaxYValue(chartData));
  }, [filterType, bookings]);

  return (
    <div className="rounded-lg border shadow p-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Stats>
          <Stats.Stat>
            <Stats.Stat.Title className="font-semibold">
              Total RideSwift Income
            </Stats.Stat.Title>
            <Stats.Stat.Value className="font-bold text-primary">
              {formatPrice(totalIncome)}
            </Stats.Stat.Value>
            <Stats.Stat.Desc>Income for the selected period.</Stats.Stat.Desc>
          </Stats.Stat>
          <Stats.Stat>
            <Stats.Stat.Title className="font-semibold">
              Total App Profit
            </Stats.Stat.Title>
            <Stats.Stat.Value className="font-bold text-secondary">
              {formatPrice(totalIncome * 0.4)}
            </Stats.Stat.Value>
            <Stats.Stat.Desc>Profit for the selected period.</Stats.Stat.Desc>
          </Stats.Stat>
          <Stats.Stat>
            <Stats.Stat.Title className="font-semibold">
              Total Driver&apos;s Profit
            </Stats.Stat.Title>
            <Stats.Stat.Value className="font-bold text-secondary">
              {formatPrice(totalIncome * 0.6)}
            </Stats.Stat.Value>
            <Stats.Stat.Desc>Profit for the selected period.</Stats.Stat.Desc>
          </Stats.Stat>
        </Stats>
        <Select
          size="lg"
          value={filterType}
          onChange={(e) => handleChangeFilterType(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </Select>
      </div>

      <VictoryChart domainPadding={20} domain={{ y: [0, maxYValue] }}>
        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `${formatPrice(y)}`}
          style={{ tickLabels: { fontSize: 10, angle: -45, fill: "#707070" } }}
        />
        <VictoryAxis
          tickFormat={(x) => x}
          style={{ tickLabels: { fontSize: 10, angle: -45, fill: "#707070" } }}
        />
        <VictoryBar
          style={{ data: { fill: "#0084FF" } }}
          data={filteredData}
          x="x"
          y="y"
        />
      </VictoryChart>
    </div>
  );
}
