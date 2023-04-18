import { Box, Typography } from '@mui/material';
interface IErrorProps {
    error: any
}
const Errors = ({ error }: IErrorProps) => {
    return <Box>
        <Typography>Error: {error?.message}
        </Typography>
        <Typography>
            <pre style={{ overflow: "scroll" }}>
                {JSON.stringify(error, null, 2)}
            </pre>
        </Typography>
    </Box>;
}
export default Errors;