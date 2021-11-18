import { chunk } from "lodash";

const remove_last = (collection, predicate = () => true) => {
  if (predicate(collection.slice(-1))) collection.pop();

  return collection;
};

const grouping = (collection, by = 3, connected, checkBy) => {
  const groups = chunk(collection, by);

  if (connected) {
    const l = groups.length - 1;

    for (let i = l; i > 0; i--) {
      const end = groups[i];
      const previous = groups[i - 1];

      previous.push(end[0]);
    }
  }

  if (checkBy) {
    remove_last(groups, (el) => el.length !== by + connected);
  }

  return groups;
};

export { grouping };
