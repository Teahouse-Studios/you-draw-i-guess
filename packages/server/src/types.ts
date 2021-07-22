export interface IWord {
  word: string;
  difficulty: number;
}

export interface IPlayer {
  id: string;
  score: number;
  owner?: boolean;
  username?: string;
  avatarUrl?: string;
}

export interface DrawEvent {
  type: 'draw';
  subtype: 'point' | 'lineTo' | 'clear' | 'eraser'
  pos: [number, number];
  color: string;
}

export type ClientWsData =
  {
    type: 'message';
    subtype: 'chat' | 'answer';
    data: string;
  } | {
    type: 'start';
  } | DrawEvent;

export type ServerWsData =
  {
    type: 'player';
    subtype: 'add' | 'remove';
    data: IPlayer;
  } | {
    type: 'players';
    data: IPlayer[];
  } | {
    type: 'message';
    subtype: 'chat' | 'answer' | 'info';
    data: string;
    sender: string;
  } | {
    type: 'start';
    subtype: 'draw' | 'guess';
    data: string;
  } | {
    type: 'score';
    sender: string;
    data: number;
    } | {
    type: 'selfId';
    data: string;
    } | DrawEvent;

declare module 'sockjs' {
  interface Connection {
    send: (data: ServerWsData) => void;
    info: (msg: string) => void;
  }
}
