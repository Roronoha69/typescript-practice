import React from 'react';
import '../styles/Loader.scss';
import { useState } from 'react';
import { star, heart, hand, plane, lightning, note } from './paths';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { getIndex, useFlubber } from './use-flubber';

const paths = [lightning, hand, plane, heart, note, star, lightning];
const colors = ['#00cc88', '#0099ff', '#8855ff', '#ff0055', '#ee4444', '#ffcc00', '#00cc88'];




function Loader() {

    const [pathIndex, setPathIndex] = useState(0);
    const progress = useMotionValue(pathIndex);
    const fill = useTransform(progress, paths.map(getIndex), colors);
    const path = useFlubber(progress, paths);

    React.useEffect(() => {
        const animation = animate(progress, pathIndex, {
            duration: 0.8,
            ease: 'easeInOut',
            onComplete: () => {
                if (pathIndex === paths.length - 1) {
                    progress.set(0);
                    setPathIndex(1);
                } else {
                    setPathIndex(pathIndex + 1);
                }
            }
        });

        return () => animation.stop();
    }, [pathIndex]);


    return (
        <div className="all-Loader">
            {/* <div className="title">
                <motion.span transition={{ type: 'spring', stiffness: 100 }} className="er">
                    premier
                </motion.span>
                <span className="x">x</span>

                <motion.span animate={{ y: 0 }} transition={{ duration: 1 }} className="nd">
                    Second
                </motion.span>
            </div> */}

            <svg width="400" height="400">
                <g transform="translate(10 10) scale(17 17)">
                    <motion.path fill={fill} d={path} />
                </g>
            </svg>

            <div className="body">
                <motion.span animate={{ x: [-300, 0, -200, 1000], y: [100, -100, -110, 100] }} transition={{ duration: 5 }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </motion.span>
                <motion.div animate={{ x: [-300, 0, -200, 1000], y: [100, -100, -110, 100] }} transition={{ duration: 5 }} className="base">
                    <span></span>
                    <div className="face"></div>
                </motion.div>
            </div>
            <div className="longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default Loader;
