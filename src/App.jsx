import React, { useState, useEffect } from "react";
import parser from "html-react-parser";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import c from "highlight.js/lib/languages/c";
import kotlin from "highlight.js/lib/languages/kotlin";
import golang from "highlight.js/lib/languages/go";
import r from "highlight.js/lib/languages/r";
import java from "highlight.js/lib/languages/java";
import typescript from "highlight.js/lib/languages/typescript";
import nodejs from "highlight.js/lib/languages/javascript";
import ruby from "highlight.js/lib/languages/ruby";
import perl from "highlight.js/lib/languages/perl";
import swift from "highlight.js/lib/languages/swift";
import fortran from "highlight.js/lib/languages/fortran";
import bash from "highlight.js/lib/languages/bash";
import csharp from "highlight.js/lib/languages/csharp";
import php from "highlight.js/lib/languages/php";

import "./App.css";
// Then register the languages you need
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("python", python);
hljs.registerLanguage("c", c);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("golang", golang);
hljs.registerLanguage("r", r);
hljs.registerLanguage("java", java);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("nodejs", nodejs);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("perl", perl);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("fortran", fortran);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("php", php);
import axios from "axios";
function App() {
    const [code, setCode] = useState("");
    const [icode, setICode] = useState("");
    const [ocode, setOCode] = useState("");
    const [plang, setPlang] = useState("c_cpp");
    const [isLoading, setIsLoading] = useState(false);
    const options = {
        method: "POST",
        url: "https://code-compiler10.p.rapidapi.com/",
        headers: {
            "content-type": "application/json",
            "x-compile": "rapidapi",
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
                import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "code-compiler10.p.rapidapi.com",
        },
        data: {
            langEnum: [
                "php",
                "python",
                "c",
                "c_cpp",
                "csharp",
                "kotlin",
                "golang",
                "r",
                "java",
                "typescript",
                "nodejs",
                "ruby",
                "perl",
                "swift",
                "fortran",
                "bash",
            ],
            lang: plang,
            code: code,
            input: icode,
        },
    };
    async function runCode() {
        setIsLoading(true);
        let code = 200;
        try {
            const response = await axios.request(options);
            setOCode(response.data.output);
        } catch (error) {
            setOCode("Some Error Occured:\n"+response.data.output);
            code = 401;
        }
        finally{
        setIsLoading(false);}
    }
    const lang = [
        "python",
        "c",
        "kotlin",
        "golang",
        "r",
        "java",
        "typescript",
        "nodejs",
        "ruby",
        "perl",
        "swift",
        "fortran",
        "bash",
    ];

    return (
        <div className=" bg-[#0b1123] w-full h-screen flex flex-col justify-center items-center">
            <nav className="w-full bg-[#603b74] px-3 flex justify-between items-center">
                <h1 className="text-xs sm:text-lg py-1 font-bold text-white uppercase ">
                    Betaditor <span className="text-yellow-300">{" </>"}</span>
                </h1>
                <a
                    href="https://www.github.com/Sujas-Aggarwal"
                    className=" text-white text-xs "
                >
                    Made with ❣️ by Sujas Aggarwal
                </a>
            </nav>
            <main className="flex sm:flex-row flex-col justify-center items-center overflow-hidden w-full h-full l">
                <div
                    id="code-container"
                    className="w-full  sm:min-w-[60%] p-2  h-full  bg-slate-900 "
                >
                    <nav>
                        <div className="w-full pb-1  flex justify-between items-center">
                            <div className="flex gap-2 items-center justify-center">
                                <select
                                    name="lang"
                                    id="lang"
                                    value={plang}
                                    onChange={(e) => {
                                        setPlang(e.target.value);
                                    }}
                                    className="outline-none  bg-[#603b74] text-white font-bold px-4 py-1"
                                >
                                    <option value="c_cpp">C++</option>
                                    <option value="php">PHP</option>
                                    <option value="csharp">C#</option>
                                    {lang.map((l, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={l}
                                                className=""
                                            >
                                                {l[0].toUpperCase() +
                                                    l.slice(1)}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex justify-center gap-2 items-center">
                                <button
                                    onClick={() => {
                                        setCode("");
                                    }}
                                    className="text-xs active:bg-[#41264f] sm:text-sm py-1 px-4 font-bold text-white uppercase bg-[#603b74] rounded-sm"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={runCode}
                                    className="text-xs active:bg-[#41264f] sm:text-sm py-1 px-4 font-bold text-white uppercase bg-[#603b74] rounded-sm"
                                >
                                    Run
                                </button>
                            </div>
                        </div>
                    </nav>
                    <div className="w-full relative  h-full ">
                        <textarea
                            onFocus={(e) => {
                                e.target.addEventListener("keydown", (e) => {
                                    if (e.key === "Tab") {
                                        e.preventDefault();
                                        let start = e.target.selectionStart;
                                        let end = e.target.selectionEnd;
                                        if (start !== end) {
                                            return;
                                        }
                                        e.target.value =
                                            e.target.value.substring(0, start) +
                                            "  " +
                                            e.target.value.substring(end);
                                        e.target.selectionStart =
                                            e.target.selectionEnd = start + 2;
                                    }
                                });
                            }}
                            className="w-full whitespace-nowrap overflow-x-hidden resize-none absolute selection:bg-blue-300 opacity-20    h-full outline-none bg-slate-900 text-white font-mono"
                            id="code-input"
                            data-gramm="false"
                            data-gramm_editor="false"
                            spellCheck="false"
                            value={code}
                            data-enable-grammarly="false"
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        ></textarea>
                        <pre id="formatted" className="w-full  h-full outline-none overflow-hidden  text-white font-mono">
                            <code>
                                {parser(hljs.highlightAuto(code).value)}
                            </code>
                        </pre>
                    </div>
                </div>
                <div
                    id="io-container"
                    className="w-full h-full bg-green-50 flex flex-col justify-center items-center"
                >
                    <div className="w-full p-2  h-full  bg-slate-800">
                        <nav>
                            <div className="w-full flex justify-between items-center">
                                <div className="flex gap-2 items-center justify-center text-white font-bold">
                                    INPUT STREAM
                                </div>
                            </div>
                        </nav>
                        <textarea
                            data-gramm="false"
                            data-gramm_editor="false"
                            spellCheck="false"
                            value={icode}
                            onChange={(e) => {
                                setICode(e.target.value);
                            }}
                            data-enable-grammarly="false"
                            id="input-container"
                            className="w-full  whitespace-nowrap overflow-x-hidden resize-none  selection:bg-blue-300  h-full outline-none bg-slate-800 text-white font-mono"
                        ></textarea>
                    </div>
                    <hr className="w-full" />
                    <div className="w-full p-2  h-full  bg-slate-800 flex flex-col">
                        <nav>
                            <div className="w-full flex justify-between items-center">
                                <div className="flex gap-2 items-center justify-center text-white font-bold">
                                    OUTPUT STREAM
                                </div>
                            </div>
                        </nav>
                        {isLoading ? (
                            <svg
                                class="ip"
                                className="p-2 self-center mt-[10%]"
                                viewBox="0 0 256 128"
                                width="256px"
                                height="128px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient
                                        id="grad1"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="0"
                                    >
                                        <stop
                                            offset="0%"
                                            stop-color="#5ebd3e"
                                        />
                                        <stop
                                            offset="33%"
                                            stop-color="#ffb900"
                                        />
                                        <stop
                                            offset="67%"
                                            stop-color="#f78200"
                                        />
                                        <stop
                                            offset="100%"
                                            stop-color="#e23838"
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="grad2"
                                        x1="1"
                                        y1="0"
                                        x2="0"
                                        y2="0"
                                    >
                                        <stop
                                            offset="0%"
                                            stop-color="#e23838"
                                        />
                                        <stop
                                            offset="33%"
                                            stop-color="#973999"
                                        />
                                        <stop
                                            offset="67%"
                                            stop-color="#009cdf"
                                        />
                                        <stop
                                            offset="100%"
                                            stop-color="#5ebd3e"
                                        />
                                    </linearGradient>
                                </defs>
                                <g
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-width="16"
                                >
                                    <g class="ip__track" stroke="#ddd">
                                        <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                                        <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                                    </g>
                                    <g stroke-dasharray="180 656">
                                        <path
                                            class="ip__worm1"
                                            stroke="url(#grad1)"
                                            stroke-dashoffset="0"
                                            d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                                        />
                                        <path
                                            class="ip__worm2"
                                            stroke="url(#grad2)"
                                            stroke-dashoffset="358"
                                            d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                                        />
                                    </g>
                                </g>
                            </svg>
                        ) : (
                            <textarea
                                readOnly
                                id="input-container"
                                data-gramm="false"
                                data-gramm_editor="false"
                                spellCheck="false"
                                value={ocode}
                                data-enable-grammarly="false"
                                className="w-full   resize-none  selection:bg-blue-300  h-full outline-none bg-slate-800 text-white font-mono"
                            ></textarea>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
