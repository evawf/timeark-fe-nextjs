"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Project from "@/types/project";
import Client from "@/types/client";
import AddNewProject from "../../../lib/project/addNewProject";
import getClients from "@/lib/client/fetchClients";
import getClientByRegistrationNo from "@/lib/client/fetchClientByRegistrationNo";
import Sidebar from "@/app/components/Sidebar";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CardActions from "@mui/material/CardActions";
import { el } from "date-fns/locale";

export default function NewProject() {
  const [selected, setSelected] = useState("none");

  const [focus, setFocused] = useState(false);
  const [hasDateValue, sethasDateValue] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const [registrationNo, setRegistrationNo] = useState("");
  const [isNewClient, setIsNewClient] = useState(false);
  const [showCreateNewClientBtn, setShowCreateNewClientBtn] = useState(false);
  const [client, setClient] = useState<Client>();
  const router = useRouter();
  const [clientList, setClentList] = useState<Client[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    id: clientList[0]?.id,
    name: "",
    description: "",
    budget: "",
    ratePerHour: "",
    dueDate: "",
    categories: [""],
    userId: "",
    clientId: "",
    client: {
      name: "",
    },
  });

  const getClientsData = async () => {
    const res = await getClients();
    setClentList(res.clients);
    return;
  };

  useEffect(() => {
    let isAuth = localStorage.getItem("isAuth");
    isAuth === "true" ? getClientsData() : router.push("/login");
  }, []);

  const handleClientChange = (e: SelectChangeEvent) => {
    setNewProject({
      ...newProject,
      clientId: e.target.value,
    });
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.value) sethasDateValue(true);
    else sethasDateValue(false);

    const { id, value } = e.target;
    setNewProject({
      ...newProject,
      [e.target.id]: value,
    });
  };

  const handleClientSearch = () => {
    if (isNewClient) {
      setIsNewClient(false);
    } else {
      setIsNewClient(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationNo(e.target.value);
  };

  const handleSearchSubmit = async () => {
    // find client by registration number:
    const res = await getClientByRegistrationNo(registrationNo);
    if (res.client) {
      setClient(res.client);
    } else {
      alert("You may create a new client.");
      return setShowCreateNewClientBtn(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await AddNewProject(newProject);
    if (res.newProject) {
      return router.push(`/projects/${res.newProject.id}`);
    }
    if (res.msg === "Project already added.") {
      alert("Duplication of project name, you may choose a new project name.");
      return router.push("/projects/newProject");
    }
  };

  console.log("new project info: ", newProject);

  return (
    <Box sx={{ marginTop: "64px", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Box sx={{ width: "100%", margin: 2 }}>
        <h2 style={{ textAlign: "center" }}>Add New Project</h2>
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
                {/* <label htmlFor="">Existing Client? </label> */}
                {!isNewClient && clientList.length ? (
                  <>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel htmlFor="outlined-adornment-select-client">
                        Select client
                      </InputLabel>
                      <Select
                        labelId="outlined-adornment-select-client"
                        name="clientId"
                        id="clientId"
                        label="Select client"
                        onChange={handleClientChange}
                        defaultValue={clientList[0].id}
                        displayEmpty
                      >
                        {clientList.map((c, idx) => (
                          <MenuItem value={c.id} key={`client${idx}`}>
                            {c.name}
                          </MenuItem>
                        ))}
                        <MenuItem
                          onClick={() => handleClientSearch()}
                          sx={{ backgroundColor: "pink" }}
                        >
                          SEARCH CLIENT
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </>
                ) : (
                  <>
                    <h5 style={{ textAlign: "center" }}>Searching...</h5>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel htmlFor="outlined-adornment-registration-no">
                        Registration No.
                      </InputLabel>
                      <OutlinedInput
                        required
                        type="search"
                        id="search"
                        onChange={handleSearchChange}
                        label="Registration No."
                      />
                      <Button
                        onClick={() => handleSearchSubmit()}
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ my: 2, height: "50px" }}
                      >
                        Search
                      </Button>
                    </FormControl>
                    <>
                      {client && (
                        <>
                          <h4 style={{ textAlign: "center" }}>Client found!</h4>
                          <br />
                          <Card sx={{ border: selected }}>
                            <CardContent>
                              {client.name}
                              <br />
                              {client.address}
                              <br />
                              {client.registrationNumber}
                              <br />
                              {client.contact}
                              <br />
                              {client.email}
                            </CardContent>
                          </Card>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="success"
                            sx={{ mt: 2, height: "50px" }}
                            onClick={() => {
                              setNewProject({
                                ...newProject,
                                clientId: client.id,
                              });
                              if (newProject.clientId !== client.id) {
                                setSelected("2px solid green");
                              } else {
                                setSelected("none");
                              }
                            }}
                          >
                            Select this client
                          </Button>
                        </>
                      )}
                    </>
                    <div>
                      {showCreateNewClientBtn && (
                        <>
                          <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2, height: "50px" }}
                            onClick={() => router.push("/clients/newClient")}
                          >
                            Create New Client
                          </Button>
                        </>
                      )}
                    </div>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, height: "50px" }}
                      onClick={() => handleClientSearch()}
                    >
                      Existing client
                    </Button>
                  </>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-name">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    id="name"
                    value={newProject.name}
                    onChange={handleChange}
                    label="Name"
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-description">
                    Description
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    id="description"
                    value={newProject.description}
                    onChange={handleChange}
                    label="description"
                    multiline
                    fullWidth
                    sx={{
                      minHeight: 120,
                      wrap: "soft",
                      overflow: "auto",
                    }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-budget">
                    Budget
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    id="budget"
                    value={newProject.budget}
                    onChange={handleChange}
                    label="budget"
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-ratePerHour">
                    Rate(S$/Hour)
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    id="ratePerHour"
                    value={newProject.ratePerHour}
                    onChange={handleChange}
                    label="Rate(S$/hour)"
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-due-date">
                    Due Date
                  </InputLabel>
                  <OutlinedInput
                    required
                    onFocus={onFocus}
                    onBlur={onBlur}
                    type={hasDateValue || focus ? "date" : "text"}
                    id="dueDate"
                    value={newProject.dueDate}
                    onChange={handleChange}
                    label="due date"
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="outlined-adornment-categories">
                    Categories
                  </InputLabel>
                  <OutlinedInput
                    required
                    type="text"
                    id="categories"
                    value={newProject.categories}
                    onChange={handleChange}
                    label="Categories"
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
