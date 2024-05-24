import React from 'react';
import ReactSlider from 'react-slider';
import './slider.css';
import { useContext } from "react";
import SettingsContext from "./SettingsContext";

function Settings() {
    const settingsInfo = useContext(SettingsContext);

    return (
        <div style={{ textAlign: 'left' }}>
         
            <label>Break: {settingsInfo.workMinutes}:00</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={settingsInfo.workMinutes}
                min={1}
                max={120}
            />
            <label>Break: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider
                className="slider-break"
                thumbClassName="thumb-break"
                trackClassName="track-break"
                value={settingsInfo.breakMinutes}
                min={1}
                max={60}
            />
        </div>
    );
}

export default Settings;
