import { invoke } from '@tauri-apps/api/tauri'

export function translate(word) {
    return new Promise((resolve, reject) => {
      invoke('translate', {word: word}).then((msg) => {
        resolve(msg);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }