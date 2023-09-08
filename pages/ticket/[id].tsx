// show ticket, event, user data with print button, scan Qr code button
import { PageLayout } from "@/layouts";
import Head from "next/head";
import { Button, Typography, Avatar } from "@material-ui/core";
import { Grid } from "@mui/material";
export default function Ticket() {
  return (
    <>
      <Head>
        <title>حجوزات - تذكرة</title>
      </Head>
      <PageLayout title="title.ticket">
        <Grid container sx={{ marginTop: "2rem" }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "4rem",
            }}
            item
            xs={12}
            md={12}
          >
            <Avatar
              style={{
                width: "5rem",
                height: "5rem",
                marginBottom: "1.5rem",
              }}
            />
            <Typography color="secondary">event.name</Typography>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
