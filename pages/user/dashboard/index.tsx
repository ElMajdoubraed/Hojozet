//estimated balance
//total events created (link for it /dashboard/events)
//total reservations created (link for it /dashboard/tickets)
// evented created by time (chart line)
// reservations created by time (chart line)
// events bu number of tickets (chart pie)
import { LineChart, PieChart } from "@/components/charts";
import { PageLayout } from "@/layouts";
import { Typography } from "@material-ui/core";
import { Divider, Grid } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";

const StyledDivider = styled(Divider)`
  margin-top: 65px !important;
  margin-bottom: 65px !important;
`;

export default function Dashboard() {
  return (
    <PageLayout title="title.dashboard">
      <Head>
        <title> لوحة التحكم - حجوزات</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="left"> الرصيد الكلي</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="left" color="primary">
            {" "}
            0.00 $
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            color="secondary"
            style={{
              fontSize: "13px",
            }}
            align="left"
          >
            المبلغ الذي حققته من بيع التذاكر .
          </Typography>
          <StyledDivider />
        </Grid>
        <Grid item xs={12}>
          <PieChart />
          <StyledDivider />
        </Grid>
        <Grid item xs={12}>
          <LineChart />
        </Grid>
      </Grid>
    </PageLayout>
  );
}
