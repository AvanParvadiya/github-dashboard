import { Box, Grid, List, ListItem, Typography, Card, CardContent, TableContainer, Table, TableHead, Paper, TableRow, TableCell, TableBody, TablePagination, IconButton, Collapse, TableSortLabel, FormControlLabel, Popper, Dialog, ClickAwayListener } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PullRequest } from "../SVG/svgs";
import moment from 'moment';
import useApiRequest from "../helper/useApiRequest";
import Errors from "./Errors";
import { ArrowBack, CheckBox } from "@mui/icons-material";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterListIcon from '@mui/icons-material/FilterList';


interface IDataRow {
    row: any
}
const AllPRs = () => {
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(5);

    const { data, error, isLoaded } = useApiRequest(
        "https://api.github.com/repos/AvanParvadiya/effective-waffle/pulls?state=all"
    );
    const [rowData, setRowData] = useState([])
    useEffect(() => {
        if (data !== null) {
            const allData = data?.map((gitData: any) => {
                const {number,body, state, title, url, _links, user, created_at } = gitData
                return {
                    number,
                    body,
                    title,
                    state,
                    url,
                    _links,
                    user,
                    created_at
                }
            });
            setRowData(allData)
        }
    }, [data]);
    function handleChangePage(event: any, newpage: any) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event: any) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    const TableDataRow = ({ row }: IDataRow) => {
        const [open, setOpen] = useState(false);
        const { data: comments, error, isLoaded } = useApiRequest(
            row._links?.comments?.href
        );
        return <>
            <TableRow
                sx={{
                    "&:last-child td, &:last-child th": { border: 0 }
                }}
            >
                <TableCell component="th">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.number}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell>
                    {row.body}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.state}
                </TableCell>
                <TableCell>
                    {moment(row.created_at).fromNow()}
                </TableCell>
                <TableCell >
                    <Box display="flex">
                        <img src={row.user.avatar_url} alt="avatar" height={100} width={100} />
                        <Typography variant="body1" padding={2}>
                            {row.user.login}
                        </Typography>
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Card>
                                <CardContent>
                                    PR Details
                                </CardContent>
                                <Typography variant="body1">
                                    Comments
                                </Typography>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }}
                                        aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >Body</TableCell>
                                                <TableCell>created on</TableCell>
                                                <TableCell>updated by</TableCell>
                                                <TableCell>
                                                    created by
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody sx={{
                                            "&:last-child td, &:last-child th": { border: 0 }
                                        }}>
                                            {comments?.slice((comments.length - 5), comments.length).reverse().map((comment: any, index: number) => {
                                                return <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {comment.body}
                                                    </TableCell>
                                                    <TableCell>
                                                        By {comment.user.login}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(comment.created_at).fromNow()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(comment.updated_at).fromNow()}
                                                    </TableCell>

                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Card>
                        </Box>
                    </Collapse>
                </TableCell >
            </TableRow >
        </>
    }
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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}
                                aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                        </TableCell>
                                        <TableCell>Pr #</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Body</TableCell>
                                        <TableCell>
                                            Status
                                        </TableCell>
                                        <TableCell>
                                            Create on
                                        </TableCell>
                                        <TableCell>
                                            Created By
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowData.slice(pg * rpg, pg *
                                        rpg + rpg).map((row: any, index: number) => (
                                            <TableDataRow row={row} key={index} />
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rowData.length}
                            rowsPerPage={rpg}
                            page={pg}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Grid >
    );
}

export default AllPRs;