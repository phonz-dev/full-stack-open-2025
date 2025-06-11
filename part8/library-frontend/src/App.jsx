import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Route, Routes, Link } from "react-router";
import { Button, Container } from "@mui/material";

const App = () => {

  return (
    <Container>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Button
          variant="contained"
          color="warning"
          component={Link}
          to='/'
        >
          authors
        </Button>
        <Button
          variant="contained"
          color="warning"
          component={Link}
          to='/books'
        >
          books
        </Button>
        <Button
          variant="contained"
          color="warning"
          component={Link}
          to='/add'
        >
          add book
        </Button>
      </div>

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
      </Routes>
    </Container>
  );
};

export default App;
