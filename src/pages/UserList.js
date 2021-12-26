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
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const tableStyle = {
 marginTop:"50px"
};

export default function BasicTable() {
  let apiUrl = `/api/users?page=1`;

  const { response, loading } = useAxios({ url: apiUrl });
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const handleOpen = (user) => {
    console.log(JSON.stringify(user));
    setUser(user);
    setOpen(true);
  };

  function handleChange(evt) {
    const value = evt.target.value;
    console.log(value);
    setUser({
      ...user,
      [evt.target.name]: value,
    });
  }

  async function deleteUser(id) {
    return fetch(`https://reqres.in/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e),
    }).then((data) => JSON.stringify(data));
  }

  const handleDeleteUser = async (row, users) => {
    console.log(users);
    let data = await deleteUser(row.id);
    var filteredUser = users.filter(function (value, index, arr) {
      return value.id != row.id;
    });
    setUsers(filteredUser);
    console.log(`Delete User ==== ${data}`);
  };

  async function updateUser(user) {
    let UpdateData = {
      name: user.first_name,
      job: "Software Engineer",
    };
    return fetch(`https://reqres.in/api/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpdateData),
    }).then((data) => JSON.stringify(data));
  }

  const handleClose = () => setOpen(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let userData = {
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    await updateUser(user);

    let userArray = [];
    let obj = {};
    for (let i = 0; i < users.length; i++) {
      console.log(`ids ==== ${users[i]?.id}`);
      if (users[i]?.id === user.id) {
        obj = {
          id: user.id,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          avatar: user.avatar,
        };
        console.log(`User Obj = ${JSON.stringify(obj)}`);
      } else {
        obj = {
          id: users[i]?.id,
          email: users[i]?.email,
          first_name: users[i]?.first_name,
          last_name: users[i]?.last_name,
          avatar: users[i]?.avatar,
        };
        console.log(`User Obj new = ${JSON.stringify(obj)}`);
      }
      userArray.push(obj);
    }
    console.log(`user array ==== ${userArray}`);
    setUsers(userArray);
    handleClose();

    console.log(`Information ==== ${JSON.stringify(userData)}`);
  };

  return (
    <>
      <>
        <Header />
      </>
      <div style={tableStyle}>
        <TableContainer component={Paper}>
          <Table
            style={tableStyle}
            // sx={tableStyle}
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
                    <Button
                      onClick={() => {
                        handleOpen(row);
                      }}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Edit User
                        </Typography>
                        <Box
                          component="form"
                          noValidate
                          onSubmit={handleSubmit}
                          sx={{ mt: 3 }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                autoComplete="given-name"
                                name="first_name"
                                required
                                fullWidth
                                id="firstName"
                                autoFocus
                                value={user.first_name}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                fullWidth
                                id="lastName"
                                name="last_name"
                                autoComplete="family-name"
                                value={user.last_name}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                autoComplete="email"
                                value={user.email}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Save
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                    <ul />
                    <Button
                      onClick={() => {
                        handleDeleteUser(row, users);
                      }}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
