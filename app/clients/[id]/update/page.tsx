"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleClient from "@/lib/client/fetchSingleClient";
import Client from "../../../../types/client";
import UpdateClientProfile from "../../../../lib/client/updateClientProfile";
import Sidebar from "@/app/components/Sidebar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";

interface ClientId {
  id: string;
}

export default function UpdateClient({ params }: ClientId | any) {
  const router = useRouter();
  const [client, setClient] = useState<Client>();

  const getSingleClientData = async () => {
    const res = await GetSingleClient(params.id);
    setClient(res.client);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getSingleClientData() : router.push("/login");
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      country: { value: string };
      city: { value: string };
      address: { value: string };
      postalCode: { value: string };
      registrationNumber: { value: string };
      contact: { value: string };
      email: { value: string };
    };

    const updatedClientData: Client | any = {
      name: target.name.value,
      country: target.country.value,
      city: target.city.value,
      address: target.address.value,
      postalCode: target.postalCode.value,
      registrationNumber: target.registrationNumber.value,
      contact: target.contact.value,
      email: target.email.value,
    };

    console.log("updatedClientData: ", updatedClientData);

    const res = await UpdateClientProfile(updatedClientData, params.id);

    console.log("res from backend: ", res);
    if (res.msg === "Client updated!") {
      alert("You have successfully updated your client profile!");
      return router.push(`/clients/${params.id}`);
    }
  };

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <h2 style={{ textAlign: "center" }}>Update Client Page</h2>
        {client ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                width: 400,
                // height: 400,
                margin: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-name">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="name"
                      defaultValue={client.name}
                      label="name"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-country">
                      Country
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="country"
                      defaultValue={client.country}
                      label="country"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-city">
                      City
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="city"
                      defaultValue={client.city}
                      label="city"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-address">
                      Address
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="address"
                      defaultValue={client.address}
                      label="address"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-postalCode">
                      Postal Code
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="postalCode"
                      defaultValue={client.postalCode}
                      label="Postal Code"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-RegistrationNumber">
                      Registration No.
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="registrationNumber"
                      defaultValue={client.registrationNumber}
                      label="registration No. "
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-contact">
                      Contact
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="contact"
                      defaultValue={client.postalCode}
                      label="contact"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-email">
                      Email
                    </InputLabel>
                    <OutlinedInput
                      required
                      type="text"
                      id="email"
                      defaultValue={client.postalCode}
                      label="email"
                    />
                  </FormControl>

                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 2, height: "50px" }}
                    type="submit"
                  >
                    Update
                  </Button>
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
