import { useState, useCallback, useEffect } from "react";
import usePlatziPunks from "../usePlatziPunks";

const getPunkData = async ({ platziPunks, tokenId }) => {
  const [tokenURI, dna, owner] = await Promise.all([
    platziPunks.methods.tokenURI(tokenId).call(),
    platziPunks.methods.tokenDNA(tokenId).call(),
    platziPunks.methods.ownerOf(tokenId).call(),
  ]);

  const [
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    platziPunks.methods.getAccessoriesType(dna).call(),
    platziPunks.methods.getAccessoriesType(dna).call(),
    platziPunks.methods.getClotheColor(dna).call(),
    platziPunks.methods.getClotheType(dna).call(),
    platziPunks.methods.getEyeType(dna).call(),
    platziPunks.methods.getEyeBrowType(dna).call(),
    platziPunks.methods.getFacialHairColor(dna).call(),
    platziPunks.methods.getFacialHairType(dna).call(),
    platziPunks.methods.getHairColor(dna).call(),
    platziPunks.methods.getHatColor(dna).call(),
    platziPunks.methods.getGraphicType(dna).call(),
    platziPunks.methods.getMouthType(dna).call(),
    platziPunks.methods.getSkinColor(dna).call(),
    platziPunks.methods.getTopType(dna).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  };
};

const usePlatziPunksData = () => {
  const [punks, setPunks] = useState([]);
  const [loading, setLoading] = useState(true);

  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks) {
      setLoading(true);

      const totalSupply = await platziPunks.methods.totalSupply().call();
      const tokenIds = new Array(Number(totalSupply))
        .fill()
        .map((_, index) => index);

      const punksPromise = tokenIds.map((tokenId) =>
        getPunkData({ tokenId, platziPunks })
      );

      const punks = await Promise.all(punksPromise);

      setPunks(punks);
      setLoading(false);
    }
  }, [platziPunks]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};

const usePlatziPunkData = (tokenId = null) => {
  const [punk, setPunk] = useState({});
  const [loading, setLoading] = useState(true);
  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks && tokenId !== null) {
      setLoading(true);

      const toSet = await getPunkData({ tokenId, platziPunks });
      setPunk(toSet);

      setLoading(false);
    }
  }, [platziPunks, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punk,
    update,
  };
};

export { usePlatziPunksData, usePlatziPunkData };
