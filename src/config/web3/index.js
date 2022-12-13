import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({
  supportedChainIds: [5],
});

const getLibrary = (provider) => {
  return new Web3(provider);
};

export { injected, getLibrary };
