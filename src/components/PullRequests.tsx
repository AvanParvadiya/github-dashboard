import { Grid, Box, List, ListItem, Typography, Card, CardContent } from '@mui/material';
import useApiRequest from '../helper/useApiRequest';
import { PullRequest } from '../SVG/svgs';
import moment from 'moment';
import Errors from './Errors';
import { NavLink } from 'react-router-dom';

const PullRequests = () => {

    const { data, error, isLoaded } = useApiRequest(
        "https://api.github.com/repos/AvanParvadiya/effective-waffle/pulls?state=all"
    );

    if (error !== null) {
        return <Errors error={error} />
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    return (
        <Grid p={3}>
            <Card >

                <CardContent>
                    <Box display="flex" justifyContent="space-between">
                        <NavLink to={"/prs"}>
                            <PullRequest /> Pull Requests
                        </NavLink>
                        <NavLink to={"/prs"}>
                            View All
                        </NavLink>

                    </Box>
                    <List>
                        {data.slice(0, 5).map((item: any, index: number) => (
                            <ListItem key={index}>
                                <Box display="flex" width={"100%"}>
                                    <Grid sm={1}>
                                        <PullRequest />
                                    </Grid>
                                    <Grid sm={11}>
                                        <Box width="100%">
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography>
                                                    PR:#{item?.number} {item?.title}
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
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PullRequests;