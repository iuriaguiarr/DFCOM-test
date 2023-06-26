import { NextRequest, NextResponse } from "next/server";

import axios from "axios";
import moment from "moment";

const protectedRoutes = ["/profile"];
const authRoutes = ["/login"];
const publicRoutes = ["/"];

const clearCookies = (req: NextRequest, res: NextResponse) => {
  req.cookies.delete("accessToken");
  req.cookies.delete("refreshToken");
  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");

  return res;
};

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("accessToken")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !accessToken) {
    // Está numa rota protegida e não possui token, é redirecionado para o login
    return clearCookies(
      request,
      NextResponse.redirect(new URL("/login", request.url))
    );
  } else if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    refreshToken &&
    accessToken &&
    moment().isSameOrAfter(moment(JSON.parse(accessToken).expiresIn))
  ) {
    // Está numa rota protegida, possui token porém expirado, tenta renovar
    try {
      const newAccessToken = await axios.request({
        method: "POST",
        url: "http://localhost:3001/auth/refresh",
        data: {
          refreshToken,
        },
      });

      request.cookies.set({
        name: "accessToken",
        value: JSON.stringify({
          value: newAccessToken.data.accessToken,
          expiresIn: newAccessToken.data.expiresIn,
        }),
      });
      const response = NextResponse.redirect(
        new URL(request.nextUrl.pathname, request.url)
      );
      response.cookies.set(
        "accessToken",
        JSON.stringify({
          value: newAccessToken.data.accessToken,
          expiresIn: newAccessToken.data.expiresIn,
        })
      );
      return response;
    } catch (error) {
      return clearCookies(
        request,
        NextResponse.redirect(new URL("/login", request.url))
      );
    }
  } else if (authRoutes.includes(request.nextUrl.pathname) && accessToken) {
    // Está numa rota de autenticação e possui token, é redirecionado para o perfil
    return NextResponse.redirect(new URL("/profile", request.url));
  }
};
