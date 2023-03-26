"use client";
import React, { useState, useEffect } from "react";
import getUserProfile from "@/lib/fetchUser";
import User from "../../types/user";
import { useRouter } from "next/navigation";
import DeleteUser from "@/lib/DeleteUser";

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
    console.log("user input: ", input);
    if (input === "Y") {
      DeleteUser(userId);
      localStorage.clear();
      alert("Your account has been deleted!");
    }
    return router.push("/");
  };

  return (
    <div>
      {userData ? (
        <>
          user page:
          <div>First Name: {userData.firstName}</div>
          <div>Last Name: {userData.lastName}</div>
          <div>Email: {userData.email}</div>
          <div>Avatar: {userData.avatar}</div>
          <div>Company Name: {userData.companyName}</div>
          <div>Registration Number: {userData.registrationNumber}</div>
          <div>Address: {userData.address}</div>
          <div>City: {userData.city}</div>
          <div>Country: {userData.country}</div>
          <div>Postalcode:{userData.postalCode} </div>
          <div>Contact: {userData.contact}</div>
          <div>
            <button onClick={() => router.push("/myprofile/update")}>
              Update My Profile
            </button>
          </div>
          <div>
            <button onClick={() => deleteUserAccount()}>
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
