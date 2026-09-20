import { useEffect } from 'react';

const constants = {
    FONT_SIZE: 17,
    // REMOTE: 'http://localhost:5000', // Dev.
    REMOTE: '', // Prod.
    NETWORK_ERROR: 'No se pudo alcanzar al servidor'
};

const useFetch = <R>(url: string, opts?: RequestInit) => ({
  then: (tHandler: (jso: R) => void) => ({
    catch: (cHandler: (err: any) => void) => {
      useEffect(() => {
        fetch(url, opts)
          .then(res => res.json() as Promise<R>)
          .then(tHandler)
          .catch(cHandler);
      }, []);
    }
  })
});

const value = <T>(nullable: T | null | undefined): T => {
  if (nullable === null || nullable === undefined) {
    throw new TypeError('No value found');
  }
  return nullable;
};

export {
    constants,
    useFetch,
    value
}
