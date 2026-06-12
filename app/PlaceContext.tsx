'use client'
import { createContext, useContext } from 'react'
export interface Place{
    id: number;
    name: string;
    describe: string;
    eventDates: Date[];
    pos: Pos;
}
interface Pos {
    lat: number;
    lng: number;
}   
const PlacesContext = createContext<Array<Place>>([])

interface Props{
    value: Array<Place>;
    children: React.ReactNode
}
export const usePlace = () => {
    return useContext(PlacesContext);
}
export default function Places({ value, children }: Props) {
  return (
    <PlacesContext.Provider value={value}>
      {children}
    </PlacesContext.Provider>
  )
}