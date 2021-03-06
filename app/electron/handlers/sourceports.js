import { ipcMain } from 'electron';
import { getJSON, setJSON } from '../utils/json';
import { play } from '../utils/common';

ipcMain.handle('sourceports/save', async (e, data) => {
  try {
    const newSourceports = await setJSON('sourceports', data);
    return {
      data: newSourceports,
      error: null
    };
  } catch (e) {
    return {
      data: null,
      error: e.message
    };
  }
});

ipcMain.handle('sourceports/play', async (e, pack) => {
  try {
    const settings = await getJSON('settings');
    const packages = await getJSON('packages');
    let newpacks = packages;

    if (pack.id) {
      newpacks = packages.map(item => {
        if (pack.id === item.id) {
          return {
            ...item,
            lastplayed: Date.now()
          };
        } else {
          return item;
        }
      });

      setJSON('packages', newpacks);
    }

    play(pack, settings);

    return {
      data: newpacks,
      error: null
    };
  } catch (e) {
    return {
      data: null,
      error: e.message
    };
  }
});
