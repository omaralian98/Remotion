import "./index.css";
import { Composition } from "remotion";
import {IntroVideo} from "./IntroVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroModern"
        component={IntroVideo}
        durationInFrames={30 * 24}
        fps={30}
        width={1400}
        height={1080}
      />
    </>
  );
};
