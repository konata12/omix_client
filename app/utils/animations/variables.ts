import { BasicAnimationTransition } from "@/app/types/animations/animations_basic_values.type";
import { BezierDefinition } from "framer-motion";

export const basicAnimationCubicBezierValues: BezierDefinition = [0, 0, 0.58, 1];
export const basicAnimationDuration = 0.706;

export const basicAnimationTransition: BasicAnimationTransition = {
	ease: basicAnimationCubicBezierValues,
	duration: basicAnimationDuration,
};
