import { useState, useRef, useEffect } from 'react';
import { Phone, Video, Info, Plus, Send, ChevronLeft } from 'lucide-react';
const ChatBox = () => {
    // 1. State for messages
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey! Down for 18 holes at Pebble Beach this weekend?", time: "10:42 AM", sender: "other" },
        { id: 2, text: "Definitely! What time are you thinking? I've got my clubs ready.", time: "10:45 AM", sender: "me", status: "read" },
        { id: 3, text: "How about 8:30 AM? Morning light at Pebble is incredible", time: "10:46 AM", sender: "other" },
    ]);

    const [inputValue, setInputValue] = useState("");
    /* For Scrollbar */
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (inputValue.trim() === "") return;

        const newMessage = {
            id: Date.now(),
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: "me",
            status: "delivered"
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    return (
        <div className="flex flex-col max-w-7xl mx-auto bg-[#F5F5F5] border border-gray-200 rounded-2xl my-10">
            <header className="flex items-center justify-between px-4 py-4 border-b border-[#dbd8d8]">
                <div className="flex items-center gap-3">
                    <ChevronLeft size={30} className="text-gray-600 cursor-pointer" />
                    <img src="https://i.pravatar.cc/150?u=sadia" className="w-14 h-14 rounded-full" alt="Avatar" />
                    <div>
                        <h2 className="font-semibold text-[#0F172A] text-lg">Sadia Hossain</h2>
                        <span className="text-sm text-[#34C759] font-medium">Active now</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-rose-800">
                    <Phone size={22} fill="currentColor" className='cursor-pointer' />
                    <Video size={22} fill="currentColor" className='cursor-pointer' />
                    <Info size={22} className="text-gray-300 cursor-pointer" />
                </div>
            </header>

            <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-[#fafafa]">
                <div className='flex justify-between items-center gap-2'>
                    <div className='w-full h-0.5 bg-[#f7e7e9]'></div>
                    <div className="text-center text-sm text-gray-400 font-semibold tracking-widest">Today</div>
                    <div className='w-full h-0.5 bg-[#f7e7e9]'></div>
                </div>
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                        {
                            msg.sender === 'other' && <img src="https://i.pravatar.cc/150?u=other" className="w-8 h-8 rounded-full mb-4" />
                        }
                        <div className={`max-w-[75%] ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                            <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'bg-rose-50 text-gray-800 rounded-br-none py-4' : 'bg-white text-gray-800 rounded-bl-none py-4'
                                }`}>
                                {msg.text}
                            </div>
                            <span className="text-xs text-gray-400 mt-1 block">{msg.time} {msg.sender === 'me' && <span className='text-[#B6003F]'>✓✓</span>}</span>
                        </div>

                        {msg.sender === 'me' && <img src="https://i.pravatar.cc/150?u=me" className="w-8 h-8 rounded-full mb-4" />}
                    </div>
                ))}
            </main>

            <footer className="p-4 bg-white">
                <div className="flex items-center gap-2">
                    <button className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                        <Plus size={20} />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message...."
                            className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:outline-none"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-800"
                        >
                            <Send size={18} className="rotate-45" />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatBox;