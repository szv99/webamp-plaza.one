import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  VStack,
  Flex,
  extendTheme,
  Center,
  StackDivider,
} from '@chakra-ui/react';
import {
  BrowserView,
  MobileView,
} from 'react-device-detect';
import { SongCard } from './Components/cardElement.js';
import { WebampView } from './Components/Webamp.js';
import { ToastBut } from './Components/Toast.js';

const randomNumber = Math.floor(Math.random() * 74) + 10;
const bgLink = 'https://gif.plaza.one/' + randomNumber + '.gif';
const bgLinkHtml = `url('${bgLink}')`;
const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};
const theme = extendTheme({ breakpoints });
function App() {
  return (
    <>
      <BrowserView>
        <div
          style={{
            backgroundImage: bgLinkHtml,
            backgroundSize: '100%',
            backgroundRepeat: 'repeat',
          }}
        >
          ;
          <ChakraProvider theme={theme}>
            <Flex justifyContent="center" wrap="wrap">
              <Box>
                <WebampView />
              </Box>
              <Box>
                <SongCard />
              </Box>
            </Flex>
            <Box textAlign="center" fontSize="xl">
              <Grid minH="100vh" p={3}>
                <VStack spacing={8}>
                  <ToastBut />
                </VStack>
              </Grid>
            </Box>
          </ChakraProvider>
        </div>
      </BrowserView>

      <MobileView>
        <div
          style={{
            backgroundImage: bgLinkHtml,
            backgroundSize: '100%',
            backgroundRepeat: 'repeat',
          }}
        >
          ;
          <ChakraProvider theme={theme}>
            <Center></Center>

            <Center>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={2}
                align="flex-center"
              >
                <Box>
                  <SongCard />
                </Box>
                <ToastBut />
                <WebampView></WebampView>
              </VStack>
            </Center>
            <Grid minH="60vh"></Grid>
          </ChakraProvider>
        </div>
      </MobileView>
    </>
  );
}

export default App;
