import { TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NotFound from "@/pages/404";

export default function UpdateEvent() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState({}) as any;
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/event/${id}/handle`)
      .then((res) => {
        setEvent(res.data?.event);
        const { name, location, date, description } = res.data?.event;
        setName(name);
        setLocation(location);
        setDate(date);
        setDescription(description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!id) return;
    message.loading({ content: "جاري تعديل الفعالية", key: "updateEvent" });
    try {
      await axios
        .put(`/api/event/${id}`, {
          name,
          location,
          date: new Date(date),
          description,
        })
        .then((res) => {
          message.success("تم تعديل الفعالية بنجاح");
          router.push(`/event/${id}`);
        });
    } catch (err) {
      message.error("حدث خطأ اثناء تعديل الفعالية");
      console.log(err);
    }
  };

  if (!event) return <NotFound />;
  return (
    <>
      <Head>
        <title>حجوزات - تعديل فعالية</title>
      </Head>
      <PageLayout title="title.updateEvent">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextInput
                label="اسم الفعالية"
                focused
                name="name"
                value={name}
                required
                onChange={setName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                label="المكان"
                name="location"
                value={location}
                required
                focused
                onChange={setLocation}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                type="date"
                label="التاريخ"
                focused
                value={date?.split("T")[0]}
                name="date"
                required
                onChange={setDate}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextInput
                label="وصف الفعالية"
                name="description"
                value={description}
                required
                focused
                multiline
                rows={4}
                onChange={setDescription}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                تعديل
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </>
  );
}
