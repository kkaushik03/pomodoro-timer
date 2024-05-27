import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e';
const green = '#2e7d32';

function Timer() {
    const rotation = 0; // No rotation
    const strokeLinecap = 'butt'; // Stroke style for the progress bar
    const settingsInfo = useContext(SettingsContext); // Use context for settings
    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState('work'); // work/break/null

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work'; // switch to break
        setMode(nextMode);
        modeRef.current = nextMode;
        const nextSeconds = nextMode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60; 
        // set next seconds
        setSecondsLeft(nextSeconds); // set seconds left to work/break time
        secondsLeftRef.current = nextSeconds;
    }

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current); // Update secondsLeft state
    }

    function initTimer() {
        const initialSeconds = settingsInfo.workMinutes ? settingsInfo.workMinutes * 60 : 0;
        setSecondsLeft(initialSeconds);
        secondsLeftRef.current = initialSeconds;
    }

    useEffect(() => {
        if (settingsInfo.workMinutes !== undefined) {
            initTimer();
            const interval = setInterval(() => {
                if (isPausedRef.current) {
                    return;
                }
                if (secondsLeftRef.current === 0) {
                    return switchMode();
                }
                tick();
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [settingsInfo]);

    useEffect(() => {
        isPausedRef.current = isPaused;
    }, [isPaused]);

    useEffect(() => {
        console.log('secondsLeft:', secondsLeft);
    }, [secondsLeft]); // Log secondsLeft state changes

    const totalSeconds = mode === 'work'
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60; // total seconds for work/break

    const percentage = totalSeconds > 0 ? (secondsLeft / totalSeconds) * 100 : 0; // Corrected calculation

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <div>
            <CircularProgressbar
                value={percentage} // 100% completion to 0%
                text={`${minutes}:${formattedSeconds}`} // Display text
                styles={buildStyles({
                    rotation,
                    strokeLinecap,
                    textColor: '#fff',
                    pathColor: mode==='work'?red:green,
                    trailColor: 'rgba(255,255,255,0.1)', // Trail color with transparency
                })}
            />
            <div style={{ marginTop: '20px' }}>
                {isPaused ? <PlayButton onClick={() => setIsPaused(false)} /> : <PauseButton onClick={() => setIsPaused(true)} />}
            </div>
            <div style={{ marginTop: '20px' }}>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
            </div>
        </div>
    );
}

export default Timer;
