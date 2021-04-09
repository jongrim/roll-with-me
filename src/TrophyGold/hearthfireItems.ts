interface HearthfireItem {
  label: string;
  checked: boolean;
}

export interface CharacterHearthfire {
  firstHoard: HearthfireItem[];
  laterHoard: HearthfireItem[];
  carousing: HearthfireItem[];
  housing: HearthfireItem[];
  firstEquipment: HearthfireItem[];
  laterEquipment: HearthfireItem[];
  healing: HearthfireItem[];
}

const stringToItem = (item: string) => ({ label: item, checked: false });

export const firstHoard: HearthfireItem[] = [
  {
    label: 'Answer: Where do you keep your hoard so no one can find it?',
    checked: false,
  },
  {
    label:
      'Narrate a flashback to the moment your Drive became important to you.',
    checked: false,
  },
];

export const laterHoard: HearthfireItem[] = [
  'Narrate a flashback showing your favorite memory from childhood.',
  'Answer: Which Sister have you dedicated yourself to? How do you thank her for her help? The next time you perform this rite of thanks during an incursion, clear an emotional or psychological Condition.',
  'Answer: You’ve seen a sign or an omen about what’s to come. What is it? You may take an extra light die on a single Hunt Roll or a single Risk Roll if you describe how the sign or omen is manifesting in the scene.',
  'Narrate a flashback showing a personal triumph related to your Background.',
  'Narrate a flashback showing a personal triumph related to your Occupation.',
  'Narrate a short scene in the present day showing how you’re getting closer to achieving your Drive. Add 2 extra Gold to your Hoard.',
  'Answer: What person, place, or thing in town regularly reminds you of your Drive?',
  'Answer: In what way does your physical appearance reflect your obsession with your Drive?',
  'Narrate a flashback showing how you secretly betrayed the other treasure-hunters in order to satisfy your Drive. Add 2 extra Gold to your Hoard.',
  'Optional: Instead of adding Gold to your Hoard, remove any amount you wish (this can be done in order to satisfy Burdens or any other action on this sheet). The gm will narrate a scene showing why you will never satisfy your Drive.',
].map(stringToItem);

export const carousing: HearthfireItem[] = [
  'Ask a player to write down an adjective and reveal it to you secretly. Ask another player to write down a noun and reveal it to you secretly. Combine the adjective and noun to make the name of your character’s favorite tavern in town. Describe the “high quality” meal you usually order at your favorite tavern. The other players will then describe how you have it all wrong, and how the fare at your favorite tavern is substandard at best.',
  'Answer: In what ways have you personalized your favorite tavern or otherwise made it feel like a second home?',
  'Optional: Spend 3 more Gold to gain an ownership stake in your favorite tavern. From now on, you get one free piece of information whenever you carouse there. Leave unmarked until you exercise this option.',
].map(stringToItem);

export const housing: HearthfireItem[] = [
  'Answer: What kind of structure or environment is your Household? A small cottage? A decrepit church you are lovingly restoring? A series of tunnels belonging to the local thieves guild? Something else?',
  'Ask the other players: Which memento from our journeys together can be found in my Household? Note the answers on the lines below.',
].map(stringToItem);

export const firstEquipment: HearthfireItem[] = [
  'Name the shopkeeper and work with the gm to define their secret. The secret can be anything—a magical item they have in their possession, a lucrative opportunity they’re aware of, an estranged family member they want to find—so long as it’s something you might be interested in. Write the secret on the line below.',
].map(stringToItem);

export const laterEquipment: HearthfireItem[] = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
].map(stringToItem);

export const healing: HearthfireItem[] = [
  'Narrate a scene showing how you satisfy your physical desires when in town.',
  'Narrate a scene showing a private side of you few others see.',
  'Narrate a scene showing a truly beautiful place in or near town.',
].map(stringToItem);

export const initial: CharacterHearthfire = {
  firstHoard,
  laterHoard,
  firstEquipment,
  laterEquipment,
  carousing,
  housing,
  healing,
};
