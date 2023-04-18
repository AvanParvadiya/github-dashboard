import './App.css';
import { Container } from '@mui/material';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundry';
import AllPRs from './components/AllPRs';
import AllIssues from './components/AllIssues';


function App() {
  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path='/' Component={Home}></Route>
            <Route path='/issues' Component={AllIssues}></Route>
            <Route path='/issues/:issueId' Component={Home}></Route>
            <Route path='/prs' Component={AllPRs}></Route>
            <Route path='/prs/:prId' Component={Home}></Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>

    </Container>
  );
}

export default App;
