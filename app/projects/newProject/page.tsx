"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Project from "@/types/project";
import Client from "@/types/client";
import AddNewProject from "../../../lib/project/addNewProject";
import getClients from "@/lib/client/fetchClients";
import getClientByRegistrationNo from "@/lib/client/fetchClientByRegistrationNo";

export default function NewProject() {
  const [registrationNo, setRegistrationNo] = useState("");
  const [isNewClient, setIsNewClient] = useState(false);
  const [showCreateNewClientBtn, setShowCreateNewClientBtn] = useState(false);
  const [client, setClient] = useState<Client>();
  const router = useRouter();
  const [clientList, setClentList] = useState<Client[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    name: "",
    description: "",
    budget: "",
    ratePerHour: "",
    dueDate: "",
    categories: "",
    userId: "",
    clientId: "",
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

  const handleChange = (e: any) => {
    e.preventDefault();
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
    console.log("search now");
    const res = await getClientByRegistrationNo(registrationNo);
    console.log("res client: ", res);
    if (res.client) {
      setClient(res.client);
    } else {
      alert("You may create a new client.");
      return setShowCreateNewClientBtn(true);
    }
  };

  console.log("newProject: ", newProject);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("newProject: ", newProject);
    const res = await AddNewProject(newProject);
    console.log("res: ", res);
    if (res.newProject) {
      return router.push(`/projects/${res.newProject.id}`);
    }
    if (res.msg === "Project already added.") {
      alert("Project already added, you may create a new project name.");
      return router.push("/projects/newProject");
    }
  };

  return (
    <div>
      <h2>Add new project page</h2>
      <form action="" onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
        <label htmlFor="">Select A Client: </label>

        {!isNewClient && clientList.length ? (
          <div>
            <select
              name="clientId"
              id="clientId"
              defaultValue={clientList[0].id}
              onChange={handleChange}
            >
              {clientList.map((c, idx) => (
                <option value={c.id} key={`client${idx}`}>
                  {c.name}
                </option>
              ))}
            </select>
            <button onClick={() => handleClientSearch()}>Search client</button>
          </div>
        ) : (
          <div>
            <h5>Search now!</h5>
            <div>
              <label htmlFor="">
                Search client in database: Input client registration No.
              </label>
              <input type="search" id="search" onChange={handleSearchChange} />
              <button onClick={() => handleSearchSubmit()}>Search</button>
            </div>
            <div>
              {client && (
                <>
                  Search Client info:
                  <br />
                  Name: {client.name}
                  <br />
                  Address: {client.address}
                  <br />
                  Registration No.: {client.registrationNumber}
                  <br />
                  Contact: {client.contact}
                  <br />
                  Email: {client.email}
                  <br />
                  <button
                    onClick={() => {
                      setNewProject({ ...newProject, clientId: client.id });
                    }}
                  >
                    Select this new client
                  </button>
                </>
              )}
            </div>
            <div>
              {showCreateNewClientBtn && (
                <>
                  <button onClick={() => router.push("/clients/newClient")}>
                    Create New Client
                  </button>
                </>
              )}
            </div>

            <button onClick={() => handleClientSearch()}>
              Existing client
            </button>
          </div>
        )}
        <br />
        <label htmlFor="">Name: </label>
        <input
          type="text"
          id="name"
          value={newProject.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Description: </label>
        <input
          type="text"
          id="description"
          value={newProject.description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Budget: </label>
        <input
          type="text"
          id="budget"
          value={newProject.budget}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Rate(S$/Hour): </label>
        <input
          type="text"
          id="ratePerHour"
          value={newProject.ratePerHour}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Due Date: </label>
        <input
          type="date"
          id="dueDate"
          value={newProject.dueDate}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Categories: </label>
        <input
          type="text"
          id="categories"
          value={newProject.categories}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
