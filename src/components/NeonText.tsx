"use client";

import React, { useEffect, useState } from "react";

interface NeonTextProps {
    text: string;
    effectClass?: string;
    size?: 'small' | 'medium' | 'large';
    weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
}

const NeonText = ({ text, size = 'small', weight = 'normal', effectClass = 'logo' }: NeonTextProps) => {
    const [sizeClasses, setSizeClasses] = useState<string>("text-xl md:text-2xl");
    const [weightClasses, setWeightClasses] = useState<string>("font-normal");

    useEffect(() => {
        if (size === 'small') {
            setSizeClasses("text-xl md:text-2xl");
        } else if (size === 'medium') {
            setSizeClasses("text-4xl md:text-5xl");
        } else if (size === 'large') {
            setSizeClasses("text-7xl md:text-9xl");
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

    const getMaxSpansFromTextLength = (textLength: number) => {
        if (textLength <= 4) return 2;
        if (textLength <= 6) return 3;
        if (textLength <= 8) return 4;
        if (textLength <= 10) return 5;
        if (textLength <= 20) return 6;
        return Math.floor(textLength / 3);
    }

    const renderDynamicSpans = (text: string) => {
        if (text.length <= 3) return <b>{text}</b>;

        const minSpans = 2;
        const maxSpans = getMaxSpansFromTextLength(text.length);
        const spanCount = Math.floor(Math.random() * (maxSpans - minSpans + 1)) + minSpans;

        const spanSections = Array.from({ length: spanCount }, (_, i) => {
            const sectionSize = Math.floor(text.length / spanCount);
            const startRange = i * sectionSize;
            const endRange = i === spanCount - 1 ? text.length - 1 : (i + 1) * sectionSize - 1;

            const length = Math.random() < 0.5 ? 1 : 2;
            const maxStart = endRange - length + 1;
            const start = Math.max(startRange, Math.floor(Math.random() * (maxStart - startRange + 1)) + startRange);

            return { start, length };
        });
        const elements = [];
        let currentIndex = 0;

        for (const { start, length } of spanSections.sort((a, b) => a.start - b.start)) {
            if (start > currentIndex) {
                elements.push(
                    <React.Fragment key={`text-${currentIndex}`}>
                        {text.slice(currentIndex, start)}
                    </React.Fragment>
                );
            }

            elements.push(
                <span key={`span-${start}`}>{text.slice(start, start + length)}</span>
            );

            currentIndex = start + length;
        }

        if (currentIndex < text.length) {
            elements.push(
                <React.Fragment key={`text-${currentIndex}`}>
                    {text.slice(currentIndex)}
                </React.Fragment>
            );
        }

        return <p className="w-full h-full">{elements}</p>;
    };



    const actualText = renderDynamicSpans(text.trim());

    return (
        <div className="relative w-full h-full">
            <span
                className={`${sizeClasses} ${weightClasses} ${effectClass} w-full h-full relative 
    text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-pink-500 
    font-barlow z-[1000]`}
            >
                {actualText}
            </span>
            <span
                aria-hidden="true"
                className={`${sizeClasses} ${weightClasses} ${effectClass} w-full h-full absolute inset-0 
    text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-pink-500 
    drop-shadow-[0_0_15px_#38bdf8, 0_0_25px_#ec4899, 0_0_35px_#ec4899] 
    blur-sm pointer-events-none select-none font-barlow z-[500]`}
            >
                {actualText}
            </span>
            <span
                aria-hidden="true"
                className={`${sizeClasses} ${weightClasses} ${effectClass} w-full h-full absolute inset-0 
    text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-pink-600 
    drop-shadow-[0_0_15px_#38bdf8, 0_0_25px_#ec4899, 0_0_35px_#ec4899] 
    blur-xl pointer-events-none select-none font-barlow z-[100]`}
            >
                {actualText}
            </span>
            <span
                aria-hidden="true"
                className={`${sizeClasses} ${weightClasses} ${effectClass} w-full h-full absolute inset-0 
    text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-pink-700 
    drop-shadow-[0_0_15px_#38bdf8, 0_0_25px_#ec4899, 0_0_35px_#ec4899] 
    blur-md pointer-events-none select-none font-barlow z-[300]`}
            >
                {actualText}
            </span>
            <span
                aria-hidden="true"
                className={`${sizeClasses} font-bold ${effectClass} w-full h-full absolute inset-0 
    text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-pink-700 
    drop-shadow-[0_0_15px_#38bdf8, 0_0_25px_#ec4899, 0_0_35px_#ec4899] 
    blur-2xl pointer-events-none select-none font-barlow z-[300]`}
            >
                {actualText}
            </span>
            <span
                aria-hidden="true"
                className={`${sizeClasses} ${weightClasses} ${effectClass} w-full h-full absolute inset-0 
        text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-pink-300 font-barlow`}
            >
                {actualText}
            </span>
        </div>

    );
};

export default NeonText;

// "use client";

// import React, { useEffect, useState } from "react";

// interface NeonTextProps {
//     text: string;
//     effectClass?: string;
//     size?: 'small' | 'medium' | 'large';
//     weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
// }

// const NeonText = ({ text, size = 'small', weight = 'normal', effectClass = 'logo' }: NeonTextProps) => {
//     const [sizeClasses, setSizeClasses] = useState<string>("text-xl md:text-2xl");
//     const [weightClasses, setWeightClasses] = useState<string>("font-normal");
//     const [largeGlowSize, setLargeGlowSize] = useState<string>("text-4xl md:text-5xl");

//     useEffect(() => {
//         if (size === 'small') {
//             setSizeClasses("text-xl md:text-2xl");
//             setLargeGlowSize("text-3xl md:text-4xl");
//         } else if (size === 'medium') {
//             setSizeClasses("text-3xl md:text-4xl");
//             setLargeGlowSize("text-4xl md:text-5xl");
//         } else if (size === 'large') {
//             setSizeClasses("text-5xl md:text-7xl");
//             setLargeGlowSize("text-6xl md:text-8xl");
//         }
//     }, [size]);

//     useEffect(() => {
//         const weightMap: Record<string, string> = {
//             thin: "font-thin",
//             extralight: "font-extralight",
//             light: "font-light",
//             normal: "font-normal",
//             medium: "font-medium",
//             semibold: "font-semibold",
//             bold: "font-bold",
//             extrabold: "font-extrabold",
//         };
//         setWeightClasses(weightMap[weight] || "font-normal");
//     }, [weight]);

//     const getMaxSpansFromTextLength = (textLength: number) => {
//         if (textLength <= 4) return 2;
//         if (textLength <= 6) return 3;
//         if (textLength <= 8) return 4;
//         if (textLength <= 10) return 5;
//         if (textLength <= 20) return 6;
//         return Math.floor(textLength / 3);
//     }

//     const renderDynamicSpans = (text: string) => {
//         if (text.length <= 3) return <b>{text}</b>;

//         const minSpans = 2;
//         const maxSpans = getMaxSpansFromTextLength(text.length);
//         const spanCount = Math.floor(Math.random() * (maxSpans - minSpans + 1)) + minSpans;

//         const spanSections = Array.from({ length: spanCount }, (_, i) => {
//             const sectionSize = Math.floor(text.length / spanCount);
//             const startRange = i * sectionSize;
//             const endRange = i === spanCount - 1 ? text.length - 1 : (i + 1) * sectionSize - 1;

//             const length = Math.random() < 0.5 ? 1 : 2;
//             const maxStart = endRange - length + 1;
//             const start = Math.max(startRange, Math.floor(Math.random() * (maxStart - startRange + 1)) + startRange);

//             return { start, length };
//         });
//         const elements = [];
//         let currentIndex = 0;

//         for (const { start, length } of spanSections.sort((a, b) => a.start - b.start)) {
//             if (start > currentIndex) {
//                 elements.push(
//                     <React.Fragment key={`text-${currentIndex}`}>
//                         {text.slice(currentIndex, start)}
//                     </React.Fragment>
//                 );
//             }

//             elements.push(
//                 <span key={`span-${start}`}>{text.slice(start, start + length)}</span>
//             );

//             currentIndex = start + length;
//         }

//         if (currentIndex < text.length) {
//             elements.push(
//                 <React.Fragment key={`text-${currentIndex}`}>
//                     {text.slice(currentIndex)}
//                 </React.Fragment>
//             );
//         }

//         return <p className="w-full">{elements}</p>;
//     };

//     const actualText = renderDynamicSpans(text.trim());

//     return (
//         <div className="relative w-full overflow-hidden">
//             {/* Actual Gradient Text */}
//             <span
//                 className={`${sizeClasses} ${weightClasses} ${effectClass} block relative 
//                 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-pink-500 
//                 font-barlow z-10`}
//             >
//                 {actualText}
//             </span>
            
//             {/* Glow Layers - Made responsive */}
//             <span
//                 aria-hidden="true"
//                 className={`${sizeClasses} ${weightClasses} ${effectClass} absolute inset-0 
//                 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-pink-500 
//                 drop-shadow-[0_0_15px_#38bdf8,0_0_25px_#ec4899] 
//                 blur-sm pointer-events-none select-none font-barlow`}
//             >
//                 {actualText}
//             </span>
            
//             <span
//                 aria-hidden="true"
//                 className={`${sizeClasses} ${weightClasses} ${effectClass} absolute inset-0 
//                 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-pink-600 
//                 drop-shadow-[0_0_15px_#38bdf8] 
//                 blur-xl pointer-events-none select-none font-barlow`}
//             >
//                 {actualText}
//             </span>
            
//             <span
//                 aria-hidden="true"
//                 className={`${sizeClasses} ${weightClasses} ${effectClass} absolute inset-0 
//                 text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-pink-700 
//                 drop-shadow-[0_0_15px_#38bdf8] 
//                 blur-md pointer-events-none select-none font-barlow`}
//             >
//                 {actualText}
//             </span>
            
//             {/* Largest glow - now responsive */}
//             <span
//                 aria-hidden="true"
//                 className={`${largeGlowSize} ${weightClasses} ${effectClass} absolute inset-0 
//                 text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-pink-700 
//                 drop-shadow-[0_0_15px_#38bdf8] 
//                 blur-2xl pointer-events-none select-none font-barlow`}
//             >
//                 {actualText}
//             </span>
            
//             {/* Gradient Stroke Layer */}
//             <span
//                 aria-hidden="true"
//                 className={`${sizeClasses} ${weightClasses} ${effectClass} absolute inset-0 
//                 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-pink-300 font-barlow`}
//             >
//                 {actualText}
//             </span>
//         </div>
//     );
// };

// export default NeonText;