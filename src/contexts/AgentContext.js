import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchAgents } from "../lib/utils.js";

const AgentsContext = createContext();

export const AgentsProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getAgents();
  }, []);

  return (
    <AgentsContext.Provider value={{ agents, loading, error }}>
      {children}
    </AgentsContext.Provider>
  );
};

export const useAgents = () => useContext(AgentsContext);
