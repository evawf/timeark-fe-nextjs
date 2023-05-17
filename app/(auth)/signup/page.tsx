"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useGlobalContext } from "../../../lib/context/store";
import { useRouter } from "next/navigation";
import RegisterUser from "@/lib/registerUser";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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

interface User {
  email: string;
  password: string;
  isActive: boolean;
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      email: email,
      password: password,
      isActive: true,
    };

    const result = await RegisterUser(user);
    if (result.userId) {
      return router.push("/login");
    } else {
      alert("Password or Email is not correct!");
      return router.push("/signup");
    }
  };

  return (
    <Card className="container mx-auto" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, fontStyle: "bold" }}>
          Sign up for An Account
        </Typography>
        <form onSubmit={handleSubmit} className="signinForm">
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              required
              type={"text"}
              id="outlined-adornment-email"
              placeholder="email"
              onChange={handleEmailChange}
              label="email"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}></FormControl>
        </form>
        {/* // **************************************************************** */}
        {/* <div>Login</div>;
        <form onSubmit={handleSubmit} className="">
          <div>
            <label>Email</label>
            <br />
            <input
              type="text"
              id="email"
              placeholder="email"
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="******************"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Create account</button>
        </form> */}
      </CardContent>
    </Card>
  );
}
