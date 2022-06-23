import { Box, Grid, Input, Typography } from "@mui/material";
import PrettoSlider from "./Slider";

interface SetTimeProps {
  title: string;
  name: string;
  value: number;
  handleSliderChange: (event: Event, name: string, value: number) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>, name: string) => void;
}

const SetTime = ({
  title,
  name,
  value,
  handleSliderChange,
  handleInputChange,
  handleBlur,
}: SetTimeProps) => {
  return (
    <Box>
      <Typography sx={{ fontFamily: "Montserrat" }}>{title}</Typography>
      <Grid item xs sx={{ width: "90%", display: "inline-flex" }}>
        <PrettoSlider
          value={value}
          onChange={(event, value) =>
            handleSliderChange(event, name, value as number)
          }
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          step={10}
          marks
          min={10}
          max={100}
          color="secondary"
          sx={{
            marginRight: "20px",
            fontFamily: "Montserrat",
          }}
        />
        <Input
          sx={{ color: "#1de9b6", fontSize: "1.25rem" }}
          color="warning"
          value={value}
          size="small"
          onChange={(e) =>
            handleInputChange(e as React.ChangeEvent<HTMLInputElement>, name)
          }
          onBlur={(e) =>
            handleBlur(e as React.FocusEvent<HTMLInputElement>, name)
          }
          inputProps={{
            step: 10,
            min: 10,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Grid>
    </Box>
  );
};

export default SetTime;
