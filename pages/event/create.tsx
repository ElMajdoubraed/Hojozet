import { FileInput, TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Avatar, Button } from "@material-ui/core";
import { Grid, Stack } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function CreateEvent() {
  const [primary, setPrimary] = React.useState("#5cdb95");
  const [secondary, setSecondary] = React.useState("#05386B");
  return (
    <>
      <Head>
        <title>حجوزات - انشاء فعالية</title>
      </Head>
      <PageLayout title="title.crateEvent">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FileInput
              label="صورة الفعالية"
              name="image"
              accept="image/*"
              required
              onChange={(e) => {}}
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
            <Avatar />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextInput
              label="اسم الفعالية"
              focused
              name="name"
              required
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              label="المكان"
              name="place"
              required
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              type="date"
              label="التاريخ"
              focused
              name="date"
              required
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput
              label="سعر التذكرة"
              name="price"
              type="number"
              required
              defaultValue={0}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput
              label="عدد التذاكر"
              name="tickets"
              type="number"
              required
              defaultValue={0}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextInput
              label="اللون الاول"
              name="primary"
              type="color"
              required
              defaultValue={primary}
              onChange={(e) => setPrimary(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextInput
              label="اللون الثاني"
              name="secondary"
              type="color"
              required
              defaultValue={secondary}
              onChange={(e) => setSecondary(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextInput
              label="وصف الفعالية"
              name="description"
              required
              multiline
              rows={4}
              onChange={(e) => {}}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="contained" color="primary">
              انشاء
            </Button>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
