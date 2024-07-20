import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.valueOf() - date.valueOf()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }
}

type Message = {
  date: string; // ISO date string
  text: string;
};

export const getLastMessage = (messages: Message[]): string | null => {
  if (messages.length === 0) return null;

  let lastMessage = messages[0];
  let lastDate = new Date(messages[0].date);

  for (let i = 1; i < messages.length; i++) {
    const currentDate = new Date(messages[i].date);
    if (currentDate > lastDate) {
      lastMessage = messages[i];
      lastDate = currentDate;
    }
  }

  return lastMessage.text;
};
