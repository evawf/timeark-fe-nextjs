"use client";
import React, { useState, useEffect } from "react";
import getClients from "../../../lib/client/fetchClients";
import { useRouter } from "next/navigation";
import Client from "../../../types/client";
import AddNewClient from "@/lib/client/addNewClient";
import Sidebar from "@/app/components/Sidebar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function NewClient() {
  const router = useRouter();
  const [newClient, setNewClient] = useState<Client>({
    id: "",
    name: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    registrationNumber: "",
    contact: "",
    email: "",
  });

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    if (isAuth !== "true") {
      router.push("/login");
    }
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    const { id, value } = e.target;
    setNewClient({
      ...newClient,
      [e.target.id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newClient.registrationNumber !== "") {
      const res = await AddNewClient(newClient);
      if (res.msg === "Client already added.") {
        alert("No need to add this client again!");
        const clientId: string = res.clientId;
        return router.push(`/clients/${clientId}`);
      } else {
        alert("You have successfully added a new client.");
        return router.push(`/clients/${res.newClient.id}`);
      }
    }
  };

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <h2 style={{ textAlign: "center" }}>Add New Client</h2>
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
              margin: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <form
                action=""
                onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
              >
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-name">
                    Company Name
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    id="name"
                    value={newClient.name}
                    onChange={handleChange}
                    label="company name"
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
                    value={newClient.country}
                    onChange={handleChange}
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
                    value={newClient.city}
                    onChange={handleChange}
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
                    value={newClient.address}
                    onChange={handleChange}
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
                    value={newClient.postalCode}
                    onChange={handleChange}
                    label="postal code"
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-registrationNumber">
                    Registration No.
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    id="registrationNumber"
                    value={newClient.registrationNumber}
                    onChange={handleChange}
                    label="registration No."
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
                    value={newClient.contact}
                    onChange={handleChange}
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
                    value={newClient.email}
                    onChange={handleChange}
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
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
