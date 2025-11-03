import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import AnalyticsTable from 'sections/analytics/default/AnalyticsTable';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function AnalyticsDefault() {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      {/* row 3 */}
      <Grid size={{ xs: 12 }}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <AnalyticsTable />
        </MainCard>
      </Grid>
    </Grid>
  );
}
