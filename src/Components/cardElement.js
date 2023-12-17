import { useState, useEffect } from 'react';
import {
  Image,
  Text,
  Box,
  Flex,
  Spinner,
  Stack,
  Heading,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';

let API_BASE_URL = 'https://api.plaza.one';
let timeout = 0;
export function SongCard() {
  const [songMetadata, setSongMetadata] = useState({
    title: '',
    artist: '',
    artwork: '',
    currentlyListening: 0,
    length: 0,
    position: 0,
  });

  const [songMetadataError, setSongMetadataError] = useState();

  useEffect(() => {
    function getSong() {
      fetch(`${API_BASE_URL}/status`)
        .then(response => response.json())
        .then(
          ({
            song: { artist, title, artwork_sm_src, length, position },
            listeners,
          }) => {
            setSongMetadata({
              artist,
              title,
              artwork: artwork_sm_src,
              currentlyListening: listeners,
            });
            timeout = length - position;
          }
        )
        .catch(error => {
          setSongMetadataError(true);
        });

      setTimeout(getSong, timeout * 1000 + 5);
    }
    getSong();
  }, []);

  if (!songMetadata && !songMetadataError) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  const { artwork, artist, title, currentlyListening } = songMetadata;

  return (
    <LinkBox>
      <Box
        transition="box-shadow 0.2s ease, transform 0.2s ease"
        _hover={{
          boxShadow: 'xl',
          transform: 'scale(1.015)',
          cursor: 'pointer',
        }}
        bg="gray.100"
        w="fit-content"
        borderWidth="1px"
        borderRadius="lg"
      >
        <Image src={artwork} />
        <Stack p={2} direction="column" spacing={2}>
          <Heading size="md">
            <LinkOverlay href="https://plaza.one/">{title}</LinkOverlay>
          </Heading>
          <Text>{artist}</Text>
          <Text textAlign="right" color="gray.600" fontSize="sm">
            {currentlyListening} listeners
          </Text>
        </Stack>
      </Box>
    </LinkBox>
  );
}
