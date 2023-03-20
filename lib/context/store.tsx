"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type DataType = {
  firstName: string;
};

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

interface Props {
  children?: React.ReactNode;
}

export const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  isAuth: false,
  setIsAuth: (): boolean => false,
  data: [],
  setData: (): DataType[] => [],
});

export const GlobalContextProvider = ({ children }: Props) => {
  const [userId, setUserId] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState<[] | DataType[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,
        isAuth,
        setIsAuth,
        data,
        setData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
