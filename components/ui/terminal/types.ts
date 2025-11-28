// Terminal type definitions

export interface Palette {
  bg: string;
  terminalBg: string;
  text: string;
  accent: string;
  headerBg: string;
  terminalBorder: string;
}

export interface FileSystemItem {
  type: "dir" | "file";
  contents?: Record<string, FileSystemItem>;
  description?: string;
}

export interface CommandInfo {
  output: string[];
  delay: number;
  theme?: string;
}

export type FileSystem = Record<string, FileSystemItem>;
export type Commands = Record<string, CommandInfo>;
