import apiSlice from "../apiSlice";
import CardInfo from "./CardInfo";

interface CardResponse {
  status: number;
  message: string;
  data: CardInfo;
}

const cardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCard: builder.query<CardResponse, number>({
      query: (cardId) => `/card/${cardId}`,
    }),
  }),
});

export const { useGetCardQuery } = cardApiSlice;
