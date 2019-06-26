import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

const _ = require("lodash");

const { Types, Creators } = createActions({
  setChatRoom: ["chatRoom"],
  setChatRooms: ["rooms"],
  addNewRoom: ["room"],
  updateRoom: ["room"],
  deleteRoom: ["id"],
  addNewMessage: ["message", "id"],
  setCurrentRoomById: ["id"],
  setUserId: ["myUserId"]
});

export const ChatTypes = Types;
const ChatActions = Creators;
export default ChatActions;

export const INITIAL_STATE = Immutable({
  currentChatRoom: undefined,
  isLoading: true,
  chatRooms: [],
  myUserId: ""
});

export const setUserId = (state, { myUserId }) => {
  return state.merge({ myUserId });
};

export const setChatRooms = (state, { rooms }) => {
  let currentChatRoom;
  if (state.currentChatRoom) {
    currentChatRoom = rooms.find(
      room => room._id === state.currentChatRoom._id
    );
  } else if (rooms.length > 0) {
    [currentChatRoom] = rooms;
  }
  return state.merge({
    chatRooms: rooms,
    isLoading: false,
    currentChatRoom
  });
};

export const updateRoom = (state, { room }) => {
  const chatRooms = _.cloneDeep(state.chatRooms);
  let index = chatRooms.findIndex(item => item._id === room._id);
  chatRooms[index] = room;
  let { currentChatRoom } = state;
  if (room._id === currentChatRoom._id) {
    currentChatRoom = room;
  }
  return state.merge({
    currentChatRoom,
    chatRooms,
    isLoading: false
  });
};

export const setCurrentRoomById = (state, { id }) => {
  let currentChatRoom = state.chatRooms.find(item => item._id === id);
  return state.merge({
    currentChatRoom,
    isLoading: false
  });
};

export const addRoom = (state, { room }) => {
  const chatRooms = _.cloneDeep(state.chatRooms);
  let { currentChatRoom } = state;
  if (currentChatRoom) {
    if (room._id === currentChatRoom._id) {
      currentChatRoom = room;
    }
  } else {
    currentChatRoom = room;
  }
  if (!chatRooms.find(item => item._id === room._id)) {
    chatRooms.push(room);
  }
  return state.merge({
    chatRooms,
    currentChatRoom,
    isLoading: false
  });
};

export const addNewMessage = (state, { message, id }) => {
  console.log({ message, id });
  let chatRooms = _.cloneDeep(state.chatRooms);
  chatRooms.forEach(room => {
    if (room._id === id) {
      room.messages.push(message);
    }
  });
  let currentChatRoom = _.cloneDeep(state.currentChatRoom);
  if (currentChatRoom._id === id) {
    currentChatRoom.messages.push(message);
  }
  return state.merge({
    currentChatRoom,
    chatRooms
  });
};

export const deleteRoom = (state, { id }) => {
  let { chatRooms, currentChatRoom } = state;
  let newRooms = [];
  for (let i = 0; i < chatRooms.length; i++) {
    if (chatRooms[i]._id !== id) {
      newRooms.push(chatRooms[i]);
    }
  }
  if (currentChatRoom._id === id) {
    currentChatRoom = null;
  }
  return state.merge({ chatRooms: newRooms, currentChatRoom });
};

export const setChatRoom = (state, action) =>
  state.merge({ currentChatRoom: action.chatRoom });

export const reducer = createReducer(INITIAL_STATE, {
  [ChatTypes.SET_CHAT_ROOM]: setChatRoom,
  [ChatTypes.SET_CHAT_ROOMS]: setChatRooms,
  [ChatTypes.ADD_NEW_ROOM]: addRoom,
  [ChatTypes.ADD_NEW_MESSAGE]: addNewMessage,
  [ChatTypes.UPDATE_ROOM]: updateRoom,
  [ChatTypes.DELETE_ROOM]: deleteRoom,
  [ChatTypes.SET_CURRENT_ROOM_BY_ID]: setCurrentRoomById,
  [ChatTypes.SET_USER_ID]: setUserId
});
