import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../common/Header.js";
import { useEffect, useState } from "react";
import useAxios from "../hooks/userAxios";
import { Button, CircularProgress, Typography, Box } from "@mui/material";

export default function BasicTable() {
  let apiUrl = `/api/users?page=1`;

  const { response, loading } = useAxios({ url: apiUrl });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(`Response === ${JSON.stringify(response?.data)}`);
    if (response?.data.length) {
      setUsers(response.data);
    }
  }, [response]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* <Header/> */}
      <TableContainer component={Paper}>
        <Table
          style={{ width: 1700 }}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">id</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.first_name}</TableCell>
                <TableCell align="left">{row.last_name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">
                  <img src={row.avatar} alt="new" />
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                  <ul/>
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}