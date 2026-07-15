import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import KPICard from "../components/KPICard";
import StatsChart from "../components/StatsChart";
import RecentProjects from "../components/RecentProjects";
import SurveyTable from "../components/SurveyTable";

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    surveys: 0,
    competitors: 0,
    reports: 0,
  });

  const [projectCount, setProjectCount] = useState(0);
  const [surveyCount, setSurveyCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/projects/count`)
      .then((res) => res.json())
      .then((data) => setProjectCount(data.count));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/projects/surveys/count`)
    .then((res) => res.json())
    .then((data) => setSurveyCount(data.count))
    .catch((err) => console.error(err));
}, []);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/projects/questions/count`)
    .then((res) => res.json())
    .then((data) => setQuestionCount(data.count))
    .catch((err) => console.error(err));
}, []);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/projects/responses/count`)
    .then((res) => res.json())
    .then((data) => setResponseCount(data.count))
    .catch((err) => console.error(err));
}, []);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/projects/responses/count`)
    .then((res) => res.json())
    .then((data) => setResponseCount(data.count))
    .catch((err) => console.error(err));
}, []);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <KPICard
          title="Projects"
          value={projectCount}
          color="#ff2d2d"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <KPICard
          title="Surveys"
          value={surveyCount}
          color="#ff5722"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <KPICard
          title="Questions"
          value={questionCount}
          color="#ff9800"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <KPICard
          title="Responses"
          value={responseCount}
          color="#f44336"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <StatsChart />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <RecentProjects />
      </Grid>

      <Grid size={12}>
        <SurveyTable />
      </Grid>
    </Grid>
  );
}