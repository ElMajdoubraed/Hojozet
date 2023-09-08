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
export default function Events() {
  const events = [
    {
      id: 1,
      eventName: "user1",
      date: "2021-10-10",
    },
    {
      id: 1,
      eventName: "user1",
      date: "2021-10-10",
    },
    {
      id: 1,
      eventName: "user1",
      date: "2021-10-10",
    },
    {
      id: 1,
      eventName: "user1",
      date: "2021-10-10",
    },
    {
      id: 1,
      eventName: "user1",
      date: "2021-10-10",
    },
    {
      id: 1,
      eventName: "user1",
      date: "2021-10-10",
    },
    {
      id: 1,
      eventName: "user1",
      date: "2021-10-10",
    },
  ];
  //how much events (onclick send api)
  function eventsReservations() {}
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
                    {event.eventName}
                  </TableCell>
                  <TableCell align="right">{event.date}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={eventsReservations}
                      variant="outlined"
                      color="secondary"
                    >
                      عدد الحجوزات
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <a href={`/event/1/reservations`}>
                      <Button variant="contained" color="primary">
                        رابط الحجوزات
                      </Button>
                    </a>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton className="space" onClick={() => {}}>
                      <DeleteIcon size={20} fill="#ff1744" />
                    </IconButton>
                    <Link className="space" href={`/event/${event.id}`}>
                      <IconButton>
                        <EyeIcon size={20} fill="#379683" />
                      </IconButton>
                    </Link>
                    <Link className="space" href={`/event/${event.id}/edit`}>
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
