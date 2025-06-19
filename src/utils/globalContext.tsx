import React from "react";
interface GlobalContextType {
    name: string;
    age: number;
}
const GlobalContext = React.createContext<GlobalContextType | null>(null)
export default GlobalContext