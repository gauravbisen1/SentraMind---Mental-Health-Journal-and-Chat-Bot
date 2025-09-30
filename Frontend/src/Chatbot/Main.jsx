import React from 'react'
import Sidebar from './Sidebar'

const Main = () => {
    return (
        <>

            <main className=" w-full max-h-screen relative overflow-y-auto bg-gray-400 text-gray-800 ">
                {/* Top Nav */}

                <div className="flex items-center justify-between text-[22px] p-5 text-gray-600">
                    <p>Sentramind</p>
                    <img
                        src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="w-10 h-10 rounded-full"
                    />
                </div>

                {/* Main Container */}
                <div className="max-w-[900px] mx-auto">
                    {/* Greeting */}
                    <div className="text-[2.5rem] md:text-[56px] text-[#c4c7c5] font-medium p-5 leading-tight">
                        <p>
                            <span className="bg-gradient-to-tr from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
                                Hello, Dev
                            </span>
                        </p>
                        <p>How can I help you today?</p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 overflow-x-auto mb-40 scrollbar-hide">
                        <div className="relative h-[200px] min-w-[200px] p-4 bg-[#f0f4f9] rounded-lg cursor-pointer hover:bg-[#dfe4ea]">
                            <p className="text-gray-600 text-[17px]">
                                Suggest beautiful places to see on an upcoming road trip
                            </p>
                            <img
                                src="/compass_icon.png"
                                alt="compass"
                                className="w-9 p-1 absolute bottom-3 right-3 bg-white rounded-full"
                            />
                        </div>

                        <div className="relative h-[200px] min-w-[200px] p-4 bg-[#f0f4f9] rounded-lg cursor-pointer hover:bg-[#dfe4ea]">
                            <p className="text-gray-600 text-[17px]">
                                Briefly summarize this concept: urban planning
                            </p>
                            <img
                                src="/bulb_icon.png"
                                alt="bulb"
                                className="w-9 p-1 absolute bottom-3 right-3 bg-white rounded-full"
                            />
                        </div>

                        <div className="relative h-[200px] min-w-[200px] p-4 bg-[#f0f4f9] rounded-lg cursor-pointer hover:bg-[#dfe4ea]">
                            <p className="text-gray-600 text-[17px]">
                                Brainstorm team bonding activities for our work retreat
                            </p>
                            <img
                                src="/message_icon.png"
                                alt="message"
                                className="w-9 p-1 absolute bottom-3 right-3 bg-white rounded-full"
                            />
                        </div>

                        <div className="relative h-[200px] min-w-[200px] p-4 bg-[#f0f4f9] rounded-lg cursor-pointer hover:bg-[#dfe4ea]">
                            <p className="text-gray-600 text-[17px]">
                                Tell me about React js and React native
                            </p>
                            <img
                                src="/code_icon.png"
                                alt="code"
                                className="w-9 p-1 absolute bottom-3 right-3 bg-white rounded-full"
                            />
                        </div>
                    </div>
                </div>
                <br /><br /><br />
                {/* Bottom Input */}
                <div className="bottom-0 left-0 right-0 px-5 pb-5 pt-3 bg-white shadow-[0_-20px_50px_#ffffff]">
                    <div className="flex items-center justify-between gap-4 bg-[#f0f4f9] px-5 py-2 rounded-full max-w-[900px] mx-auto flex-col md:flex-row md:items-center">
                        <textarea
                            rows={1}
                            className="flex-1 bg-transparent border-none outline-none resize-none text-[18px] px-2 py-2 w-full md:w-auto"
                            placeholder="Enter a prompt here"
                        />
                        <div className="flex items-center gap-3 ml-auto">
                            <button className="p-2 hover:bg-[#e8eaed] rounded-full">
                                <img src="/gallery_icon.png" alt="gallery" className="w-6" />
                            </button>
                            <button className="p-2 hover:bg-[#e8eaed] rounded-full">
                                <img src="/mic_icon.png" alt="mic" className="w-6" />
                            </button>
                            <button className="p-2 hover:bg-[#e8eaed] rounded-full">
                                <img src="/send_icon.png" alt="send" className="w-6" />
                            </button>
                        </div>
                    </div>
                    <p className="text-[13px] text-center font-light mt-3 text-gray-600 max-w-[900px] mx-auto">
                        Gemini may display inaccurate info, including about people, so
                        double-check its responses.{" "}
                        <a href="#" className="text-gray-600 underline">
                            Your privacy and Gemini Apps
                        </a>
                    </p>
                </div>
            </main>
        </>
    )
}

export default Main