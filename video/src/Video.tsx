import { Series } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Roboto';
import { SCENE_TIMING } from './constants';
import { HeroScene } from './scenes/HeroScene';
import { InversionScene } from './scenes/InversionScene';
import { ArchitectureScene } from './scenes/ArchitectureScene';
import { ProofScene } from './scenes/ProofScene';
import { ROIScene } from './scenes/ROIScene';
import { CloseScene } from './scenes/CloseScene';

loadFont('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const Video: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENE_TIMING.hero.duration}>
        <HeroScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_TIMING.inversion.duration}>
        <InversionScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_TIMING.architecture.duration}>
        <ArchitectureScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_TIMING.proof.duration}>
        <ProofScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_TIMING.roi.duration}>
        <ROIScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_TIMING.close.duration}>
        <CloseScene />
      </Series.Sequence>
    </Series>
  );
};
