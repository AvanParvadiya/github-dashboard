import { Box, Grid, List, ListItem, Typography, Card ,CardContent} from "@mui/material";
import { NavLink } from "react-router-dom";
import Errors from "./Errors";
import { ArrowBack } from "@mui/icons-material";
import useApiRequest from "../helper/useApiRequest";
import moment from 'moment';
import { Issue } from "../SVG/svgs";

const AllIssues = () => {
    const { data, error, isLoaded } = useApiRequest(
        "https://api.github.com/repos/AvanParvadiya/effective-waffle/issues"
    );
    return <Grid p={3}>
        <Card>
            <CardContent>
                <Box>
                    <NavLink to={"/"} >
                        <ArrowBack /> Back
                    </NavLink>

                </Box>
                {error !== null ? <Errors error={error} /> : null}
                {!isLoaded ? <Box>Loading...</Box> : <Box mt={2}>
                    <Typography>
                        <Issue /> Issues
                    </Typography>
                    <List>
                        {data.map((item: any, index: number) => (
                            <ListItem key={index}>
                                <Box display="flex" width={"100%"}>
                                    <Grid sm={1}>
                                        <Issue />
                                    </Grid>
                                    <Grid sm={11}>
                                        <Box width="100%">
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>
                                                    {item?.title}
                                                </Typography>
                                                <Typography>
                                                    {item?.user?.login}
                                                </Typography>

                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>
                                                    Created {moment(item?.created_at).fromNow()}
                                                </Typography>
                                                <Typography>
                                                    Updated {moment(item?.updated_at).fromNow()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>}
            </CardContent>
        </Card>
    </Grid>
}
export default AllIssues;