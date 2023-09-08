import { PageLayout } from "@/layouts";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { IconButton } from "@mui/material";
import { DeleteIcon } from "@/components/icons";
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
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "@/utils/moment";
import { message } from "antd";
import useAuth from "@/hooks/useAuth";

export default function Tickets() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const [reservations, setReservations] = useState([]) as any[];
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/user/tickets`)
      .then((res) => {
        setReservations(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changed]);

  const handleDelete = async (id: number) => {
    if (!confirm("هل انت متأكد من حذف الحجز؟")) return;
    message.loading("جاري حذف الحجز");
    await axios
      .delete(`/api/ticket/${id}`)
      .then((res) => {
        message.success("تم حذف الحجز بنجاح");
        setChanged(!changed);
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء حذف الحجز");
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>حجوزات - حجوزات الفعالية</title>
      </Head>
      <PageLayout title="title.reservations">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"> رابط الفعالية</TableCell>
                <TableCell align="right">اسم الحجز</TableCell>
                <TableCell align="right">تاريخ الحجز</TableCell>
                <TableCell align="right">رابط الحجز</TableCell>
                <TableCell align="right">حذف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(reservations, (reservation, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">
                    <a href={`/event/${reservation.eventId}`}>
                      <Button variant="contained" color="primary">
                        رابط الفعالية
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell align="right" scope="row">
                    {reservation.ticketName}
                  </TableCell>
                  <TableCell align="right">
                    {moment(reservation.createdAt).format("LLL")}
                  </TableCell>
                  <TableCell align="right">
                    <a href={`/ticket/${reservation.code}`}>
                      <Button variant="outlined" color="secondary">
                        رابط الحجز
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        handleDelete(reservation.code);
                      }}
                    >
                      <DeleteIcon size={20} fill="#ff1744" />
                    </IconButton>
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
