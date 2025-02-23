import type { SettingsData } from "../types/settingsData";

export const defaultSettingsData: SettingsData = {
  ip: import.meta.env.VITE_DEFAULT_IP || "localhost",
  port: import.meta.env.VITE_DEFAULT_PORT || "8080",
  interval: 10000,
};
