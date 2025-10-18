import "./index.css";
import { Composition } from 'remotion';
import { MultimediaVideo } from './MultimediaVideo';

export const RemotionRoot: React.FC = () => {
    return (
        <Composition
            id="MultimediaVideo"
            component={MultimediaVideo}
            durationInFrames={30 * 22} 
            fps={30}
            width={1080}
            height={1080}
        />
    );
};
