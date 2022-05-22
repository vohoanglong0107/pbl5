import { NEXT_PUBLIC_API_URL } from "@/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${NEXT_PUBLIC_API_URL}/api` }),
  endpoints: (builder) => ({}),
});

export default apiSlice;
