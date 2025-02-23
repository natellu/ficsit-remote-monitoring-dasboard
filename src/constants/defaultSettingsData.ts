import type { SettingsData } from "../types/settingsData";

export const defaultSettingsData: SettingsData = {
  ip: import.meta.env.REACT_APP_DEFAULT_IP || "localhost",
  port: import.meta.env.REACT_APP_DEFAULT_PORT || "8080",
  interval: 10000,
};
