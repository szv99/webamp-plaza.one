import { ChakraProvider, useToast, Button } from '@chakra-ui/react';
import React from 'react';

export const ToastBut = () => {
  return (
    <ChakraProvider>
      <ToastButton />
    </ChakraProvider>
  );
};

async function likeSong() {
  var token = localStorage.getItem('plazaToken');
  if (!token) {
    token = window.prompt(
      'Please provide authorization token in format: "Bearer <token>"'
    );
    if (token.length === 0) {
      window.localStorage.removeItem('plazaToken');
    }
  }
  window.localStorage.setItem('plazaToken', token);
  let url = 'https://api.plaza.one/reactions';

  let reactionData = `{
      "reaction": 2
      }`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
      'np-user-agent': 'Nightwave Plaza Axios',
    },
    method: 'POST',
    body: reactionData,
  });
  return response;
}

const ToastButton = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  function likingError() {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        title: 'Error when liking song...',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function likingSucceed() {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        title: 'Liked song successfully...',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function addToast() {
    toastIdRef.current = toast({
      title: 'Liking song...',
      status: 'info',
      duration: 1000,
      isClosable: true,
    });
    likeSong()
      .then(() => {
        likingSucceed();
      })
      .catch(() => {
        console.log('epic fail !!!!');
        likingError();
      });
  }

  return <Button onClick={addToast}>Add song to favorite on plaza.one</Button>;
};
