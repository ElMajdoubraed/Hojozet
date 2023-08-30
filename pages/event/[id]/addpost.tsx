import { TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import Head from "next/head";

export default function CreatePost() {
  return (
    <>
      <Head>
        <title>حجوزات - اضافة منشور</title>
      </Head>
      <PageLayout title="title.addPost">
        <Grid container>
          <TextInput
            label="عنوان المنشور"
            name="title"
            required
            onChange={(e) => {}}
          />
          <TextInput
            label="المحتوى"
            name="content"
            required
            multiline
            rows={4}
            onChange={(e) => {}}
          />
          <Button variant="contained" color="primary">
            اضافة
          </Button>
        </Grid>
      </PageLayout>
    </>
  );
}
