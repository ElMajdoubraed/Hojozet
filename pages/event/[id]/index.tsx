import { PageLayout } from "@/layouts";
import { Avatar, Button, Typography } from "@material-ui/core";
import { Box, Grid, Button as Btn } from "@mui/material";
import {
  Place,
  Event as EventIcon,
  MoneyOff,
  Description,
  PostAdd,
} from "@mui/icons-material";
import Head from "next/head";
import Link from "next/link";

export default function Event() {
  return (
    <>
      <Head>
        <title>حجوزات - فعالية</title>
      </Head>
      <PageLayout title="title.event">
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
            <Typography color="secondary">اسم الفعالية</Typography>
          </Grid>
          <Grid className="mb-5" item xs={12} md={6}>
            <Typography className="mb-5" color="secondary">
              <Place /> المكان
            </Typography>
            <Typography className="mb-5" color="secondary">
              <EventIcon /> التاريخ
            </Typography>
            <Typography className="mb-5" color="secondary">
              <MoneyOff /> السعر
            </Typography>
            <Typography className="mb-5" color="secondary">
              <Description /> الوصف
            </Typography>
            <Link className="mb6" href="/event/1/posts">
              <Typography color="secondary">
                <PostAdd /> المنشورات
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                marginBottom: "1rem",
              }}
            >
              <Button fullWidth variant="contained" color="secondary">
                احجز الان
              </Button>
            </Box>
            <Box
              sx={{
                marginBottom: "1rem",
              }}
            >
              <Link href="/event/1/addpost">
                <Button fullWidth variant="contained" color="primary">
                  اضف منشور
                </Button>
              </Link>
            </Box>
            <Box
              sx={{
                marginBottom: "1rem",
              }}
            >
              <Btn
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: "#ff1744 !important",
                  color: "#ff1744 !important",
                }}
                color="error"
              >
                حذف الفعالية
              </Btn>
            </Box>
            <Box
              sx={{
                marginBottom: "1rem",
              }}
            >
              <Link href="/event/1/reservations">
                <Button fullWidth variant="outlined" color="secondary">
                  عرض الحجوزات
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
