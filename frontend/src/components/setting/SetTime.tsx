import { Divider, Typography, Box, Slider, Grid, Input } from "@mui/material";
import PrettoSlider from "./Slider";

interface SetTimeProps {
  title: string;
  name: string;
  value: Number;
  handleSliderChange: any;
  handleInputChange: any;
  handleBlur: any;
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
      <Typography sx={{fontFamily: 'Montserrat'}}>{title}</Typography>
      <Grid item xs sx={{ width: "90%", display: "inline-flex" }}>
        <PrettoSlider
          name={name}
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          step={10}
          marks
          min={10}
          max={100}
          color="secondary"
          sx={{
            marginRight: "20px",
            fontFamily: 'Montserrat'
          }}
        />
        <Input
        sx={{color: '#1de9b6', fontSize: '1.25rem'}}
          color="warning"
          name={name}
          value={value}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
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
