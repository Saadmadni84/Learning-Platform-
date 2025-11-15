import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  prepareHeaders: (headers) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    } catch {
      // ignore storage errors in non-browser contexts
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Course", "Student", "Quiz", "Progress"],
  endpoints: () => ({}),
});
