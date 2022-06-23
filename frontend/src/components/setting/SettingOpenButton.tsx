import { IconButton } from "@mui/material";
import Image from "next/image";
import settingImage from "@/assets/setting.png";

interface SettingOpenButtonProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SettingOpenButton = ({ open, setOpen }: SettingOpenButtonProps) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="end"
      onClick={handleDrawerOpen}
      sx={{
        ...(open && { display: "none" }),
        position: "relative",
        right: "10px",
      }}
    >
      <Image src={settingImage} alt="setting-image" width={30} height={30} />
    </IconButton>
  );
};

export default SettingOpenButton;
