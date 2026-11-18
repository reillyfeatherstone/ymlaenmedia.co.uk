import { gsap } from "gsap"

import { CustomEase } from "gsap/CustomEase"
// CustomBounce requires CustomEase
import { CustomBounce } from "gsap/CustomBounce"
// CustomWiggle requires CustomEase
import { CustomWiggle } from "gsap/CustomWiggle"
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack"

import { Draggable } from "gsap/Draggable"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { Flip } from "gsap/Flip"
import { GSDevTools } from "gsap/GSDevTools"
import { InertiaPlugin } from "gsap/InertiaPlugin"
import { MotionPathHelper } from "gsap/MotionPathHelper"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { Observer } from "gsap/Observer"
import { Physics2DPlugin } from "gsap/Physics2DPlugin"
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { SplitText } from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"

gsap.registerPlugin(
  Draggable, // Make things draggable
  DrawSVGPlugin, // Progressively reveal / hide the stroke of an SVG
  Flip, // Smooth transitions between states
  GSDevTools, // Visual UI for interacting with / debugging animations.
  InertiaPlugin, // Smoothly glide proprties to a stop (i.e. after throwing)
  MotionPathHelper, // Interactively edit motionPaths directly in the browser
  MotionPathPlugin, // Give properties motion paths by following SVG paths, x/y values, scale/rotation values, etc
  MorphSVGPlugin, // Morph between predefined SVG paths
  Observer, // Listen for events (touch/mouse/pointer/draggable etc)
  Physics2DPlugin, // Provide simple physics functionality for object tweening.
  PhysicsPropsPlugin, // Props for Physics 2D
  ScrambleTextPlugin, // Scramble text
  ScrollTrigger, // Scrub, pin, snap, or trigger anything scroll-related
  ScrollSmoother, // Smooth scrolling effect
  ScrollToPlugin, // Scroll to an elima
  SplitText, // Split text into characters/words/lines to animate individually
  TextPlugin, // Replace text content, one character/word at a time
  RoughEase, // Ease Animations
  ExpoScaleEase, // Ease Animations
  SlowMo, // Ease Animations
  CustomEase, // Ease Animations
  CustomBounce, // Bounce Animations
  CustomWiggle, // Wiggle Animations
)

export {
  gsap,
  // Draggable,
  // DrawSVGPlugin,
  // Flip,
  // GSDevTools,
  // InertiaPlugin,
  // MotionPathHelper,
  // MotionPathPlugin,
  // MorphSVGPlugin,
  // Observer,
  // Physics2DPlugin,
  // PhysicsPropsPlugin,
  // ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  // ScrollToPlugin,
  // SplitText,
  // TextPlugin,
  // RoughEase,
  // ExpoScaleEase,
  // SlowMo,
  // CustomEase,
  // CustomBounce,
  // CustomWiggle,
}
