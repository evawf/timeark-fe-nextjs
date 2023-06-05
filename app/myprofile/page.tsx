"use client";
import React, { useState, useEffect } from "react";
import getUserProfile from "@/lib/fetchUser";
import User from "../../types/user";
import { useRouter } from "next/navigation";
import DeleteUser from "@/lib/DeleteUser";
import Sidebar from "../components/Sidebar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MyProfile() {
  const [userData, setUserData] = useState<User | any>();
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const fetchUserData = async (userId: string) => {
    const res = await getUserProfile(userId);
    const user: User = res.user;
    const userProfile = {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      companyName: user.companyName,
      registrationNumber: user.registrationNumber,
      address: user.address,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
      contact: user.contact,
    };

    return setUserData(userProfile);
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    let userId: string | any = localStorage.getItem("userId");
    setUserId(userId);
    isAuth === "true" ? fetchUserData(userId) : router.push("/login");
  }, []);

  const deleteUserAccount = () => {
    alert("Delete your account, are you sure?");
    let input = prompt("Input 'Y' to confirm.");
    if (input === "Y") {
      DeleteUser(userId);
      localStorage.clear();
      alert("Your account has been deleted!");
    }
    return router.push("/");
  };

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        {userData ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Card
              sx={{
                width: "80%",
                margin: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                // backgroundColor: "lightblue",
                height: "auto",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    my: 2,
                  }}
                >
                  <AccountCircleIcon
                    sx={{ width: "150px", height: "150px", color: "gray" }}
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "space-between",
                    mt: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      First Name:
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {userData.firstName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      Last Name:
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {userData.lastName}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "space-between",
                    my: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      Company Name:
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {userData.companyName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      Registration Number:
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {userData.registrationNumber}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "space-between",
                    my: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      Address:
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {userData.address}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      City:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {userData.city}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "space-between",
                    my: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      Country:
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {userData.country}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      Postalcode:
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {" "}
                      {userData.postalCode}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "space-between",
                    my: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      Contact:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {" "}
                      {userData.contact}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      // border: "1px solid black",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "40%",
                        backgroundColor: "lightgrey",
                        height: "50px",
                        borderRadius: "10px 0 0 10px",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      Email:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        width: "60%",
                        border: "1px solid lightgray",
                        height: "50px",
                        borderRadius: "0 10px 10px 0",
                        display: "flex",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      {userData.email}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "space-between",
                    my: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      border: "1px solid blue",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={() => router.push("/myprofile/update")}
                    >
                      Update My Profile
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mx: 1,
                      border: "1px solid red",
                      height: "50px",
                      borderRadius: "15px",
                      alignItems: "center",
                      width: "50%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      sx={{ color: "red" }}
                      onClick={() => deleteUserAccount()}
                    >
                      Delete My Account
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
}
