"use client";

import React, { createContext, useState, useEffect } from "react";

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }: any) => {
  const [session, setSession] = useState(null);

  const checkSession = async () => {
    try {
      const response = await fetch("/api/check-session");
      if (response.ok) {
        const data = await response.json();
        setSession(data);
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error("Session check failed:", error);
      setSession(null);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (credentials: any) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        checkSession();
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setSession(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
