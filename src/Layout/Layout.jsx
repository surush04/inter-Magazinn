import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Catalog from "../pages/Catalog/Catalog";
import Stack from "@mui/material/Stack";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// drawer

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// MAP

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getcategories } from "../api/Home/HomeApi";
import { data } from "autoprefixer";
import { setSubData } from "../reducers/Home/Home";
import { Modal, TextField } from "@mui/material";
import { axiosRequest } from "../utils/axiosRequest";
import { saveToken } from "../../src/utils/token";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Layout = () => {
  const navigate = useNavigate();
  // login
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newUser = {
      userName: e.target["name"].value,
      password: e.target["password"].value,
    };

    try {
      const { data } = await axiosRequest.post("Account/login", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      saveToken(data.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //mui
  const [login, setLogin] = React.useState(false);

  const openLogin = () => {
    setLogin(true);
  };

  const closeLogin = () => {
    setLogin(false);
  };

  let dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getcategories());
  }, [dispatch]);
  const data2 = useSelector((store) => store.Home.data2);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const subData = useSelector((store) => store.Home.subData);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <div className="flex">
        <div className="flex flex-col  gap-7 px-[5%] w-[700px] h-[100vh] overflow-auto">
          <div className="flex flex-col items-center justify-center ">
            <Link to={"/"}>
              <img src="src/img/logotip.jpg" alt="" className="w-[70px]" />
            </Link>
            <h1 className="text-[green] text-[20px]  relative bottom-4 font-serif">
              Surush
            </h1>
          </div>
          {data2?.map((elem) => {
            return (
              <div
                onMouseEnter={() => dispatch(setSubData(elem.subCategories))}
                className="flex items-center gap-4"
              >
                <img
                  className="w-[40px] h-[40px] rounded-[50px]"
                  src={`${import.meta.env.VITE_APP_FILES_URL}${
                    elem.categoryImage
                  }`}
                  alt=""
                />
                <button className="px-[5%] h-[40px] font-semibold rounded-md hover:bg-slate-200 hover:text-green-500 text-start">
                  {elem?.categoryName}
                </button>
              </div>
            );
          })}
        </div>
        <div className=" flex justify-center items-center  w-[100%] h-[100vh]">
          <div className="flex w-[90%] gap-[60px]   bg-white flex-wrap">
            {subData.map((elem) => {
              return (
                <h1 key={elem.id} className="font-semibold w-[200px] ">
                  {elem.subCategoryName}
                </h1>
              );
            })}
          </div>
        </div>
      </div>
    </Box>
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        {/* header */}
        <header className="w-[100%] shadow-lg h-[14vh] flex sticky z-20 top-0 bg-white justify-evenly items-center  ">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center ">
            <Link to={"/"}>
              <img src="src/img/logotip.jpg" alt="" className="w-[70px]" />
            </Link>
            <h1 className="text-[green] text-[20px] relative bottom-4 font-serif">
              Surush
            </h1>
          </div>

          {/* buttonCatalog */}
          <Button variant="contained" color="success">
            <div>
              {["top"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <div className="flex items-center">
                    <MenuIcon onClick={toggleDrawer(anchor, true)}></MenuIcon>
                    <div className="sm:hidden">
                      <Button onClick={toggleDrawer(anchor, true)}>
                        <p className="text-[white]"> Каталог товаров</p>
                      </Button>
                    </div>
                  </div>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </Button>
          {/* Input for Search */}

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "green" }}
              className=""
              placeholder="Search ........"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon className="hover:text-green-600 ]" />
            </IconButton>

            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            ></IconButton>
          </Paper>
          {/* Location/Account/Shopping */}
          <div className="flex gap-5">
            <div className="sm:hidden flex flex-col justify-center items-center hover:text-green-600   ">
              <AddLocationOutlinedIcon
                onClick={handleClickOpen}
                className="hover:text-green-600  "
              ></AddLocationOutlinedIcon>
              <p className="font-semibold">Darvoz</p>
            </div>
            <React.Fragment>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  <div className="flex flex-col items-center justify-center ">
                    <Link to={"/"}>
                      <img
                        src="src/img/logotip.jpg"
                        alt=""
                        className="w-[70px]"
                      />
                    </Link>
                    <h1 className="text-[green] text-[20px] relative bottom-4 font-serif">
                      Surush
                    </h1>
                  </div>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-16">
                      <Button
                        className="w-[200px] "
                        variant="contained"
                        color="success"
                      >
                        Darvoz
                      </Button>
                      <Button
                        className="w-[200px]"
                        variant="contained"
                        color="success"
                      >
                        Dushanbe
                      </Button>
                    </div>
                    <div className="flex gap-16">
                      <Button
                        className="w-[200px]"
                        variant="contained"
                        color="success"
                      >
                        Khujand
                      </Button>
                      <Button
                        className="w-[200px]"
                        variant="contained"
                        color="success"
                      >
                        Kulob
                      </Button>
                    </div>
                    <div className="flex gap-16">
                      <Button
                        className="w-[200px]"
                        variant="contained"
                        color="success"
                      >
                        Bokhtar
                      </Button>
                      <Button
                        className="w-[200px]"
                        variant="contained"
                        color="success"
                      >
                        Istarafshan
                      </Button>
                    </div>
                    <div className="flex gap-16">
                      <Button
                        className="w-[200px]"
                        variant="contained"
                        color="success"
                      >
                        Vahadat
                      </Button>
                      <Button
                        className="w-[200px]"
                        variant="contained"
                        color="success"
                      >
                        Tursunzoda
                      </Button>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleClose}>
                    Save changes
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </React.Fragment>
            <div
              className="flex flex-col justify-center items-center hover:text-green-600 sm:hidden "
              onClick={openLogin}
            >
              <AccountCircleOutlinedIcon className="hover:text-green-600"></AccountCircleOutlinedIcon>
              <p className="font-semibold">Войти</p>
            </div>
            <div className="sm:hidden flex flex-col justify-center items-center hover:text-green-600   ">
              <Link to={"/Basket"}>
                <ShoppingCartOutlinedIcon className="hover:text-green-600"></ShoppingCartOutlinedIcon>
              </Link>
              <p className="font-semibold">Корзина</p>
            </div>
          </div>
        </header>
        {/* OutLink */}
        <div>
          <Outlet></Outlet>
        </div>

        {/* Footer */}
        <footer className="bg-[black] text-[white] sm:flex-wrap  flex justify-evenly">
          {/* Cards */}
          <div className="">
            <ul>
              <li className="m-[30px] hover:text-green-500">
                Телефоны справочной службы
              </li>
              <li className="m-[30px] hover:text-green-500">900</li>
              <li className="m-[30px] hover:text-green-500">
                +992 48-888-1111
              </li>
              <li className="m-[30px] hover:text-green-500">@alifshop_tj</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="m-[30px] hover:text-green-500">Каталог товаров</li>
              <li className="m-[30px] hover:text-green-500">Смартфоны</li>
              <li className="m-[30px] hover:text-green-500">Телевизоры</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="m-[30px] hover:text-green-500">
                Стиральные машины
              </li>
              <li className="m-[30px] hover:text-green-500">Кондиционеры</li>
              <li className="m-[30px] hover:text-green-500">Кондиционеры</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="m-[30px] hover:text-green-500">Мы в соцмедиа</li>
              <li className="m-[30px] hover:text-green-500">FaceBook</li>
              <li className="m-[30px] hover:text-green-500">Instagramm</li>
              <li className="m-[30px] hover:text-green-500">Telegram</li>
            </ul>
          </div>
        </footer>
      </div>
      <div className="w-[100%] shadow-lg h-[14vh] hidden sm:flex fixed mt-[460px] z-30 top-0 bg-white justify-evenly items-center  ">
        {" "}
        <div className="flex gap-5">
          <div className=" flex flex-col justify-center items-center hover:text-green-600   ">
            <AddLocationOutlinedIcon
              onClick={handleClickOpen}
              className="hover:text-green-600  "
            ></AddLocationOutlinedIcon>
            <p className="font-semibold">Darvoz</p>
          </div>
          <React.Fragment>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                <div className="flex flex-col items-center justify-center ">
                  <Link to={"/"}>
                    <img
                      src="src/img/logotip.jpg"
                      alt=""
                      className="w-[70px]"
                    />
                  </Link>
                  <h1 className="text-[green] text-[20px] relative bottom-4 font-serif">
                    Surush
                  </h1>
                </div>
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-16">
                    <Button
                      className="w-[200px] "
                      variant="contained"
                      color="success"
                    >
                      Darvoz
                    </Button>
                    <Button
                      className="w-[200px]"
                      variant="contained"
                      color="success"
                    >
                      Dushanbe
                    </Button>
                  </div>
                  <div className="flex gap-16">
                    <Button
                      className="w-[200px]"
                      variant="contained"
                      color="success"
                    >
                      Khujand
                    </Button>
                    <Button
                      className="w-[200px]"
                      variant="contained"
                      color="success"
                    >
                      Kulob
                    </Button>
                  </div>
                  <div className="flex gap-16">
                    <Button
                      className="w-[200px]"
                      variant="contained"
                      color="success"
                    >
                      Bokhtar
                    </Button>
                    <Button
                      className="w-[200px]"
                      variant="contained"
                      color="success"
                    >
                      Istarafshan
                    </Button>
                  </div>
                  <div className="flex gap-16">
                    <Button
                      className="w-[200px]"
                      variant="contained"
                      color="success"
                    >
                      Vahadat
                    </Button>
                    <Button
                      className="w-[200px]"
                      variant="contained"
                      color="success"
                    >
                      Tursunzoda
                    </Button>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Save changes
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </React.Fragment>
          <div
            onClick={openLogin}
            className="flex flex-col justify-center items-center hover:text-green-600  "
          >
            <AccountCircleOutlinedIcon className="hover:text-green-600"></AccountCircleOutlinedIcon>
            <p className="font-semibold">Войти</p>
          </div>
          <div className=" flex flex-col justify-center items-center hover:text-green-600   ">
            <Link to={"/Basket"}>
              <ShoppingCartOutlinedIcon className="hover:text-green-600"></ShoppingCartOutlinedIcon>
            </Link>
            <p className="font-semibold">Корзина</p>
          </div>
        </div>
      </div>

      <Dialog open={login} onClose={closeLogin}>
        <div className="px-[20px] py-[20px] w-[350px]">
          <div className="flex items-centr justify-between">
            <h1 className="font-[700]">Вxoд</h1>
            <CloseIcon onClick={closeLogin} className="hover:text-[#48a067]" />
          </div>

          <div className="flex flex-col items-center py-[20px] pt-[40px]">
            <div className="w-[240px] tracking-[0.5px] flex flex-col items-center  gap-[10px]">
              <h1 className="text-center font-[700]">Введите имя и пароль</h1>
            </div>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-[20px]"
          >
            <TextField
              placeholder="Name"
              type="text"
              label="Name*"
              id="name"
              name="name"
              autoFocus
              autoComplete="name"
            />
            <TextField
              placeholder="Password"
              type="password"
              label="Password*"
              id="password"
              name="password"
              autoFocus
              autoComplete="password"
            />
            <button
              className="py-[16px] bg-[#F3F4F5] hover:bg-[#48a067] hover:text-white rounded-[8px] font-[700]"
              onClick={closeLogin}
              type="submit"
            >
              Войти
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default Layout;
