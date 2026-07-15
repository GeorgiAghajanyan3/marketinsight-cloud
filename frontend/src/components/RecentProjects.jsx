import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

export default function RecentProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/projects/`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.slice(-5).reverse());
      });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Projects
        </Typography>

        <List>
          {projects.map((project) => (
            <ListItem key={project.id}>
              <ListItemText
                primary={project.name}
                secondary={project.status}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}