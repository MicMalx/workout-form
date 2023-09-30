import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 8;
const MAX = 100;

export const RangeInput = ({onChange}: {onChange: (val: number) => void}) => {
    const [val, setVal] = useState([8]);
    useEffect(() => {
        onChange(val[0]);
    }, [val])

    return (
        <>

            <label htmlFor="range" className="mt-6 mb-4 block text-base text-[#000853]">Age</label>
            <div className="flex justify-between text-[#000853] text-xs -mb-[6px]">
                <p>8</p>
                <p>100</p>
            </div>
            <div
                id="range"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <Range
                    values={val}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setVal(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "420px"
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "4px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: val,
                                        colors: ["#761BE4", "#CBB6E5"],
                                        min: MIN,
                                        max: MAX
                                    }),
                                    alignSelf: "center"
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                            }}
                            className="mt-[14px] flex flex-col gap-1 items-center focus:ring-0 focus:ring-offset-0 focus:outline-0"
                        >
                            <div className="w-[16px] h-[16px] bg-[#761BE4] rounded-[50%]"></div>
                            <div>
                                <svg width="37" height="31" viewBox="0 0 37 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Union">
                                        <mask id="path-1-inside-1_805_585" fill="white">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3971 6L18.5 0L14.6029 6H4C1.79086 6 0 7.79086 0 10V27C0 29.2091 1.79086 31 4 31H33C35.2091 31 37 29.2091 37 27V10C37 7.79086 35.2091 6 33 6H22.3971Z" />
                                        </mask>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3971 6L18.5 0L14.6029 6H4C1.79086 6 0 7.79086 0 10V27C0 29.2091 1.79086 31 4 31H33C35.2091 31 37 29.2091 37 27V10C37 7.79086 35.2091 6 33 6H22.3971Z" fill="#FAF9FA" />
                                        <path d="M18.5 0L19.3386 -0.544705L18.5 -1.83586L17.6614 -0.544705L18.5 0ZM22.3971 6L21.5585 6.5447L21.8542 7H22.3971V6ZM14.6029 6V7H15.1458L15.4415 6.5447L14.6029 6ZM17.6614 0.544705L21.5585 6.5447L23.2357 5.4553L19.3386 -0.544705L17.6614 0.544705ZM15.4415 6.5447L19.3386 0.544705L17.6614 -0.544705L13.7643 5.4553L15.4415 6.5447ZM4 7H14.6029V5H4V7ZM1 10C1 8.34315 2.34315 7 4 7V5C1.23858 5 -1 7.23858 -1 10H1ZM1 27V10H-1V27H1ZM4 30C2.34315 30 1 28.6569 1 27H-1C-1 29.7614 1.23858 32 4 32V30ZM33 30H4V32H33V30ZM36 27C36 28.6569 34.6569 30 33 30V32C35.7614 32 38 29.7614 38 27H36ZM36 10V27H38V10H36ZM33 7C34.6569 7 36 8.34315 36 10H38C38 7.23858 35.7614 5 33 5V7ZM22.3971 7H33V5H22.3971V7Z" fill="#CBB6E5" mask="url(#path-1-inside-1_805_585)" />
                                    </g>
                                </svg>
                            </div>
                            <div className="text-center text-xs -mt-6">
                                {val[0]}
                            </div>
                        </div>
                    )}
                />
            </div>
        </>
    );

}