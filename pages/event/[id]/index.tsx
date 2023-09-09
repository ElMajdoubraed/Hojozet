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
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "@/utils/moment";
import NotFound from "@/pages/404";
import { message } from "antd";

export default function Event() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState({}) as any;
  React.useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/event/${id}/handle`)
      .then((res) => {
        setEvent(res.data?.event);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteEvent = async () => {
    if (!id) return;
    if (!confirm("هل انت متأكد من حذف الفعالية؟")) return;
    message.loading({ content: "جاري حذف الفعالية", key: "deleteEvent" });

    await axios
      .delete(`/api/event/${id}`)
      .then((res) => {
        message.success("تم حذف الفعالية بنجاح");
        router.push("/user/dashboard/events");
      })
      .catch((err) => {
        message.error("حدث خطأ اثناء حذف الفعالية");
        console.log(err);
      });
  };

  const handleReservation = async () => {
    if (!id) return;
    if (!user) return;
    if (!confirm("هل انت متأكد من حجز الفعالية؟")) return;
    message.loading({ content: "جاري الحجز", key: "reservation" });
    await axios
      .post(`/api/event/${id}/handle`, {
        name: user?.name,
        user_id: user.id,
        event_id: id,
      })
      .then((res) => {
        message.success("تم حجز الفعالية بنجاح");
      })
      .catch((err) => {
        message.error(
          "حدث خطأ اثناء حجز الفعالية ربما لا يوجد تذاكر متاحة أو انك قمت بحجزها مسبقاً"
        );
        console.log(err);
      });
  };

  if (!event) return <NotFound />;
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
              src={uploadUrl + "/" + event?.logo}
              style={{
                width: "5rem",
                height: "5rem",
                marginBottom: "1.5rem",
              }}
            />
            <Typography color="secondary">{event?.name}</Typography>
          </Grid>
          <Grid className="mb-5" item xs={12} md={6}>
            <Typography className="mb-5" color="secondary">
              <Place /> {event?.location}
            </Typography>
            <Typography className="mb-5" color="secondary">
              <EventIcon /> {event?.date && moment(event?.date).format("LLLL")}
            </Typography>
            <Typography className="mb-5" color="secondary">
              <MoneyOff /> {event?.price}
            </Typography>
            <Typography className="mb-5" color="secondary">
              <Description /> {event?.description}
            </Typography>
            <Link className="mb6" href={`/event/${id}/posts`}>
              <Typography color="secondary">
                <PostAdd /> المنشورات
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            {event?.userId === user?.id ? (
              <>
                <Box
                  sx={{
                    marginBottom: "1rem",
                  }}
                >
                  <Link href={`/event/${id}/addpost`}>
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
                    onClick={deleteEvent}
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
                  <Link href={`/event/${id}/reservations`}>
                    <Button fullWidth variant="outlined" color="secondary">
                      عرض الحجوزات
                    </Button>
                  </Link>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  marginBottom: "1rem",
                }}
              >
                <Button
                  onClick={handleReservation}
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  احجز الان
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
