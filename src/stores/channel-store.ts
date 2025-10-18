import { create } from 'zustand';

type ExecutionChannel = 'self-miner' | 'iexec' | 'auto';

type ChannelState = {
  currentChannel: ExecutionChannel;
  setChannel: (channel: ExecutionChannel) => void;
};

export const useChannelStore = create<ChannelState>((set) => ({
  currentChannel: 'auto',
  setChannel: (channel) => set({ currentChannel: channel }),
}));
