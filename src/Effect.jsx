import LensFlare from "./UltimateLensFlare";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useControls, folder } from "leva";
import { Color } from "three";

function Effect() {
  //   const lensFlareProps = useControls({
  //     LensFlare: folder(
  //       {
  //         enabled: { value: true, label: "enabled?" },
  //         opacity: { value: 1.0, min: 0.0, max: 1.0, label: "opacity" },
  //         position: {
  //           value: { x: -29, y: 10, z: -58 },
  //           step: 1,
  //           label: "position",
  //         },
  //         glareSize: {
  //           value: 0.35,
  //           // step : 10,
  //           min: 0.01,
  //           max: 1.0,
  //           label: "glareSize",
  //         },
  //         starPoints: {
  //           value: 6.0,
  //           step: 1.0,
  //           min: 0,
  //           max: 32.0,
  //           label: "starPoints",
  //         },
  //         animated: {
  //           value: true,
  //           label: "animated?",
  //         },
  //         followMouse: {
  //           value: false,
  //           label: "followMouse?",
  //         },
  //         anamorphic: {
  //           value: false,
  //           label: "anamorphic?",
  //         },
  //         colorGain: {
  //           value: new Color(56, 22, 11),
  //           label: "colorGain",
  //         },
  //         Flare: folder({
  //           flareSpeed: {
  //             value: 0.4,
  //             step: 0.001,
  //             min: 0.0,
  //             max: 1.0,
  //             label: "flareSpeed",
  //           },
  //           flareShape: {
  //             value: 0.1,
  //             step: 0.001,
  //             min: 0.0,
  //             max: 1.0,
  //             label: "flareShape",
  //           },
  //           flareSize: {
  //             value: 0.005,
  //             step: 0.001,
  //             min: 0.0,
  //             max: 0.01,
  //             label: "flareSize",
  //           },
  //         }),

  //         SecondaryGhosts: folder({
  //           secondaryGhosts: {
  //             value: true,
  //             label: "secondaryGhosts?",
  //           },
  //           ghostScale: {
  //             value: 0.1,
  //             // step : 10,
  //             min: 0.01,
  //             max: 1.0,
  //             label: "ghostScale",
  //           },
  //           aditionalStreaks: {
  //             value: true,
  //             label: "aditionalStreaks?",
  //           },
  //         }),
  //         StartBurst: folder({
  //           starBurst: {
  //             value: true,
  //             label: "starBurst?",
  //           },
  //           haloScale: {
  //             value: 0.5,
  //             step: 0.01,
  //             min: 0.3,
  //             max: 1.0,
  //           },
  //         }),
  //       },
  //       {
  //         collapsed: true,
  //       }
  //     ),
  //   });
  return (
    <EffectComposer multisampling={1}>
      <LensFlare
        // {...lensFlareProps}
        opacity={0.6}
        animated={false}
        dirtTextureFile={"/lensDirtTexture.png"}
      />
      <Vignette darkness={0.4} offset={0.6} />
    </EffectComposer>
  );
}

export default Effect;
