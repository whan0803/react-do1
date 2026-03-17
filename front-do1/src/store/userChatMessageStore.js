import { create } from 'zustand';

import { setUserStore } from './setUserStore';

export const userChatMessageStore = create((set) => ({
  message: [],
  index: 0,

  initMessage: () => {
    const user = setUserStore.getState().user;

    set({
      message:[
        `안녕하세요 ${user?.user_name}님`,
        "오늘도 같이 미션을 수행해봐요!",
        "저를 클릭하면 오늘의 미션으로 이동합니다",
      ],
      index: 0
    });
  },

  nextMessage: () =>
    set((state) => ({
      index: (state.index + 1) % state.message.length,
    })),

  setMessage: (newMessage) =>
    set(() => ({
      message: newMessage,
      index: 0,
    })),
}));