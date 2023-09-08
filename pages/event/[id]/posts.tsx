import { PageLayout } from "@/layouts";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Typography as Typo } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { map } from "lodash";
import moment from "@/utils/moment";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    axios.get(`/api/event/${id}/posts`).then((res) => {
      setPosts(res.data.posts);
    });
  }, [id]);

  return (
    <>
      <Head>
        <title>المشاركات - حجوزات</title>
      </Head>
      <PageLayout title="title.posts">
        <List sx={{ width: "100%", bgcolor: "#f1f1f1" }}>
          {map(posts, (post: any, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      {post?.title}
                      <Typo
                        style={{
                          fontSize: "0.9rem !important",
                        }}
                        color="secondary"
                        align="right"
                      >
                        {moment(post?.createdAt).fromNow()}
                      </Typo>
                    </>
                  }
                  secondary={
                    <span
                      style={{
                        marginBottom: 2,
                        marginTop: 12,
                      }}
                    >{`${post.content}`}</span>
                  }
                />
              </ListItem>
              {index !== posts.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </PageLayout>
    </>
  );
}
