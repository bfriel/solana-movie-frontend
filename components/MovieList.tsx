import { Card } from "./Card";
import { FC, useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const MOVIE_REVIEW_PROGRAM_ID = new PublicKey(
  "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN"
);

export const MovieList: FC = () => {
  const [movies, setMovies] = useState<(Movie | null)[]>([]);

  useEffect(() => {
    const connection = new Connection(clusterApiUrl("devnet"));
    connection
      .getProgramAccounts(MOVIE_REVIEW_PROGRAM_ID)
      .then(async (accounts) => {
        const movies: (Movie | null)[] = accounts.map(({ account }) =>
          Movie.deserialize(account.data)
        );
        setMovies(movies);
      });
  }, []);

  return (
    <div>
      {movies.map((movie, i) => {
        return <Card key={i} movie={movie} />;
      })}
    </div>
  );
};
