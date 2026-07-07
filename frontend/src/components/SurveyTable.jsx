import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function SurveyTable() {
  const surveys = [
    { name: "Customer Feedback", status: "Completed" },
    { name: "Retail Analysis", status: "In Progress" },
    { name: "Market Trends", status: "Pending" },
  ];

  return (
    <Card
      sx={{
        bgcolor: "#1f1f1f",
        color: "white",
        borderRadius: 3,
        border: "1px solid #ff2d2d",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Survey Results
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#ff2d2d", fontWeight: "bold" }}>
                Survey
              </TableCell>
              <TableCell sx={{ color: "#ff2d2d", fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {surveys.map((survey) => (
              <TableRow key={survey.name}>
                <TableCell sx={{ color: "white" }}>
                  {survey.name}
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                  {survey.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}