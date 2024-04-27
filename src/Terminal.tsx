import React, { useState, useEffect, PropsWithChildren } from "react";
import { SiGnubash } from "react-icons/si";
import { myText } from "./text";
import { IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";

type CommandOutput = {
  command: string;
  output: string;
};

type Props = {
  dark: boolean;
  setDark: (dark: boolean) => void;
};

const Terminal = (props: PropsWithChildren<Props>) => {
  const currentTime = new Date().getTime();
  const expiryTime = localStorage.getItem("expiryTime");

  if (expiryTime && currentTime - Number(expiryTime) > 2 * 60 * 60 * 1000) {
    localStorage.removeItem("hasShownSummary");
    localStorage.removeItem("expiryTime");
  }

  const hasShownSummary = localStorage.getItem("hasShownSummary");

  const [commandList, setCommandList] = useState<CommandOutput[]>(
    hasShownSummary
      ? []
      : [
          {
            command: "summary",
            output: `<pre>${myText}</pre> <p>Welcome! to my site</p>
            <p>Type 'help' to see the list of available commands.</p>
            <p>Type 'repo' for github repository.</p>`,
          },
        ]
  );
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hasShownSummary) {
      localStorage.setItem("hasShownSummary", "true");
      localStorage.setItem("expiryTime", String(new Date().getTime()));
    }
  });

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current && isScreenFull()) {
        inputRef.current.focus();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isScreenFull = () => {
    return (
      window.innerHeight >= document.documentElement.scrollHeight &&
      window.innerWidth >= document.documentElement.scrollWidth
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const command = currentCommand.trim();

      if (command !== "") {
        let output = "";
        switch (command.toLowerCase()) {
          case "clear":
          case "cls":
            setCommandList([]);
            setCurrentCommand("");
            return;
          case "":
            break;
          case "help":
            output = `
              <p style="font-weight:bold;">Available commands -</p>
              <div style="display:grid;grid-template-columns: repeat(3, 1fr);">
              <p>contact</p>
              <p>linkedin</p>
              <p>github</p>
              <p>google</p>
              <p>youtube</p>  
              <p>weather</p>
              <p>summary</p>
              <p>date</p>
              <p>summary</p>
              <p>sudo</p>
              </div>
             `;
            break;
          case "contact":
            output = `
              Email: rajparatarang66@gmail.com 
              `;
            break;
          case "linkedin":
            window.open(
              "https://www.linkedin.com/in/tarang-rajpara-354683292/"
            );
            output = "Opening... Linkedin";
            break;
          case "sudo":
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            output = "Permission denied - You don't have permission to do that";
            break;
          case "github":
            window.open("https://www.github.com/tnrajpara");
            output = "Opening... Github";
            break;
          case "gh":
            window.open("https://www.github.com/tnrajpara");
            output = "Opening... Github";
            break;
          case "date":
            output = new Date().toString();
            break;
          case "whoami":
            output = "visitor";
            break;
          case "repo":
            window.open("https://github.com/tnrajpara/CLI-portfolio");
            output = "Opening... Repository";
            break;
          case `weather ${command.split(" ")[1]}`:
            output = "Fetching weather data...";

            try {
              const city = command.split(" ")[1];
              const data = fetch(`https://wttr.in/${city}`);
              data
                .then((response) => response.text())
                .then((text) => {
                  output = text;
                  setCommandList((prevCommands) => [
                    ...prevCommands,
                    { command: command, output: output },
                  ]);
                });
            } catch (e) {
              console.error("Error fetching data");
            }
            break;
          case "summary":
            output = `
            <pre>${myText}</pre>
            <p>Welcome! to my site</p>
            <p>Type 'help' to see the list of available commands.</p>
            <p>Type 'repo' for github repository.</p>
            `;
            break;
          case "weather":
            output = `<p>
            Usage: weather [region]. Example: weather gujarat
            </p>`;
            break;
          case "google":
            window.open("https://www.google.com");
            output = "Opening... Google";
            break;
          case "youtube":
            window.open("https://www.youtube.com");
            output = "Opening... Youtube";
            break;
          case "resume":
            output = `<p style="color:yellow;">Currently not available</p>`;
            break;
          default:
            output = `<p style="color:red;">shell: command not found: ${command}. Try 'help' to get started.</p>`;
        }

        setCommandList((prevCommands) => [
          ...prevCommands,
          { command: command, output: output },
        ]);
        setCurrentCommand("");
        inputRef.current?.focus();
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(event.target.value);
  };

  return (
    <div
      className={
        props.dark
          ? `lg:w-11/12 overflow-y-auto mx-2 my-2 rounded-xl  bg-gray-800`
          : `w-11/12 overflow-y-auto mx-2 my-2 rounded-xl bg-[#FFFDD0]`
      }
    >
      <div
        className={`sticky top-0 z-10 ${
          props.dark ? "bg-gray-900" : "bg-[#FFFDD0] "
        } w-full `}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <SiGnubash
            className={`${
              props.dark ? "text-white" : ""
            } text-center ml-4 text-4xl`}
          />
          <h1
            className={`${
              props.dark ? "text-gray-100" : "text-gray-900"
            } px-2 py-4 text-center text-xl flex-grow font-extrabold`}
          >
            CLI PORTFOLIO
          </h1>
          {props.dark ? (
            <MdWbSunny
              className="text-white text-2xl mr-4 cursor-pointer"
              onClick={() => props.setDark(false)}
            />
          ) : (
            <IoMoon
              className="text-[#111111] text-2xl mr-4 cursor-pointer"
              onClick={() => props.setDark(true)}
            />
          )}
        </div>
      </div>

      {commandList.map((item, index) => (
        <div
          key={index}
          className={props.dark ? "mt-5 bg-gray-800 " : "mt-5 bg-[#FFFDD0] "}
        >
          <div className="flex">
            <h1
              className={
                props.dark
                  ? "text-[#76ABAE] mr-4 ml-2 "
                  : "text-lime-500 mr-4 ml-2 "
              }
            >
              Tarang<span className="text-green-400">@live</span>:~
              {currentCommand !== "home" && "$"}
            </h1>
            <input
              type="text"
              value={item.command}
              className={
                props.dark
                  ? "bg-transparent outline-none text-[#EEEEEE] "
                  : "bg-transparent outline-none text-[#111111]"
              }
              readOnly
            />
          </div>

          <div className="text-[#EEEEEE] ml-2 mt-1">
            <div
              className={
                props.dark ? "text-[#EEEEEE]  mt-1" : "text-[#111111]  mt-1"
              }
              dangerouslySetInnerHTML={{
                __html: item.output,
              }}
            ></div>
          </div>
        </div>
      ))}
      <div
        className={
          props.dark
            ? "mt-5 flex bg-gray-800 mb-8"
            : "mt-5 flex bg-[#FFFDD0] mb-8"
        }
      >
        <h1 className="text-[#76ABAE] mr-4 ml-2">
          Tarang<span className="text-green-400">@live</span>:~
          {currentCommand !== "home" && "$"}
        </h1>

        <input
          type="text"
          value={currentCommand}
          className={
            props.dark
              ? "bg-transparent outline-none text-[#EEEEEE] "
              : "bg-transparent outline-none text-[#111111]"
          }
          onChange={onChange}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          spellCheck="false"
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default Terminal;
