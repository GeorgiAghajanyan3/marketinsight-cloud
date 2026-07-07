import { Card, CardContent, Typography } from "@mui/material";

export default function StatsChart() {
  return (
    <Card
      sx={{
        bgcolor: "#1f1f1f",
        color: "white",
        borderRadius: 3,
        height: 300,
        border: "1px solid #ff2d2d",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Statistics
        </Typography>

        <Typography variant="body2" color="gray">
          📈 Chart will be added in the next step.
        </Typography>
      </CardContent>
    </Card>
  );
}