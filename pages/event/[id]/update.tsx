import { TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import Head from "next/head";
import React from "react";

export default function UpdateEvent() {
  return (
    <>
      <Head>
        <title>حجوزات - تعديل فعالية</title>
      </Head>
      <PageLayout title="title.updateEvent">
        <Grid container spacing={2}>
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
              تعديل
            </Button>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
