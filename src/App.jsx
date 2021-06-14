import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from './theme'
import NavBar from "./components/app/NavBar";
import Maintenance from "./views/Maintenance";
import Odometer from "./views/Odometer";
import Type from "./views/Type";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div className="App">
          <NavBar/>
          <Box px="8" py="5">
            <Switch>
              <Route exact path="/">
                <Maintenance/>
              </Route>
              <Route path="/type">
                <Type/>
              </Route>
              <Route path="/odometer">
                <Odometer/>
              </Route>
            </Switch>
          </Box>
        </div>
      </Router>
    </ChakraProvider>
  );
}
