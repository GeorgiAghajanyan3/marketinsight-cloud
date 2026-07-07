import { Card, CardContent, Typography, Box } from "@mui/material";

export default function KPICard({
    title,
    value,
    icon,
    color = "#ff2d2d",
}) {
    return (
        <Card
            sx={{
                bgcolor: "#1f1f1f",
                color: "white",
                borderRadius: 3,
                border: `1px solid ${color}`,
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 0 20px ${ color }`,
                },
}}
    >
    <CardContent>
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Box>
                <Typography variant="body2" color="gray">
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        mt: 1,
                        fontWeight: "bold",
                    }}
                >
                    {value}
                </Typography>
            </Box>

            <Box
                sx={{
                    color,
                    fontSize: 40,
                }}
            >
                {icon}
            </Box>
        </Box>
    </CardContent>
    </Card >
  );
}