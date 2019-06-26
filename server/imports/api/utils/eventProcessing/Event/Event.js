// @flow

export interface IEvent {
    type: string;
    payload: any;
    receiverUserIdList: Array<string>;
}