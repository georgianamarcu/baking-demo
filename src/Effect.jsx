import LensFlare from "./UltimateLensFlare";
import {
  EffectComposer,
  Bloom,
  TiltShift2,
  SMAA,
} from "@react-three/postprocessing";
import { useControls, folder } from "leva";
import { N8AOPostPass } from "n8ao";
import { Color } from "three";

function Effect() {
  // const config = useControls({
  //   intensity: { value: 3, min: 0, max: 20 },
  //   aoRadius: { value: 1.0, min: 0, max: 10 },
  //   aoSamples: { value: 6, min: 1, max: 64, step: 1 },
  //   denoiseSamples: { value: 4, min: 1, max: 12, step: 1 },
  //   denoiseRadius: { value: 12, min: 1, max: 12, step: 1 },
  //   distanceFalloff: { value: 1.0, min: 0, max: 10 },
  // });
  // const config = useControls({
  //   intensity: { value: 5, min: 0, max: 20 },
  //   color: "#343e93",
  //   aoRadius: { value: 2, min: 0, max: 10 },
  //   aoSamples: { value: 6, min: 1, max: 64, step: 1 },
  //   denoiseSamples: { value: 4, min: 1, max: 12, step: 1 },
  //   denoiseRadius: { value: 12, min: 1, max: 12, step: 1 },
  //   distanceFalloff: { value: 1.0, min: 0, max: 10 },
  // });
  // const lensFlareProps = useControls({
  //   LensFlare: folder(
  //     {
  //       enabled: { value: true, label: "enabled?" },
  //       opacity: { value: 1.0, min: 0.0, max: 1.0, label: "opacity" },
  //       position: {
  //         value: { x: -29, y: 10, z: -58 },
  //         step: 1,
  //         label: "position",
  //       },
  //       glareSize: {
  //         value: 0.35,
  //         // step : 10,
  //         min: 0.01,
  //         max: 1.0,
  //         label: "glareSize",
  //       },
  //       starPoints: {
  //         value: 6.0,
  //         step: 1.0,
  //         min: 0,
  //         max: 32.0,
  //         label: "starPoints",
  //       },
  //       animated: {
  //         value: true,
  //         label: "animated?",
  //       },
  //       followMouse: {
  //         value: false,
  //         label: "followMouse?",
  //       },
  //       anamorphic: {
  //         value: false,
  //         label: "anamorphic?",
  //       },
  //       colorGain: {
  //         value: new Color(56, 22, 11),
  //         label: "colorGain",
  //       },
  //       Flare: folder({
  //         flareSpeed: {
  //           value: 0.4,
  //           step: 0.001,
  //           min: 0.0,
  //           max: 1.0,
  //           label: "flareSpeed",
  //         },
  //         flareShape: {
  //           value: 0.1,
  //           step: 0.001,
  //           min: 0.0,
  //           max: 1.0,
  //           label: "flareShape",
  //         },
  //         flareSize: {
  //           value: 0.005,
  //           step: 0.001,
  //           min: 0.0,
  //           max: 0.01,
  //           label: "flareSize",
  //         },
  //       }),

  //       SecondaryGhosts: folder({
  //         secondaryGhosts: {
  //           value: true,
  //           label: "secondaryGhosts?",
  //         },
  //         ghostScale: {
  //           value: 0.1,
  //           // step : 10,
  //           min: 0.01,
  //           max: 1.0,
  //           label: "ghostScale",
  //         },
  //         aditionalStreaks: {
  //           value: true,
  //           label: "aditionalStreaks?",
  //         },
  //       }),
  //       StartBurst: folder({
  //         starBurst: {
  //           value: true,
  //           label: "starBurst?",
  //         },
  //         haloScale: {
  //           value: 0.5,
  //           step: 0.01,
  //           min: 0.3,
  //           max: 1.0,
  //         },
  //       }),
  //     },
  //     {
  //       collapsed: true,
  //     }
  //   ),
  // });
  return (
    <EffectComposer disableNormalPass>
      {/* <LensFlare
        // {...lensFlareProps}
        opacity={0.3}
        position={[4, 16, -58]}
        starBurst={false}
        ghostScale={0.28}
        colorGain={new Color(137, 130, 100)}
        starPoints={6}
        flareSpeed={0.4}
        glareSize={0.35}
        dirtTextureFile={"/lensDirtTexture.png"}
      /> */}

      <SMAA />
      <Bloom mipmapBlur luminanceThreshold={0.85} intensity={1} />

      {/* <N8AO {...config} /> */}
    </EffectComposer>
  );
}

export default Effect;
