"use client";

import { useEffect, useState } from "react";

interface NeonTextProps {
    text: string;
    effectClass?: string;
    size?: 'small' | 'medium' | 'large';
    weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}

const NeonText = ({ text, size = 'small', weight = 'normal', effectClass= 'logo' }: NeonTextProps) => {
    const [sizeClasses, setSizeClasses] = useState<string>("text-xl md:text-2xl");
    const [weightClasses, setWeightClasses] = useState<string>("font-normal");

    useEffect(() => {
        if (size === 'small') {
            setSizeClasses("text-xl md:text-2xl");
        } else if (size === 'medium') {
            setSizeClasses("text-4xl md:text-5xl");
        } else if (size === 'large') {
            setSizeClasses("text-8xl md:text-9xl");
        }
    }, [size]);

    useEffect(() => {
        const weightMap: Record<string, string> = {
            thin: "font-thin",
            extralight: "font-extralight",
            light: "font-light",
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            extrabold: "font-extrabold",
        };
        setWeightClasses(weightMap[weight] || "font-normal");
    }, [weight]);

    const renderDynamicSpans = (text: string) => {
        if (text.length <= 2) return <b>{text}</b>;

        // Generate two unique random indices
        let index1 = Math.floor(Math.random() * text.length);
        let index2 = Math.floor(Math.random() * text.length);
        while (index2 === index1) {
            index2 = Math.floor(Math.random() * text.length);
        }

        const spanIndices = [index1, index2].sort((a, b) => a - b);

        return (
            <p>
                {text.split('').map((char, index) => {
                    if (index === spanIndices[0] || index === spanIndices[1]) {
                        return <span key={index}>{char}</span>;
                    } else {
                        return <>{char}</>;
                    }
                })}
            </p>
        );
    };

    return (
        <div className="flex items-center justify-center p-4">
            <h1
                className={`${sizeClasses} ${weightClasses} text-center ${effectClass}
                bg-gradient-to-r from-sky-600 to-pink-500 bg-clip-text text-transparent 
                drop-shadow-[0_0_10px_#a855f7,0_0_20px_#a855f7,0_0_30px_#a855f7] 
                font-barlow`}
            >
                {renderDynamicSpans(text)}
            </h1>
        </div>
    );
};

export default NeonText;
