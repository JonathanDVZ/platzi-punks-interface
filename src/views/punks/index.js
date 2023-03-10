import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Grid } from "@chakra-ui/react";
import PunkCard from "../../components/punk-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";
import { usePlatziPunksData } from "../../hooks/usePlatziPunksData";
import { Link } from "react-router-dom";

const Punks = () => {
  const { active } = useWeb3React();
  const { punks, loading } = usePlatziPunksData();

  if (!active) return <RequestAccess />;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {punks.map(({ name, image, tokenId }) => (
            <Link key={tokenId} to={`/punk/${tokenId}`}>
              <PunkCard key={tokenId} image={image} name={name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Punks;
