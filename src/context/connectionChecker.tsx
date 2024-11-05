import { Alert, Button, Container } from "@mui/joy";
import { Box } from "@mui/system";
import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

import { defaultSettingsData } from "../constants/defaultSettingsData";
import { useLocalStorage } from "../hooks/localStorage";
import type { ConnectionCheckerContextDefaultValues } from "../types/connectionCheckerContextDefaultValues";
import type { SettingsData } from "../types/settingsData";

const defaultValues: ConnectionCheckerContextDefaultValues = {
  msInterval: 3000,
  checkConnectionToFRM: () => {},
};

// TODO Unused
export const ConnectionCheckerContext = createContext(defaultValues);

type Props = {
  children: React.ReactElement;
};

export const ConnectionCheckerProvider: React.FC<Props> = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  let timeout: NodeJS.Timeout;

  const { value: settings } = useLocalStorage<SettingsData>(
    "rmd_settings",
    defaultSettingsData,
  );

  const [msInterval, setMsInterval] = useState(3000);
  const [loop, setLooping] = useState(true);

  const checkConnectionToFRM = async () => {
    // clearTimeout(timeout);
    // axios
    //   .get(`http://${settings.ip}:${settings.port}/getDoggo`)
    //   .then(() => {
    //     console.log("[ConnectionChecker] Got data");
    //     setShowAlert(false);
    //   })
    //   .catch(() => {
    //     setShowAlert(true);
    //   });
    // timeout = setTimeout(() => {
    //   if (loop) {
    //     checkConnectionToFRM();
    //   }
    // }, 3000);
  };

  useEffect(() => {
    setShowAlert(false);
    checkConnectionToFRM();
  }, []);

  const state = useMemo(
    () => ({
      msInterval,
      checkConnectionToFRM,
    }),
    [msInterval],
  );

  return (
    <ConnectionCheckerContext.Provider value={state}>
      {showAlert === true && (
        <Container sx={{ paddingTop: "30px" }}>
          <Alert
            startDecorator={<BsExclamationTriangleFill />}
            endDecorator={
              <Button
                onClick={() => {
                  setShowAlert(false);
                  clearTimeout(timeout);
                  checkConnectionToFRM();
                }}
                variant="outlined"
              >
                Retry
              </Button>
            }
          >
            Could not connect to Satisfactory through{" "}
            <Box
              sx={{
                textDecoration: "underline",
                fontWeight: 400,
                marginX: "5px",
              }}
            >
              Ficsit Remote Monitoring
            </Box>{" "}
            Mod.
          </Alert>
        </Container>
      )}
      {children}
    </ConnectionCheckerContext.Provider>
  );
};
