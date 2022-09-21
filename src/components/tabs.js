import React, { useMemo } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  x: {
    color: "#1acaca",
    paddingBottom: 2,
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .Mui-selected": {
      borderBottom: "2px solid #1acaca",
    },
  },
}));

export default function TabComp({ tabList, handleChange, value }) {
  const classes = useStyles();

  const children = useMemo(() => {
    return tabList.find((item) => item.key === value)?.component || null;
  }, [value, tabList]);

  return (
    <div>
      <Tabs
        value={value}
        indicatorColor="primary"
        //textColor="primary"
        className={classes.x}
        onChange={handleChange}
      >
        {tabList &&
          tabList.length &&
          tabList.map((item, index) => {
            return (
              <Tab
                label={item.label}
                key={index}
                value={item.key}
                style={{ fontWeight: "bold" }}
              />
            );
          })}
      </Tabs>
      <div
        style={{
          padding: 15,
          maxHeight: 200,
          overflowY: "auto",
          marginTop: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}
