import type { SettingsData } from "../types/settingsData";

export const defaultSettingsData: SettingsData = {
  ip: process.env.DEFAULT_IP || "localhost",
  port: process.env.DEFAULT_PORT || "8080",
  interval: 10000,
};
