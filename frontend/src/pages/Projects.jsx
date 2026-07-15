import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("active");

  const loadProjects = () => {
    fetch(`${import.meta.env.VITE_API_URL}/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setStatus("active");
  };

  const createProject = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        status,
      }),
    });

    if (response.ok) {
      resetForm();
      loadProjects();
    }
  };

  const updateProject = async () => {
    const response = await fetch(`http://127.0.0.1:62868/projects/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        status,
      }),
    });

    if (response.ok) {
      resetForm();
      loadProjects();
    }
  };

  const deleteProject = async (id) => {
    const response = await fetch(`http://127.0.0.1:62868/projects/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadProjects();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Projects</h1>

      {/* Form Section */}
      <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
        <TextField
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </TextField>

        {editingId ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={updateProject} fullWidth>
              Update Project
            </Button>
            <Button variant="outlined" color="secondary" onClick={resetForm}>
              Cancel
            </Button>
          </Box>
        ) : (
          <Button variant="contained" onClick={createProject}>
            Create Project
          </Button>
        )}
      </Box>

      {/* Projects List */}
      {projects.map((project) => (
        <Card
          key={project.id}
          sx={{
            mb: 2,
            backgroundColor: "#1e1e2f",
            color: "white",
            border: "1px solid #ff6b6b",
          }}
        >
          <CardContent>
            <Typography variant="h5">{project.name}</Typography>
            <Typography sx={{ mt: 1 }}>{project.description}</Typography>
            <Typography sx={{ mt: 1 }}>Status: {project.status}</Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setEditingId(project.id);
                  setName(project.name);
                  setDescription(project.description);
                  setStatus(project.status);
                }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setSelectedId(project.id);
                  setOpenDelete(true);
                }}
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Delete Confirmation Modal */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this project?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              deleteProject(selectedId);
              setOpenDelete(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Projects;