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
  const gruvboxDark = {
    bg: "bg-[#282828]",
    fg: "text-[#ebdbb2]",
    green: "text-[#b8bb26]",
    blue: "text-[#83a598]",
    yellow: "text-[#fabd2f]",
    red: "text-[#fb4934]",
  };

  const gruvboxLight = {
    bg: "bg-[#fbf1c7]",
    fg: "text-[#3c3836]",
    green: "text-[#79740e]",
    blue: "text-[#076678]",
    yellow: "text-[#b57614]",
    red: "text-[#9d0006]",
  };

  const theme = props.dark ? gruvboxDark : gruvboxLight;

  const currentTime = new Date().getTime();
  const expiryTime = localStorage.getItem("expiryTime");

  if (expiryTime && currentTime - Number(expiryTime) > 2 * 60 * 80 * 1000) {
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
            output: `<pre>${myText}</pre> <p>Welcome! to this site</p>
            <p>Type 'help' to see the list of available commands.</p>
            <p>Type 'repo' for github repository.</p>`,
          },
        ]
  );
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hasShownSummary) {
      localStorage.setItem("hasShownSummary", "true");
      localStorage.setItem("expiryTime", String(new Date().getTime()));
    }
  }, []);

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
          case "ls":
            output = `
              <p style="font-weight:bold;">Available commands:</p>
              <div style="display:grid;grid-template-columns: repeat(3, 1fr);">
                <p>help</p>
                <p>clear/cls</p>
                <p>contact</p>
                <p>linkedin</p>
                <p>github</p>
                <p>resume</p>
                <p>google</p>
                <p>weather</p>
                <p>summary</p>
                <p>date</p>
                <p>whoami</p>
                <p>repo</p>
                <p>skills</p>
                <p>projects</p>
                <p>education</p>
                <p>interests</p>
                <p>about</p>
                <p>social</p>

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
          case "github":
            window.open("https://www.github.com/tnrajpara");
            output = "Opening... Github";
            break;
          case "resume":
            window.open(
              "https://drive.google.com/file/d/1vx_-xbcLixWcOT46fvm3RC5BX6CeRtbr/view?usp=sharing"
            );
            output = "Opening... Resume";
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
          case "weather":
            output = `<p>
            Usage: weather [region]. Example: weather gujarat
            </p>`;
            break;
          case "google":
            window.open("https://www.google.com");
            output = "Opening... Google";
            break;
          case "skills":
            output = `
              <p style="font-weight:bold;">Technical Skills:</p>
              <ul>
                <li>Programming Languages: JavaScript, Python, Java, C++</li>
                <li>Web Technologies: React, Node.js, HTML5, CSS3</li>
                <li>Databases: MySQL, MongoDB</li>
                <li>Tools: Git, Docker, VS Code</li>
                <li>Concepts: Data Structures, Algorithms, OOP, RESTful APIs</li>
              </ul>
            `;
            break;
          case "projects":
            output = `
              <p style="font-weight:bold;">Notable Projects:</p>
              <ul>
                <li>CLI Portfolio (This website!)</li>
                <li> Testimonial App </li>
                <li> Chat Application </li>  
              </ul>
              <p>Type 'project [name]' for more details on a specific project.</p>
            `;
            break;
          case "education":
            output = `
              <p style="font-weight:bold;">Education:</p>
              <p> Diploma in Computer Science and Engineering</p>
              <p>Gujarat Technical University, 2022</p>
              <p>GPA: 8.15</p>
              <br />
              <p> Bachelors in Information Technology </p>
              <p>Sarvajanik University, Expected [2025]</p>
              <p>GPA: -</p>
              <p>Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development, Operating systems, Computer networks</p>
            `;
            break;

          case "interests":
            output = `
              <p style="font-weight:bold;">Areas of Interest:</p>
              <ul>
                <li>User Experience </li>
                <li>Full-Stack Web Development</li>
              </ul>
            `;
            break;

          case "about":
            output = `
              <p>Hello! I'm Tarang Rajpara, a passionate Computer Science and Engineering student with a keen interest in software development and emerging technologies. I love solving complex problems and building innovative solutions that make a difference. When I'm not coding, you can find me exploring new technologies.</p>
            `;
            break;
          case "social":
            output = `
              <p style="font-weight:bold;">Connect with me:</p>
              <ul>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/tarang-rajpara-354683292/" target="_blank">Tarang Rajpara</a></li>
                <li>GitHub: <a href="https://www.github.com/tnrajpara" target="_blank">tnrajpara</a></li>
              
              </ul>
            `;
            break;
          case "summary":
            output = `
              <pre>
                  ${myText}
              </pre>
<p> Welcome! to this site </p>
<p>Type 'help' to see the list of available commands.</p>
<p>Type 'repo' for github repository. </p>
            `;
            break;

          default:
            if (command.toLowerCase().startsWith("weather ")) {
              const city = command.split(" ")[1];
              output = "Fetching weather data...";
              fetch(`https://wttr.in/${city}?format=3`)
                .then((response) => response.text())
                .then((text) => {
                  setCommandList((prevCommands) => [
                    ...prevCommands,
                    { command: command, output: text },
                  ]);
                })
                .catch((error) => {
                  setCommandList((prevCommands) => [
                    ...prevCommands,
                    {
                      command: command,
                      output: "Error fetching weather data.",
                    },
                  ]);
                  console.log("error", error);
                });
              return;
            } else if (command.toLowerCase().startsWith("project ")) {
              const projectName = command.split(" ")[1].toLowerCase();
              switch (projectName) {
                case "cli":
                case "portfolio":
                  output = `
                    <p style="font-weight:bold;">CLI Portfolio</p>
                    <p>A unique, interactive command-line interface portfolio website showcasing my skills and projects.</p>
                    <p>Technologies used: React, TypeScript, Tailwind CSS</p>
                    <p>GitHub: <a href="https://github.com/tnrajpara/CLI-portfolio" target="_blank">CLI-portfolio</a></p>
                  `;
                  break;
                case "testimonial":
                case "app":
                  output = `
                    <p style="font-weight:bold;">CLI Portfolio</p>
                    <p>A testimonial app helps to get testimonials faster for non developers..</p>
                    <p>GitHub: <a href="https://github.com/tnrajpara/testimonial-app" target="_blank">Testimonial App</a></p>
                  `;
                  break;
                case "chat":
                case "application":
                  output = `
                    <p style="font-weight:bold;">Chat App</p>
                    <p>A Chat App for personal and groups.</p>
                    <p>GitHub: <a href="https://github.com/tnrajpara/chat-application" target="_blank">Testimonial App</a></p>
                  `;
                  break;

                default:
                  output = `Project '${projectName}' not found. Type 'projects' `;
                  output = `Project '${projectName}' not found. Type 'projects' to see the list of available projects.`;
              }
              break;
            } else {
              output = `<p style="color:red;">shell: command not found: ${command}. Try 'help' to get started.</p>`;
            }
        }

        setCommandList((prevCommands) => [
          ...prevCommands,
          { command: command, output: output },
        ]);
        setCommandHistory((prevHistory) => [...prevHistory, command]);
        setCurrentCommand("");
        setHistoryIndex(-1);
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex((prevIndex) => prevIndex + 1);
        setCurrentCommand(
          commandHistory[commandHistory.length - 1 - historyIndex - 1]
        );
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex((prevIndex) => prevIndex - 1);
        setCurrentCommand(
          commandHistory[commandHistory.length - 1 - historyIndex + 1]
        );
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand("");
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(event.target.value);
  };

  return (
    <div
      className={`lg:w-11/12 overflow-y-auto mx-2 my-2 rounded-xl ${theme.bg}`}
    >
      <div className={`sticky top-0 z-10 ${theme.bg} w-full`}>
        <div className="flex items-center justify-between px-4 py-2">
          <SiGnubash className={`${theme.fg} text-center ml-4 text-4xl`} />

          {props.dark ? (
            <MdWbSunny
              className={`${theme.fg} text-2xl mr-4 cursor-pointer`}
              onClick={() => props.setDark(false)}
            />
          ) : (
            <IoMoon
              className={`${theme.fg} text-2xl mr-4 cursor-pointer`}
              onClick={() => props.setDark(true)}
            />
          )}
        </div>
      </div>

      {commandList.map((item, index) => (
        <div key={index} className={`mt-5 ${theme.bg}`}>
          <div className="flex">
            <h1 className={`${theme.green} mr-4 ml-2`}>
              Tarang<span className={theme.blue}>@live</span>:~$
            </h1>
            <input
              type="text"
              value={item.command}
              className={`bg-transparent outline-none ${theme.fg}`}
              readOnly
            />
          </div>

          <div className={`${theme.fg} ml-2 mt-1`}>
            <div
              className={`${theme.fg} mt-1`}
              dangerouslySetInnerHTML={{
                __html: item.output,
              }}
            ></div>
          </div>
        </div>
      ))}
      <div className={`mt-5 flex ${theme.bg} mb-8`}>
        <h1 className={`${theme.green} mr-4 ml-2`}>
          Tarang<span className={theme.blue}>@live</span>:~$
        </h1>

        <input
          type="text"
          value={currentCommand}
          className={`bg-transparent outline-none ${theme.fg} w-full caret-current`}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          spellCheck="false"
          ref={inputRef}
          style={{
            caretColor: props.dark ? "#ebdbb2" : "#3c3836",
          }}
        />
      </div>
      <style>{`
        .caret-current::selection {
          background-color: ${props.dark ? "#ebdbb2" : "#3c3836"};
          color: ${props.dark ? "#282828" : "#fbf1c7"};
        }
        .caret-current {
          position: relative;
        }
        .caret-current::after {
          content: "";
          position: absolute;
          top: 0;
          right: -4px;
          width: 8px;
          height: 100%;
          background-color: ${props.dark ? "#ebdbb2" : "#3c3836"};
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Terminal;
