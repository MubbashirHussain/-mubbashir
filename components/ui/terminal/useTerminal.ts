import { useState, useRef, useEffect, useCallback } from "react";
import { Palette, FileSystemItem, CommandInfo } from "./types";
import { PALETTES, TYPING_SPEED } from "./config";
import { FILE_SYSTEM } from "./filesystem";
import { COMMANDS_BASE } from "./commands";

export const useTerminal = (
  setAppTheme: (theme: string) => void,
  isTerminalOpen: boolean,
  setIsTerminalOpen: (open: boolean) => void,
  palette: Palette,
  themeName: keyof typeof PALETTES,
  isVisible: boolean,
  setIsVisible: (visible: boolean) => void
) => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Command History State
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // File System State
  const [currentDir, setCurrentDir] = useState("~");

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentFs = useCallback((dir: string) => FILE_SYSTEM[dir], []);

  // --- Tab Completion Logic ---
  const findPathCompletions = useCallback(
    (currentInput: string, currentDir: string) => {
      const parts = currentInput.trim().split(/\s+/);
      const command = parts[0].toLowerCase();

      if (!["cd", "cat"].includes(command)) {
        return { matches: [], prefix: "" };
      }

      const currentPathPart = parts[1] || "";
      const dirData = getCurrentFs(currentDir);
      const contents = dirData?.contents || {};
      const candidates = Object.keys(contents);

      const matches = candidates.filter((name) =>
        name.toLowerCase().startsWith(currentPathPart.toLowerCase())
      );

      return {
        matches: matches,
        prefix: currentPathPart,
      };
    },
    [getCurrentFs]
  );

  const typeOutput = useCallback((lines: string[], speed = TYPING_SPEED) => {
    return new Promise<void>((resolve) => {
      let currentLineIndex = 0;
      let currentCharIndex = 0;
      setIsTyping(true);

      setHistory((prev) => [...prev, ...lines.map(() => "")]);

      const typeChar = () => {
        if (currentLineIndex < lines.length) {
          setHistory((prev) => {
            const newHistory = [...prev];
            const startIndex = newHistory.length - lines.length;
            const targetIndex = startIndex + currentLineIndex;

            if (currentCharIndex < lines[currentLineIndex]?.length) {
              newHistory[targetIndex] = lines[currentLineIndex].substring(
                0,
                currentCharIndex + 1
              );

              currentCharIndex++;
              if (currentCharIndex >= lines[currentLineIndex].length) {
                currentLineIndex++;
                currentCharIndex = 0;
              }

              setTimeout(typeChar, speed);
            } else {
              currentLineIndex++;
              currentCharIndex = 0;
              setTimeout(typeChar, speed);
            }

            return newHistory;
          });
        } else {
          setIsTyping(false);
          resolve();
        }
      };

      typeChar();
    });
  }, []);

  const executeCommand = useCallback(
    async (command: string, skipHistory = false) => {
      const parts = command.trim().split(/\s+/);
      const primaryCmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      let cmdInfo: CommandInfo | null = null;

      // Dynamic Command Logic (cd, ls, pwd, cat)
      if (primaryCmd === "pwd") {
        cmdInfo = { output: [currentDir], delay: TYPING_SPEED / 4 };
      } else if (primaryCmd === "ls") {
        const dirData = getCurrentFs(currentDir);
        const accentColor = PALETTES[themeName]?.accent || PALETTES.dark.accent;
        const textColor = PALETTES[themeName]?.text || PALETTES.dark.text;

        if (dirData && dirData.type === "dir") {
          const contents = Object.entries(dirData.contents || {}).map(
            ([name, item]: [string, FileSystemItem]) =>
              item.type === "dir"
                ? `<span style="color:${accentColor}; font-weight: bold;">${name}/</span>`
                : `<span style="color:${textColor};">${name}</span>`
          );
          cmdInfo = {
            output: ["Total items: " + contents.length, ...contents],
            delay: TYPING_SPEED,
          };
        } else {
          cmdInfo = {
            output: [
              `Error: ls: cannot access '${currentDir}': Not a directory.`,
            ],
            delay: TYPING_SPEED / 2,
          };
        }
      } else if (primaryCmd === "cd") {
        const target = args[0] || "~";
        let targetClean = target.replace(/\/+$/, "");
        if (targetClean === "") targetClean = "~";

        let targetFsPath: string | null = null;

        if (targetClean === "~") {
          targetFsPath = "~";
        } else if (targetClean === "..") {
          targetFsPath = currentDir !== "~" ? "~" : "~";
        } else {
          const attemptedPath = currentDir === "~" ? `~/${targetClean}` : null;
          if (attemptedPath && FILE_SYSTEM[attemptedPath]?.type === "dir") {
            targetFsPath = attemptedPath;
          }
        }

        if (targetFsPath && FILE_SYSTEM[targetFsPath]?.type === "dir") {
          setCurrentDir(targetFsPath);
          cmdInfo = { output: [], delay: 0 };
        } else {
          cmdInfo = {
            output: [`Error: cd: no such directory: ${target}`],
            delay: TYPING_SPEED / 2,
          };
        }
      } else if (primaryCmd === "cat") {
        const fileName = args[0];
        if (!fileName) {
          cmdInfo = { output: [`Usage: cat <file>`], delay: TYPING_SPEED / 2 };
        } else {
          let fullPath;

          if (fileName.startsWith("~/")) {
            fullPath = fileName;
          } else if (currentDir === "~") {
            fullPath = `~/${fileName}`;
          } else {
            fullPath = `${currentDir}/${fileName}`;
          }

          const lookupKey = `cat ${fullPath}`;
          let finalLookupKey = lookupKey;

          if (currentDir === "~" && !fileName.startsWith("~/")) {
            const fallbackKey = `cat ${fileName}`;
            finalLookupKey = COMMANDS_BASE[fallbackKey]
              ? fallbackKey
              : lookupKey;
          }

          cmdInfo = COMMANDS_BASE[finalLookupKey] || COMMANDS_BASE["error"];
        }
      }

      // Static/Special Command Logic
      if (!cmdInfo) {
        const lowerCmd = command.toLowerCase().trim();
        if (lowerCmd.startsWith("sudo set theme")) {
          const themeName = parts[3];
          if (PALETTES[themeName as keyof typeof PALETTES]) {
            cmdInfo = {
              output: [`Access granted. Setting theme to '${themeName}'...`],
              delay: TYPING_SPEED / 2,
              theme: themeName,
            };
          } else {
            cmdInfo = {
              output: [
                `Error: Invalid theme '${themeName}'. Options are: dark, light`,
              ],
              delay: TYPING_SPEED / 2,
            };
          }
        } else {
          cmdInfo = COMMANDS_BASE[lowerCmd] || COMMANDS_BASE["error"];
        }
      }

      // Logging Command and Output
      if (!skipHistory) {
        setHistory((prev) => [...prev, `${currentDir} % ${command} :`]);

        setCommandHistory((prev) => {
          if (prev.length === 0 || prev[prev.length - 1] !== command) {
            return [...prev, command];
          }
          return prev;
        });
        setHistoryIndex(commandHistory.length + 1);
      } else if (command === "whoami" && cmdInfo) {
        setHistory((prev) => [...prev, `[INIT] ${command} :`]);
      }

      if (cmdInfo.output.length > 0) {
        await typeOutput(cmdInfo.output, cmdInfo.delay);
      }

      if (cmdInfo.theme) {
        setAppTheme(cmdInfo.theme);
      }
    },
    [
      typeOutput,
      setAppTheme,
      commandHistory.length,
      currentDir,
      getCurrentFs,
      themeName,
    ]
  );

  const handleKeyPress = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        if (isTyping) return;

        const { matches } = findPathCompletions(input, currentDir);
        const command = input.trim().split(/\s+/)[0];

        if (matches.length === 1) {
          const match = matches[0];
          const dirData = getCurrentFs(currentDir);
          const isDir = dirData?.contents?.[match]?.type === "dir";

          let newCmd = `${command} ${match}`;
          newCmd += isDir ? "/" : " ";

          setInput(newCmd);
        } else if (matches.length > 1) {
          setHistory((prev) => [...prev, `${currentDir} % ${input} :`]);

          const accentColor =
            PALETTES[themeName]?.accent || PALETTES.dark.accent;
          const completionsOutput = matches
            .map((name) => {
              const dirData = getCurrentFs(currentDir);
              const isDir = dirData?.contents?.[name]?.type === "dir";
              return isDir
                ? `<span style="color:${accentColor}; font-weight: bold;">${name}/</span>`
                : `${name}`;
            })
            .join("    ");

          await typeOutput([completionsOutput], TYPING_SPEED / 3);
        }

        if (inputRef.current) {
          inputRef.current.focus();
        }
        return;
      }

      if (e.key === "Enter" && !isTyping) {
        e.preventDefault();
        const cmd = input.trim();
        setInput("");

        if (cmd === "clear") {
          setHistory([]);
          focusInput();
          return;
        }

        if (cmd) {
          await executeCommand(cmd);
          focusInput();
        }
        setHistoryIndex(commandHistory.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = Math.min(commandHistory.length, historyIndex + 1);
          setHistoryIndex(newIndex);

          if (newIndex < commandHistory.length) {
            setInput(commandHistory[newIndex]);
          } else {
            setInput("");
          }
        }
      }
    },
    [
      input,
      isTyping,
      executeCommand,
      commandHistory,
      historyIndex,
      findPathCompletions,
      currentDir,
      typeOutput,
      getCurrentFs,
      themeName,
    ]
  );

  const focusInput = useCallback(() => {
    setTimeout(() => {
      if (inputRef.current && !isTyping) {
        inputRef.current.focus();
      }
    }, 300);
  }, [isTyping]);

  const toggleTerminal = useCallback(() => {
    if (!isVisible) {
      setIsVisible(true);
      setIsTerminalOpen(true);
    } else {
      setIsTerminalOpen(!isTerminalOpen);
    }
    if (isTerminalOpen) {
      focusInput();
    }
  }, [isTerminalOpen, setIsTerminalOpen, isVisible, setIsVisible, focusInput]);

  // Initial IDE boot sequence
  const runBootSequence = useCallback(async () => {
    setHistory([`mubbashir@MacBook-Air mubbashir % yarn dev`]);
    await new Promise((res) => setTimeout(res, 300));
    setHistory((prev) => [...prev, `$ next build`]);
    await new Promise((res) => setTimeout(res, 100));
    await typeOutput(
      [
        `Creating an optimized production build ...`,
        ` ✓ Compiled successfully in 1622.2ms`,
        ` ✓ Finished TypeScript in 1532.1ms`,
        `Route (app)`,
        ` /`,
        ` └── /_access_point_terminal (prerendered as static content)`,
        `Done in 5.44s.`,
        `----------------------------------------------`,
        `[INIT] Boot complete. Running default command: whoami`,
      ],
      TYPING_SPEED / 2
    );

    const initialCmd = "whoami";
    setCommandHistory([initialCmd]);
    setHistoryIndex(1);
    await executeCommand(initialCmd, true);
  }, [executeCommand, typeOutput]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, palette]);

  // Keyboard shortcut for focusing input (Ctrl/Cmd + F)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        toggleTerminal();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [toggleTerminal]);

  return {
    history,
    input,
    setInput,
    handleKeyPress,
    isTyping,
    terminalRef,
    inputRef,
    focusInput,
    runBootSequence,
    currentDir,
  };
};
