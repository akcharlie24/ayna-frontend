export interface SignUpUser {
  username: string;
  email: string;
  password: string;
}

export interface SignInUser {
  identifier: string;
  password: string;
}

export interface Message {
  date: string; // ISO date string
  text: string;
}

export interface Chat {
  id: number;
  messages: Message[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  name: string;
}
