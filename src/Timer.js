import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';

const red = '#f54e4e';
const green = '#2e7d32';

function Timer() {
    const rotation = 0; // Define rotation, 0 means no rotation
    const strokeLinecap = 'butt'; // Define strokeLinecap, can be 'butt', 'round', or 'square'

    return (
        <div>
            <CircularProgressbar
                value={0.60}
                maxValue={1}
                text={`${0.60 * 100}%`}
                styles={buildStyles({
                    rotation,
                    strokeLinecap,
                    textColor: '#fff',
                    pathColor: red,
                    trailColor: 'rgba(255,255,255,0.1)', // Corrected the rgba value
                })}
            />
            <div style={{marginTop:'20px'}}>
                <PlayButton/>
                <PauseButton/>
            </div>
            <div style={{marginTop:'20px'}}>
                <SettingsButton/>
            </div>
        </div>
    );
}

export default Timer;
