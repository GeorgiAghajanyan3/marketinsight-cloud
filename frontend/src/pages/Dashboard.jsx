import { Grid } from "@mui/material";
import KPICard from "../components/KPICard";
import StatsChart from "../components/StatsChart";
import RecentProjects from "../components/RecentProjects";
import SurveyTable from "../components/SurveyTable";

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <KPICard title="Projects" value="24" color="#ff2d2d" />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <KPICard title="Surveys" value="156" color="#ff5722" />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <KPICard title="Competitors" value="78" color="#ff9800" />
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <KPICard title="AI Reports" value="19" color="#f44336" />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <StatsChart />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <RecentProjects />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <SurveyTable />
      </Grid>
    </Grid>
  );
}