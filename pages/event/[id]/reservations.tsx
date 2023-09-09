import { PageLayout } from "@/layouts";
import Head from "next/head";
import { Avatar, Button, Typography } from "@material-ui/core";
import { Grid, IconButton } from "@mui/material";
import { DeleteIcon } from "@/components/icons";
import { TextInput } from "@/components/inputs";
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
import { useRouter } from "next/router";
import axios from "axios";
import moment from "@/utils/moment";
import { message } from "antd";

export default function EventReservations() {
  const [reservations, setReservations] = useState([]) as any[];
  const [auxReservations, setAuxReservations] = useState([]) as any[];
  const [changed, setChanged] = useState(false) as any;
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/event/${id}/reservations`)
      .then((res) => {
        setReservations(res.data);
        setAuxReservations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, changed]);

  const handleSearch = (value: string) => {
    if (value === "") {
      setReservations(auxReservations);
      return;
    }
    const filtered = auxReservations.filter((_reservation: any) => {
      return _reservation.ticketName.includes(value);
    });
    setReservations(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!confirm("هل أنت متأكد من حذف هذا الحجز؟")) return;
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
        <Grid container sx={{ marginTop: "2rem" }}>
          <Grid className="mb-5" item xs={12}>
            <TextInput
              label="بحث"
              type="search"
              name="search"
              onChange={handleSearch}
            />
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">اسم المستخدم</TableCell>
                <TableCell align="right">تاريخ الحجز</TableCell>
                <TableCell align="right">رابط الحجز</TableCell>
                <TableCell align="right">حذف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(reservations, (reservation, index) => (
                <TableRow
                  key={reservation.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right" scope="row">
                    {reservation.ticketName}
                  </TableCell>
                  <TableCell align="right">
                    {moment(reservation.created_at).format("YYYY-MM-DD")}
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
