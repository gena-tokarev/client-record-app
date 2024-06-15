import { Auth } from "@/components/auth";
import { Box } from "@mui/material";

const AuthPageClient = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ margin: 6, maxWidth: "400px" }}>
        <Auth />
      </Box>
    </Box>
  );
};

export default AuthPageClient;
