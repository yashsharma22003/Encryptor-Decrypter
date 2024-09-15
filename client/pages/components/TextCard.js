import Link from "next/link";
import React from "react";

const TextCard = ({ text }) => {



    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                
                        <div className="p-5 bg-blue-200 text-green-600 text-lg font-bold flex justify-center justify-between">
                        {text[1]}
                            <div className="mr-4">
                            
                                <Link href={`/encryptionIndex?id=${text[0]}`} passHref>
                                    <button className="bg-red-400 rounded-lg p-1 px-4 text-cyan-100 border-4 border-transparent transition-transform transform hover:scale-105">
                                        Encrypt </button>
                                </Link>
                            </div>
                        </div>
                    
                
                    <div className="p-5 bg-green-400">No data available</div>
                
            </div>
        </div>
    );
};

export default TextCard;
