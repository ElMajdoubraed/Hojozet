import { PageLayout } from "@/layouts";
import Head from "next/head";
import { Button, Typography, Avatar } from "@material-ui/core";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import moment from "@/utils/moment";
import { useQRCode } from "next-qrcode";
import NotFound from "@/pages/404";

export default function Ticket() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const { Canvas } = useQRCode();
  const [ticket, setTicket] = useState({}) as any;
  const [event, setEvent] = useState() as any;
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/ticket/${id}`)
      .then((res) => {
        setTicket(res.data);
        setEvent(res.data.event);
      })
      .catch((err) => setTicket());
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!ticket) return <NotFound />;
  return (
    <>
      <Head>
        <title>حجوزات - تذكرة</title>
      </Head>
      <PageLayout title={event?.name}>
        <Grid
          container
          sx={{
            padding: "2rem",
          }}
        >
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
            <Typography
              style={{
                color: "grey !important",
                fontSize: "0.9rem",
                marginTop: "-4rem",
              }}
            >
              {event?.description}
            </Typography>
          </Grid>
          <Grid xs={12} md={6} item>
            <Avatar
              className="mb-5"
              src={uploadUrl + "/" + event?.logo}
              style={{
                width: "4rem",
                height: "4rem",
                marginBottom: "1rem",
              }}
            ></Avatar>
            <Typography className="mb-5" color="secondary">
              تاريخ الحدث : {moment(event?.date).format("LLL")}
            </Typography>
            <Typography className="mb-5" color="secondary">
              مكان الحدث : {event?.location}
            </Typography>
          </Grid>
          <Grid xs={12} md={6} item>
            <Typography className="mb-5" color="secondary">
              رقم الحجز : {id}
            </Typography>
            <Typography className="mb-5" color="secondary">
              الحجز باسم : {user?.name}
            </Typography>
            <Typography className="mb-5" color="secondary">
              تاريخ الحجز : {moment(ticket?.createdAt).format("LLL")}
            </Typography>
          </Grid>
          <Grid
            sx={{
              marginTop: "1rem",
            }}
            item
            xs={12}
            md={6}
          >
            <Canvas
              text={"https://hojozet.elmajdoub.live" + router.asPath}
              options={{
                type: "image/jpeg",
                quality: 0.3,
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: event?.primary_color,
                  light: event?.secondary_color,
                },
              }}
            />
          </Grid>
          <Grid
            sx={{
              marginTop: "1rem",
            }}
            item
            xs={12}
            md={6}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "10rem",
                height: "3rem",
              }}
              onClick={handlePrint}
            >
              طباعة
            </Button>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
