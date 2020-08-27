import React from "react";
//import WebViewLeaflet from "react-native-webview-leaflet";
import WebViewLeafletView from "react-native-webview-leaflet/WebViewLeaflet.view";
//import * as parkData from "./data/skateboard-parks.json";
//import "./app.css";

class Mapit extends React.Component {
    return (
        <WebViewLeafletView
        ref={component => (this.webViewLeaflet = component)}
            // The rest of your props, see the list below
        />
    );
}

export default Mapit
