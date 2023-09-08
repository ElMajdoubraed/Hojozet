import { PageLayout } from "@/layouts";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { IconButton } from "@mui/material";
import { DeleteIcon, EyeIcon, EditIcon } from "@/components/icons";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { map } from "lodash";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "@/utils/moment";
import { message } from "antd";
import useAuth from "@/hooks/useAuth";

export default function Events() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [events, setEvents] = useState([]) as any[];
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/event`)
      .then((res) => {
        console.log(res.data);
        setEvents(res.data?.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changed]);

  const handleDelete = (id: number) => {
    if (!confirm("هل انت متأكد من حذف الفعالية؟")) return;
    message.loading("جاري حذف الفعالية");
    axios
      .delete(`/api/event/${id}`)
      .then((res) => {
        message.success("تم حذف الفعالية بنجاح");
        setChanged(!changed);
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء حذف الفعالية");
        console.log(err);
      });
  };
  function eventsReservations(id: number) {
    axios
      .get(`/api/ticket/${id}/number`)
      .then((res) => {
        const count = res.data;
        alert(`عدد الحجوزات لهذه الفعالية هو ${count}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Head>
        <title>حجوزات - الفعاليات</title>
      </Head>
      <PageLayout title="title.events">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">اسم الفعالية</TableCell>
                <TableCell align="right">تاريخ الفعالية</TableCell>
                <TableCell align="right">عدد الحجوزات</TableCell>
                <TableCell align="right">رابط الحجوزات</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(events, (event, index) => (
                <TableRow
                  key={event.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right" scope="row">
                    {event?.name}
                  </TableCell>
                  <TableCell align="right">
                    {moment(event?.date).format("LLL")}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => eventsReservations(event?.id)}
                      variant="outlined"
                      color="secondary"
                    >
                      عدد الحجوزات
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <a href={`/event/${event?.id}/reservations`}>
                      <Button variant="contained" color="primary">
                        رابط الحجوزات
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      className="space"
                      onClick={() => {
                        handleDelete(event.id);
                      }}
                    >
                      <DeleteIcon size={20} fill="#ff1744" />
                    </IconButton>
                    <Link className="space" href={`/event/${event.id}`}>
                      <IconButton>
                        <EyeIcon size={20} fill="#379683" />
                      </IconButton>
                    </Link>
                    <Link className="space" href={`/event/${event.id}/update`}>
                      <IconButton>
                        <EditIcon size={20} fill="#05386b" />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PageLayout>
    </>
  );
}
