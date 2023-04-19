import { Grid, Box, List, ListItem, Typography, Card, CardContent } from '@mui/material';
import useApiRequest from '../helper/useApiRequest';
import { Issue } from '../SVG/svgs';
import moment from 'moment';
import Errors from './Errors';
import { NavLink } from 'react-router-dom';
const Issues = () => {
    const { data, error, isLoaded } = useApiRequest(
        "https://api.github.com/repos/AvanParvadiya/effective-waffle/issues"
    );

    if (error !== null) {
        return <Errors error={error} />
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    return (
        <Grid p={3}>
            <Card>
                <CardContent>
                    <Box display="flex" justifyContent="space-between">
                        <NavLink to={'/issues'}>
                            <Issue /> Issues
                        </NavLink>
                        <NavLink to={'/issues'}>
                            View All
                        </NavLink>
                    </Box>
                    <Box >
                        <List>
                            {data.slice(0, 5).map((item: any, index: number) => (
                                <ListItem key={index}>
                                    <Box display="flex" width={"100%"}>
                                        <Grid sm={1}>
                                            <Issue />
                                        </Grid>
                                        <Grid sm={11}>
                                            <Box width="100%">
                                                <Box display="flex" justifyContent="space-between">
                                                    <Typography>
                                                        Issue #{item?.number}{item?.title}
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
export default Issues;