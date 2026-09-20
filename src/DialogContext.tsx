import { createContext } from 'react';

export default createContext<
  | React.Dispatch<React.SetStateAction<React.ReactNode | undefined>>
  | undefined
>(undefined);
