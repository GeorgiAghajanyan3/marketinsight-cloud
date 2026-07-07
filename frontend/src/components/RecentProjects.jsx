import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function RecentProjects() {
  const projects = [
    "Customer Satisfaction Survey",
    "Competitor Analysis",
    "AI Market Report",
    "Retail Dashboard",
  ];

  return (
    <Card
      sx={{
        bgcolor: "#1f1f1f",
        color: "white",
        borderRadius: 3,
        height: 300,
        border: "1px solid #ff5722",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recent Projects
        </Typography>

        <List>
          {projects.map((project) => (
            <ListItem key={project}>
              <ListItemText
                primary={
                  <Typography color="white">
                    {project}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}