export {Drag} from './drag';
export {Drop} from './drop';

export function configure(config) {
  config.globalResources(
    './drag',
    './drop'
  );
}
