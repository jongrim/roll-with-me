export function initReducer<Item, Key extends keyof Item>(
  items: Item[],
  key: Key
) {
  return {
    items: items.map((i) => i[key]),
    itemMap: translateListToMap<Item, Key>(items, key),
  };
}

function translateListToMap<Item, Key extends keyof Item>(
  list: Item[],
  keyProp: Key
): Record<string, Item> {
  return list.reduce((acc, cur) => {
    const itemKey: unknown = cur[keyProp];
    return { ...acc, [itemKey as string]: cur };
  }, {});
}

export interface ListState<Item> {
  items: string[];
  itemMap: Record<string, Item>;
}

export type listItemEvent<Item> =
  | { type: 'add'; payload: { item: Item; key: string } }
  | { type: 'edit'; payload: { id: string; value: Record<string, unknown> } }
  | { type: 'remove'; payload: { id: string } };

function listItemReducer<Item>(
  state: ListState<Item>,
  event: listItemEvent<Item>
) {
  switch (event.type) {
    case 'add':
      return {
        items: state.items.concat(event.payload.key),
        itemMap: {
          ...state.itemMap,
          [event.payload.key]: event.payload.item,
        },
      };
    case 'edit':
      return {
        ...state,
        itemMap: {
          ...state.itemMap,
          [event.payload.id]: {
            ...state.itemMap[event.payload.id],
            ...event.payload.value,
          },
        },
      };
    case 'remove':
      const id = event.payload.id;
      const { [id]: removed, ...nextMap } = state.itemMap;
      return {
        items: state.items.filter((i) => i !== event.payload.id),
        itemMap: nextMap,
      };
    default:
      return state;
  }
}

export default listItemReducer;
