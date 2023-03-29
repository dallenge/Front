import { atom } from 'recoil';

export const isAlertModalAtom = atom({
  key: 'isAlertModalAtom',
  default: false,
});

export const alertMessageAtom = atom({
  key: 'alertMessageAtom',
  default: '',
});
