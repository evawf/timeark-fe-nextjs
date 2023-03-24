"use client";
import React, { useState, useEffect } from "react";
import getUserProfile from "@/lib/fetchUser";
import User from "../../types/user";
import { useRouter } from "next/navigation";

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
    isAuth === "true" ? fetchUserData(userId) : router.push("/login");
  }, []);

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
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}
