"use client";
import React, { useState, useEffect } from "react";
import getClients from "../../lib/client/fetchClients";
import { useRouter } from "next/navigation";
import Client from "../../types/client";
import Sidebar from "../components/Sidebar";
import Link from "next/link";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Clients() {
  const router = useRouter();
  const [clientList, setClentList] = useState<Client[]>([]);

  const getClientsData = async () => {
    const res = await getClients();
    setClentList(res.clients);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    console.log("isAuth: ", isAuth);
    isAuth === "true" ? getClientsData() : router.push("/login");
  }, []);

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        {clientList ? (
          <section>
            <Box>
              <h2 style={{ textAlign: "center" }}>My Clients</h2>
            </Box>
            {clientList.length !== 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {clientList.map((client) => (
                  // <li key={client.id}>
                  //   <Link href={`/clients/${client.id}`}>{client.name}</Link>
                  // </li>
                  <Card
                    sx={{
                      width: 200,
                      height: 200,
                      margin: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent sx={{ alignContent: "center", margin: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ textAlign: "center" }}
                      >
                        {client.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: "center" }}
                      >
                        Company details
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", mb: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => router.push(`/clients/${client.id}`)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            ) : (
              <div>
                <h4>You haven't added any client!</h4>
                <button onClick={() => router.push("/clients/newClient")}>
                  New Client
                </button>
              </div>
            )}
          </section>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
}
