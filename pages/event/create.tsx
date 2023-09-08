import { FileInput, TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Avatar, Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { message } from "antd";
import { uploadFile } from "@/hooks/useUpload";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export default function CreateEvent() {
  const [primary, setPrimary] = React.useState("#5cdb95");
  const [secondary, setSecondary] = React.useState("#05386B");
  const [logo, setLogo] = React.useState() as any;
  const [logoPreview, setLogoPreview] = React.useState() as any;
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [tickets, setTickets] = React.useState(0);
  const [description, setDescription] = React.useState("");

  const router = useRouter();
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const logoPreviewHandler = (event: any) => {
    try {
      if (event.target.files && event.target.files[0]) {
        setLogo(event.target.files[0]);
        setLogoPreview(URL.createObjectURL(event.target.files[0]) as any);
      }
    } catch (e) {}
  };

  const addEvent = async (e: any) => {
    e.preventDefault();
    try {
      message.loading({ content: "جاري انشاء الفعالية", key: "addEvent" });
      const uuid = uuidv4();
      await uploadFile(logo, `hojozet/event/${uuid}${".png"}`);
      console.log(new Date(date));
      await axios
        .post("/api/event", {
          name,
          logo: `hojozet/event/${uuid}${".png"}`,
          description,
          date: new Date(date),
          price: Number(price),
          number_of_tickets: Number(tickets),
          location,
          primary_color: primary,
          secondary_color: secondary,
        })
        .then((res) => {
          message.success("تم اضافة القائمة بنجاح");
          router.push(`/user/dashboard/events`);
        })
        .catch((e) => {
          message.error("حدث خطأ اثناء اضافة ");
        });
    } catch (e) {
      message.error("حدث خطأ اثناء اضافة ");
    }
    e.target.reset();
  };

  return (
    <>
      <Head>
        <title>حجوزات - انشاء فعالية</title>
      </Head>
      <PageLayout title="title.crateEvent">
        <form onSubmit={addEvent}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FileInput
                label="صورة الفعالية"
                name="image"
                accept="image/*"
                required
                onChange={logoPreviewHandler}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
              xs={12}
              md={6}
            >
              <Avatar variant="rounded" src={logoPreview} />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextInput
                label="اسم الفعالية"
                focused
                name="name"
                required
                onChange={setName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="المكان"
                name="location"
                required
                onChange={setLocation}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                type="date"
                label="التاريخ"
                focused
                name="date"
                required
                onChange={setDate}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput
                label="سعر التذكرة"
                name="price"
                type="number"
                required
                defaultValue={0}
                onChange={setPrice}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput
                label="عدد التذاكر"
                name="tickets"
                type="number"
                required
                defaultValue={0}
                onChange={setTickets}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextInput
                label="اللون الاول"
                name="primary"
                type="color"
                required
                defaultValue={primary}
                onChange={setPrimary}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextInput
                label="اللون الثاني"
                name="secondary"
                type="color"
                required
                defaultValue={secondary}
                onChange={setSecondary}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextInput
                label="وصف الفعالية"
                name="description"
                required
                multiline
                rows={4}
                onChange={setDescription}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                انشاء
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </>
  );
}
