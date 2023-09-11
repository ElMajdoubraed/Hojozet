import { Button, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
const Main = () => {
  return (
    <Grid
      id="main"
      style={{
        marginTop: 50,
        marginBottom: 50,
      }}
      container
      spacing={2}
    >
      <Grid className="main__typography" item xs={12} sm={6} md={6}>
        <Typography variant="h4" component="h1" gutterBottom>
          مرحبا بك في حجوزات
        </Typography>
        <Typography
          style={{
            marginBottom: 30,
            marginTop: 30,
            fontSize: 14,
            color: "#666",
          }}
        >
          حجوزات هي أفضل طريقة لإنشاء حجوزاتك على الإنترنت.
        </Typography>
        <Button variant="contained" color="primary">
          <Link href={"/event/create"}>ابدأ الان</Link>
        </Button>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        item
        xs={12}
        sm={6}
        md={6}
      >
        <img src="/images/home/home.gif" alt="حجوزات" />
      </Grid>
    </Grid>
  );
};

export default Main;
