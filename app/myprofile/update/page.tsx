"use client";
import React, { useState, useEffect } from "react";
import getUserProfile from "@/lib/fetchUser";
import User from "../../../types/user";
import { useRouter } from "next/navigation";
import UpdateUserProfile from "../../../lib/updateUserProfile";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      avatar: { value: string };
      companyName: { value: string };
      registrationNumber: { value: string };
      address: { value: string };
      city: { value: string };
      country: { value: string };
      postalCode: { value: string };
      contact: { value: string };
    };

    const updatedUserData = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      avatar: target.avatar.value,
      companyName: target.companyName.value,
      registrationNumber: target.registrationNumber.value,
      address: target.address.value,
      city: target.city.value,
      country: target.country.value,
      postalCode: target.postalCode.value,
      contact: target.contact.value,
    };

    console.log("updateUserData: ", updatedUserData);
    let userId: string | any = localStorage.getItem("userId");
    console.log("userId: ", userId);

    const res = await UpdateUserProfile(updatedUserData, userId);
    console.log("res from backend: ", res);
    if (res.msg === "User updated!") {
      alert("You have successfully updated your profile!");
      return router.push("/myprofile");
    }
  };

  return (
    <div>
      Update user profile page
      <div>
        {userData ? (
          <>
            <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
              <label htmlFor="">First Name: </label>
              <input
                type="text"
                id="firstName"
                defaultValue={userData.firstName}
              />
              <br />

              <label htmlFor="">Last Name: </label>
              <input
                type="text"
                id="lastName"
                defaultValue={userData.lastName}
              />
              <br />

              <label htmlFor="">avatar</label>
              <input type="text" id="avatar" defaultValue={userData.avatar} />
              <br />

              <label htmlFor="">Company Name: </label>
              <input
                type="text"
                id="companyName"
                defaultValue={userData.companyName}
              />
              <br />

              <label htmlFor="">Registration No.: </label>
              <input
                type="text"
                id="registrationNumber"
                defaultValue={userData.registrationNumber}
              />
              <br />

              <label htmlFor="">Address: </label>
              <input type="text" id="address" defaultValue={userData.address} />
              <br />

              <label htmlFor="">City: </label>
              <input type="text" id="city" defaultValue={userData.city} />
              <br />

              <label htmlFor="">Country: </label>
              <input type="text" id="country" defaultValue={userData.country} />
              <br />

              <label htmlFor="">Postal Code: </label>
              <input
                type="text"
                id="postalCode"
                defaultValue={userData.postalCode}
              />
              <br />

              <label htmlFor="">Contact Number: </label>
              <input type="text" id="contact" defaultValue={userData.contact} />
              <br />
              <button type="submit">Update</button>
            </form>
          </>
        ) : (
          <>Loading</>
        )}
      </div>
    </div>
  );
}
