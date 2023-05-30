"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GetSingleClient from "@/lib/client/fetchSingleClient";
import Client from "../../../types/client";
import DeleteClient from "@/lib/client/deleteClient";
import Sidebar from "@/app/components/Sidebar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ClientId {
  id: string;
}

export default function ClientPage({ params }: ClientId | any) {
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
  }, []);

  const deleteClient = () => {
    alert("Delete your client profile, are you sure?");
    let input = prompt("Input 'Y' to confirm.");
    if (input === "Y") {
      DeleteClient(params.id);
      alert("Your client has been deleted!");
    } else {
      alert("Sorry, your input is not correct!");
    }
    return router.push("/clients");
  };

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box
        sx={{
          width: "100%",
          margin: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {client ? (
          <Card
            sx={{
              width: 400,
              margin: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ alignContent: "center", margin: 1 }}>
              <Typography variant="h5" component="div" sx={{ m: 1 }}>
                {client.name}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" color="text.primary" sx={{ m: 1 }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Country:
                  </span>
                  {client.country}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ m: 1 }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    City:
                  </span>
                  {client.city}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ m: 1 }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Address:
                  </span>
                  {client.address}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ m: 1 }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Postalcode:
                  </span>
                  {client.postalCode}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ m: 1 }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Registration No.:
                  </span>
                  {client.registrationNumber}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ m: 1 }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Contact:
                  </span>
                  {client.contact}
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ m: 1 }}>
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Email:
                  </span>
                  {client.email}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", mb: 2 }}>
              <Button
                variant="contained"
                onClick={() => router.push(`/clients/${params.id}/update`)}
              >
                Update Client
              </Button>
              <br />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteClient()}
              >
                Delete Client
              </Button>
            </CardActions>
          </Card>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
}
