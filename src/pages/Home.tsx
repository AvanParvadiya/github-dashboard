import { Grid } from '@mui/material'
import PullRequests from '../components/PullRequests';
import Issues from '../components/Issues';
const Home = () => {
    return <Grid container >
        <Grid item sm={6}>
            <PullRequests />
        </Grid>
        <Grid  item sm={6}>
            <Issues />
        </Grid>
    </Grid>
}
export default Home;