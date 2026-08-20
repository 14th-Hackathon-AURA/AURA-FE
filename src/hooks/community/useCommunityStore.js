import { useContext } from "react";
import CommunityContext from "./CommunityContext";

const useCommunityStore = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunityStore must be used within a CommunityProvider");
  }
  return context;
};

export default useCommunityStore;
