import util from 'util';

export function log(item: any) {
  console.log(util.inspect(item, {showHidden: false, depth: null}))
}