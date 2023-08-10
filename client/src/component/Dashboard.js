import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import MuiAppBar from "@mui/material/AppBar";
import ShareIcon from '@mui/icons-material/Share';
import Toolbar from "@mui/material/Toolbar";
import ReactModal from 'react-modal';
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { DataGrid } from '@mui/x-data-grid';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "./ListItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Upload from "./Upload";
import Profile from './Profile';
import { Button } from "@mui/material";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  }, { field: 'Download', headerName: 'Download', width: 130 },

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, Download: 'Download File' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, Download: 'Download File' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, Download: 'Download File' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, Download: 'Download File' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, Download: 'Download File' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, Download: 'Download File' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, Download: 'Download File' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, Download: 'Download File' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, Download: 'Download File' },
];


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAccessOpen, setIsAccessOpen] = React.useState(false);
  const [uid, setUid] = React.useState(null);
  const [duration, setDuration] = React.useState(0);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [option, setOption] = React.useState("Dashboard");

  const handleButton = (e) => {

    setOption(e.target.innerText);
    console.log(option);
  }

  const handleShare = (e) => {

    console.log(duration);

  }

  const handleDelete = (e) =>{
    console.log(selected);
  }

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    // Array
    console.log(selectedRowsData);
    setSelected(selectedRowsData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              textAlign={"center"}
            >
              Medi Check
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" onClick={handleButton}>{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            marginTop: "90px"
          }}
        >

          {option == "Dashboard" && <>
            {selected.length != 0 && <button onClick={(e) => setIsOpen(!isOpen)}>
              Share
            </button>}
            {selected.length != 0 && <button onClick={(e) => setIsAccessOpen(!isAccessOpen)}>
              Check Share Access
            </button>}
            {selected.length != 0 && <button onClick={handleDelete}>
              Delete
            </button>}

            <ReactModal
              isOpen={isOpen}
              contentLabel="Example Modal"
            >

              <Card sx={{ maxWidth: 345, marginLeft: '500px', marginTop: '100px' }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }

                  title="User Name"
                  subheader={new Date().getDate() + " / " + (new Date().getMonth() + 1) + " / " + new Date().getFullYear()}
                />


                <CardContent>
                  {"Total File Selected " + selected.length}
                  {selected.map((e) => {
                    return (
                      <Typography variant="body2" color="text.secondary">
                        {e.firstName}
                      </Typography>
                    )
                  })
                  }
                </CardContent>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="UID"
                  label="UID"
                  name="UID"
                  autoFocus
                  onChange={(e) => setUid(e.target.value)}
                />
                <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={duration}
                  label="Age"
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <MenuItem value="1">1 Days</MenuItem>
                  <MenuItem value="2">2 Days</MenuItem>
                  <MenuItem value="4">4 Days</MenuItem>
                  <MenuItem value="6">6 Days</MenuItem>
                  <MenuItem value="8">8 Days</MenuItem>
                  <MenuItem value="10">10 Days</MenuItem>
                </Select>
                <div>
                  <Button onClick={handleShare}> Share </Button>
                  <Button onClick={(e) => setIsOpen(!isOpen)}> Close </Button>
                </div>
              </Card>


            </ReactModal>

            <ReactModal
              isOpen={isAccessOpen}
              contentLabel="Example Modal"
            >

              <Card sx={{ maxWidth: 345, marginLeft: '500px', marginTop: '100px' }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }

                  title="User Name"
                  subheader={new Date().getDate() + " / " + (new Date().getMonth() + 1) + " / " + new Date().getFullYear()}
                />


                <CardContent>
                  {"Total File Selected " + selected.length}
                  {selected.map((e) => {
                    return (
                      <Typography variant="body2" color="text.secondary">
                        {e.firstName}
                      </Typography>
                    )
                  })
                  }
                </CardContent>

                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="UID"
                      label="UID"
                      name="UID"
                      disabled
                      autoFocus
                      onChange={(e) => setUid(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DeleteIcon sx={{marginTop:'30px'}} />
                    {/* <h1>Hi</h1> */}
                  </Grid>

                  </Grid>





                <div>
               
                  <Button onClick={(e) => setIsAccessOpen(!isAccessOpen)}> Close </Button>
                </div>
              </Card>


            </ReactModal>

            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}

            />

          </>
          }

          {option == "Upload" &&

            <Upload />

          }

          {option == "Profile" &&

            <Profile />

          }


        </Box>
      </Box>
    </ThemeProvider>
  );
}