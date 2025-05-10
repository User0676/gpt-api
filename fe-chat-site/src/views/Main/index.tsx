'use client'
import { MainViewProps } from "./types";
import { FC, useState } from "react";
import Input from "@/shared/assets/ui/Input";

const MainView: FC<MainViewProps> = ({ data, featured }) => {
  const [text, setText] = useState('');
  const [gptResponse, setGptResponse] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();                         
    if (!text.trim()) return;

    try {
      const res = await fetch('http://localhost:3001/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const answer = await res.json();
      console.log('Ответ сервера:', answer);
      setGptResponse(answer.response)
    } catch (err) {
      console.error(err);
    } finally {
      setText('');                              
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="max-w-[70%] flex flex-col h-screen ">
 
      <main className="h-[70%]">
      {gptResponse?
       <div className="text-white text-3xl overflow-y-auto h-[90%]">{gptResponse}</div> : <div className="flex flex-col gap-10 flex-grow">
      <h1 className="text-white text-4xl">Hi there!</h1>
      <h1 className="text-white text-5xl">What would you like to know?</h1>
      <h1 className="text-white text-2xl max-w-[60%]">Use one of the most common prompts below or ask your own question</h1>
      </div>}
    
      </main>
      <footer className="">
      <Input label={'Ask whatever you want'}
      onChange={(e) => setText((e.target as HTMLInputElement).value)}
      submitButton
      audio/>
      </footer>
    
    </div>
    </form>
  );
}

export default MainView;
