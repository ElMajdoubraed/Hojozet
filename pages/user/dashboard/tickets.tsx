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
import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
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
  useEffect(() => {
    axios
      .get(`/api/user/tickets`)
      .then((res) => {
        setReservations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  key={reservation.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">
                    <a href={`/event/1`}>
                      <Button variant="contained" color="primary">
                        رابط الفعالية
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell align="right" scope="row">
                    {reservation.userName}
                  </TableCell>
                  <TableCell align="right">{reservation.date}</TableCell>
                  <TableCell align="right">
                    <a href={`/event/1/reservations/${reservation.id}`}>
                      <Button variant="outlined" color="secondary">
                        رابط الحجز
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => {}}>
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
