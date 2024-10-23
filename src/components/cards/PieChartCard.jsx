import { Card } from "react-daisyui";
import { VictoryPie } from "victory";

export default function PieChartCard({
  activeLabel,
  disabledLabel,
  totalActive,
  totalDisabled,
  totalValue,
  title,
}) {
  return (
    <Card className="border shadow p-4">
      <div className="flex flex-row justify-center">
        <VictoryPie
          colorScale={["#0084FF", "#707070"]}
          data={[
            { label: activeLabel, y: totalActive },
            { label: disabledLabel, y: totalDisabled },
          ]}
          innerRadius={70}
          style={{
            labels: {
              fill: "#707070",
              fontSize: 25,
              fontWeight: "bold",
            },
          }}
        />
      </div>
      <div className="text-center mt-4">
        <p className="text-3xl font-bold text-secondary">{totalValue}</p>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm text-gray-500">21% more than last month</p>
      </div>
    </Card>
  );
}
