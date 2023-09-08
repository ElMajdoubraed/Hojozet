import { TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";

export default function CreatePost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!id) return;
    message.loading({ content: "جاري اضافة المنشور", key: "addPost" });
    try {
      await axios.post(`/api/event/${id}`, post).then((res) => {
        message.success({
          content: "تم اضافة المنشور بنجاح",
          key: "addPost",
        });
        router.push(`/event/${id}/posts`);
      });
    } catch (err) {
      message.error("حدث خطأ اثناء اضافة المنشور");
      console.log(err);
    }
    e.target.reset();
  };
  return (
    <>
      <Head>
        <title>حجوزات - اضافة منشور</title>
      </Head>
      <PageLayout title="title.addPost">
        <form onSubmit={handleSubmit}>
          <Grid container>
            <TextInput
              label="عنوان المنشور"
              name="title"
              required
              onChange={(e) => {
                setPost({ ...post, title: e });
              }}
            />
            <TextInput
              label="المحتوى"
              name="content"
              required
              multiline
              rows={4}
              onChange={(e) => {
                setPost({ ...post, content: e });
              }}
            />
            <Button type="submit" variant="contained" color="primary">
              اضافة
            </Button>
          </Grid>
        </form>
      </PageLayout>
    </>
  );
}
