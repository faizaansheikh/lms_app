"use server";

import { cookies } from "next/headers";

export async function setAuthToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    // maxAge: 60 * 5
     maxAge: 60 * 60 * 5
  });
  

}
export async function removeAuthToken() {
  const cookieStore = await cookies();

  cookieStore.set("token", '', {
    httpOnly: true,
    secure: true,
    maxAge: 0
  });
}
