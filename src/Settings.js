import React from 'react';
import ReactSlider from 'react-slider';
import './slider.css';
import { useContext } from "react";
import SettingsContext from "./SettingsContext";
import BackButton from './BackButton';

function Settings() {
    const settingsInfo = useContext(SettingsContext);
    return (
        <div style={{ textAlign: 'left' }}>
         
            <label>Work Minutes: {settingsInfo.workMinutes}</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={settingsInfo.workMinutes}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <label>Break Minutes: {settingsInfo.breakMinutes}</label>
            <ReactSlider
                className="slider-break"
                thumbClassName="thumb-break"
                trackClassName="track-break"
                value={settingsInfo.breakMinutes}
                onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                min={1}
                max={60}
            />
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <BackButton onClick={()=>settingsInfo.setShowSettings(false)}/>
            </div>
           
        </div>
    );
}

export default Settings;
