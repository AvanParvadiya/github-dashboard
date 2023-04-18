import { Box, Grid, List, ListItem, Typography, Card, CardContent } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PullRequest } from "../SVG/svgs";
import moment from 'moment';
import useApiRequest from "../helper/useApiRequest";
import Errors from "./Errors";
import { ArrowBack } from "@mui/icons-material";

const AllPRs = () => {

    const { data, error, isLoaded } = useApiRequest(
        "https://api.github.com/repos/AvanParvadiya/effective-waffle/pulls?state=all"
    );

    return (
        <Grid p={3}>
            <Card >
                <CardContent>
                    <Box>
                        <NavLink to={"/"} >
                            <ArrowBack /> Back
                        </NavLink>

                    </Box>
                    {error !== null ? <Errors error={error} /> : null}
                    {!isLoaded ? <Box>Loading...</Box> : null}
                    <Box mt={2}>
                        <Typography textAlign="center" variant="h5">
                            <PullRequest /> Pull Requests
                        </Typography>
                        <List>
                            {data.map((item: any, index: number) => (
                                <ListItem key={index}>
                                    <Box display="flex" width={"100%"}>
                                        <Grid sm={1}>
                                            <PullRequest />
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
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default AllPRs;