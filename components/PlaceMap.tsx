import React from "react";
import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map";
interface Props {
    name: string;
    lat: number;
    lng: number;
     
}




export default function PlaceMap(props: Props){
    return (
        <div className="h-[420px] w-full">
          <Map center={[props.lng, props.lat]} zoom={16}>
            <MapMarker
              longitude={props.lng}
              latitude={props.lat}
            >
              <MarkerContent>
              <div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg" />
            </MarkerContent>
              <MarkerPopup>
              <div className="space-y-1">
                <p className="text-foreground font-medium">{props.name}</p>
                <p className="text-muted-foreground text-xs">
                  {props.lat.toFixed(4)}, {props.lng.toFixed(4)}
                </p>
              </div>
            </MarkerPopup>
            </MapMarker>
          </Map>
      </div>
      )
}