"use client";
import React, { useState, useEffect } from "react";
import getUserProfile from "@/lib/user/fetchUser";
import User from "../../../types/user";
import { useRouter } from "next/navigation";
import UpdateUserProfile from "../../../lib/user/updateUserProfile";
import Sidebar from "../../components/Sidebar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MyProfile() {
  const [userData, setUserData] = useState<User | any>();
  const router = useRouter();

  const fetchUserData = async (userId: string) => {
    const res = await getUserProfile(userId);
    const user: User = res.user;
    const userProfile = {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      companyName: user.companyName,
      registrationNumber: user.registrationNumber,
      address: user.address,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
      contact: user.contact,
      email: user.email,
    };

    return setUserData(userProfile);
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    let userId: string | any = localStorage.getItem("userId");
    isAuth === "true" ? fetchUserData(userId) : router.push("/login");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      // avatar: { value: string };
      companyName: { value: string };
      registrationNumber: { value: string };
      address: { value: string };
      city: { value: string };
      country: { value: string };
      postalCode: { value: string };
      contact: { value: string };
      email: { value: string };
    };

    const updatedUserData = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      // avatar: target.avatar.value,
      companyName: target.companyName.value,
      registrationNumber: target.registrationNumber.value,
      address: target.address.value,
      city: target.city.value,
      country: target.country.value,
      postalCode: target.postalCode.value,
      contact: target.contact.value,
      email: target.email.value,
    };

    console.log("user updated: ", updatedUserData);

    let userId: string | any = localStorage.getItem("userId");

    const res = await UpdateUserProfile(updatedUserData, userId);
    if (res.msg === "User updated!") {
      alert("You have successfully updated your profile!");
      return router.push("/myprofile");
    }
  };

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <h2 style={{ textAlign: "center" }}>Update My Profile</h2>
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

                <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
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
                        border: "none",
                        height: "50px",
                        borderRadius: "15px",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        First Name
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="firstName"
                        defaultValue={userData.firstName}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mx: 1,
                        border: "none",
                        height: "50px",
                        borderRadius: "15px",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        Last Name:{" "}
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="lastName"
                        defaultValue={userData.lastName}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mx: 1,
                        border: "none",
                        height: "50px",
                        borderRadius: "15px",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        Company Name:{" "}
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="companyName"
                        defaultValue={userData.companyName}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mx: 1,
                        border: "none",
                        height: "50px",
                        borderRadius: "15px",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        Registration No.:{" "}
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="registrationNumber"
                        defaultValue={userData.registrationNumber}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mx: 1,
                        border: "none",
                        height: "50px",
                        borderRadius: "15px",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        Address:{" "}
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="address"
                        defaultValue={userData.address}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mx: 1,
                        border: "none",
                        height: "50px",
                        borderRadius: "15px",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        City:{" "}
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="city"
                        defaultValue={userData.city}
                      />
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
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        Country:{" "}
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="country"
                        defaultValue={userData.country}
                      />
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
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        Postal Code:{" "}
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="postalCode"
                        defaultValue={userData.postalCode}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mx: 1,
                        border: "none",
                        height: "50px",
                        borderRadius: "15px",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        Contact Number:{" "}
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="contact"
                        defaultValue={userData.contact}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mx: 1,
                        border: "none",
                        height: "50px",
                        borderRadius: "15px",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <label
                        htmlFor=""
                        style={{
                          marginLeft: 2,
                          marginRight: 0,
                          width: "40%",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgrey",
                          borderRadius: "10px 0 0 10px",
                          padding: "10px",
                        }}
                      >
                        Email
                      </label>
                      <input
                        style={{
                          marginLeft: 0,
                          marginRight: 2,
                          width: "60%",
                          border: "1px solid lightgray",
                          height: "50px",
                          padding: "10px",
                          borderRadius: "0 10px 10px 0",
                        }}
                        type="text"
                        id="email"
                        defaultValue={userData.email}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "center",
                      mt: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 2, height: "50px", width: "200px" }}
                      type="submit"
                    >
                      Update
                    </Button>
                  </Box>
                </form>
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
