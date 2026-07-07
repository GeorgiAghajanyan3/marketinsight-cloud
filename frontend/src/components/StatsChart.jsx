import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function StatsChart() {
  return (
    <Card
      sx={{
        bgcolor: "#1f1f1f",
        color: "white",
        borderRadius: 3,
        border: "1px solid #ff2d2d",
        height: 300,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Statistics
        </Typography>

        <LineChart
          xAxis={[
            {
              data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: [10, 25, 20, 35, 40, 55],
            },
          ]}
          width={600}
          height={200}
        />
      </CardContent>
    </Card>
  );
}